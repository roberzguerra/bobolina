const mix = require('laravel-mix');
const fs = require('fs');
const path = require('path');
const glob = require("glob");
require('laravel-mix-merge-manifest');
const CopyPlugin = require("copy-webpack-plugin");
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

// Carrega um .env file especifico:
require('mix-env-file');

mix.env(process.env.ENV_FILE);

// Para testar se esta execucaoesta em hot reload:
// (process.argv.indexOf('--hot') >= 0)

const devMode = process.env.NODE_ENV !== "production";

// THIS IS A TEMPORARY SOLUTION.
const { hmrOptions, devServer } = require('./webpack.fix');

// TIPOS DE COMPILACAO:
/*
react: compila app em react.
auth: compila JS/CSS para site publico do modulo auth.
voyager: compila JS/CSS somente para voyager.
*/
//const COMPILE_TYPE = process.env.MIX_COMPILE_TYPE ?? 'react';
//mix.extract();
mix.mergeManifest();

//console.log("process.env: ", process.env);
//process.env.APP_URL = 'https://0.0.0.0:8080/';

const hrmlUrl = hmrOptions.getUrl();

// CONFIG MIX PARA REACT ###############################################
mix

    .options({
        hmrOptions: hmrOptions
    })

    // Extract: extrai as libs listadas, utilizadas do node_modules, para o vendor.js
    // SE vazio, extra TODAS as libs do node_modules para o vendor.js - usar assim pois mais eficiente.
    .extract([])

    // SASS base para views do laravel:
    //.sass('resources/app/sass/base_laravel.scss','public/app/css')

    // ATENCAO!!! Nao utilizar o nome "app.css" no arquivo final, pois ocorre um problema que nao atualiza demais arquivos .css com hot reload.
    .sass('app/sass/app.scss', 'public/app/app1.css')

    .js('app/app.js', 'public/app')
    .react()

    .webpackConfig({
        output: {chunkFilename: 'app/[name].js?id=[chunkhash]'},

        mode: process.env.NODE_ENV,
        //devtool: "source-map",
        devtool: "eval-source-map",
        devServer: devServer,

        // Cria alias para imports em arquivos scss:
        resolve: {
            fallback: {
                crypto: require.resolve("crypto-browserify"),
            },

            alias: {
                '@': path.resolve('app'),
                //'_variables': path.resolve('resources/app/sass/_variables.scss'),
                //'_variables_bootstrap': path.resolve('resources/app/sass/_variables_bootstrap.scss'),
                //'_mixins': path.resolve('resources/app/sass/_mixins.scss'),
            },

            extensions: ["", ".js", ".jsx", ".es6", ".svg", ],
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {loader: "babel-loader"}
                },
                {
                    test: /\.html$/,
                    use: [{loader: "html-loader"}]
                },
                {
                    test: /\.css$/,
                    use: [
                        //"style-loader",
                        //"css-loader",
                        //{ loader: MiniCssExtractPlugin.loader },
                        //{ loader: 'css-loader', options: { importLoaders: 1 } }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: ['file-loader']
                },

                // Injeta o @import "_variables"; em todos os arquivos scss ou sass:
                {
                    //test: /\.s[ac]ss$/,
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: "sass-loader",
                            options: {
                                // Oculta notificacoes de warnings ao compilar scss
                                sassOptions: {
                                    quietDeps: true,
                                    //outputStyle: 'compressed'
                                },
                                //additionalData: `
                                //    @import "_variables";
                                //    @import "_variables_bootstrap";
                                //    @import "_mixins";
                                //`,
                            }
                        },
                    ]
                },
                {
                    test: /\.(svg)$/,
                    use: ['babel-loader', '@svgr/webpack'],
                },
            ],
        },
        plugins: [
            // Envia para uso nos JS compilados o que for declarado no objeto:
            new webpack.DefinePlugin({
                'ENV_IS_HOT': Boolean(process.argv.indexOf('--hot') >= 0),
                'HRM_URL': `'${hrmlUrl}'`,
            }),
        ],
        optimization: {
            minimize: mix.inProduction(),
            minimizer: [
                new JsonMinimizerPlugin(),
            ],
        },
    });

// Copia arquivos de traducao em resources/i18n/ para public/i18n/
//mix.copy('resources/i18n/', 'public/i18n/');

// Gera os source maps, parametro generateForProduction = false, evita gerar sourcemaps em producao.
mix.sourceMaps(false);
mix.setPublicPath('public/app');

// Quando rodar npm run production: gera arquivos do mix com numero de versao, ex: app.js?id=123
if (mix.inProduction()) {
    mix.version();
}
