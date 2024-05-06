// THIS IS A TEMPORARY SOLUTION

const fs = require('fs');
const path = require('path');

// Make sure APP_URL is correct in .env file.
// If using laravel valet and https
// it should be domain with full url.
// Example: https://my-app.test
//const host = process.env.APP_URL ? process.env.APP_URL.split('//')[1] : '';
const hmrHost = process.env.MIX_HMR_HOST ? process.env.MIX_HMR_HOST : 'lar.linklei.com.br';
const hmrPort = process.env.MIX_HMR_PORT ? process.env.MIX_HMR_PORT : '9091';

// Check if command is: "npm run hot" or "npm run hot with-https"
//const isHotWithSSL = process.argv.includes('with-https') && process.argv.includes('--hot');

const isHotWithSSL = (process.env.MIX_HMR_HTTPS === 'true');

// This will be used in mix.options(...)
const hmrOptions = {
    // Setting "host" to "0.0.0.0" is required, if you are visiting
    // your app via http://127.0.0.1:8000 or http://localhost:8000
    //host: isHotWithSSL ? host : '0.0.0.0',
    https: isHotWithSSL,
    host: hmrHost,
    port: hmrPort,

    getUrl: () => {
        return `${(hmrOptions.https === true) ? 'https' : 'http'}://${hmrOptions.host}:${hmrOptions.port}`;
    }
};

// This will be used in mix.webpackConfig(...)
let devServer = {
    host: '0.0.0.0',
    port: hmrPort,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': 'upgrade-insecure-requests',
    },

};

if (process.env.NODE_ENV === 'development') {

    if (isHotWithSSL === true) {
        process.argv.push('--https');
        devServer = {
            https: true,
            host: '0.0.0.0',
            port: hmrPort,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Security-Policy': 'upgrade-insecure-requests',
            }
            /*
            https: {
                // Make sure these certificates exists,
                // otherwise it will throw an error.
                key: fs.readFileSync(
                    path.resolve(
                        process.env.HOME,
                        `.config/valet/Certificates/${host}.key`
                    )
                ),
                cert: fs.readFileSync(
                    path.resolve(
                        process.env.HOME,
                        `.config/valet/Certificates/${host}.crt`
                    )
                )
            }
            */
        };
    } else {
        devServer = {
            //https: false,
            host: '0.0.0.0',
            port: hmrPort,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Security-Policy': 'upgrade-insecure-requests',
            }
        };
    }
}

module.exports = {
    hmrOptions,
    devServer
};
