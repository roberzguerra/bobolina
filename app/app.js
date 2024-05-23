import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';

const App = (props) => {

    // Sets the number of stars we wish to display
    const numStars = 100;
    const audioUrl = "./assets/star-wars-theme-song.mp3";

    const [playing, toggle] = useAudio(audioUrl);
    const [start, setstart] = useState(false);
    const [passValue, setpassValue] = useState('');
    const [checkTerms, setcheckTerms] = useState(false);

    useEffect(() => {
        for (let i = 0; i < numStars; i++) {
        // For every star we want to display
            let star = document.createElement("div");  
            star.className = "star";
            var xy = getRandomPosition();
            star.style.top = xy[0] + 'px';
            star.style.left = xy[1] + 'px';
            document.body.append(star);
        }

        // TODO: for dev:
        setstart(true);
    }, []);

    useEffect(() => {
      if (start) {
        toggle();
      }
    }, [start]);

    const handleSubmitStart = (e) => {
        e.preventDefault();
        if (passValue === 'wandolina') {
            setstart(true);
        }
        return false;
    };
    
    

    // Gets random x, y values based on the size of the container
    const getRandomPosition = () => {  
        var y = window.innerWidth;
        var x = window.innerHeight;
        var randomX = Math.floor(Math.random()*x);
        var randomY = Math.floor(Math.random()*y);
        return [randomX,randomY];
    }

    return (<div className="main-container">

        {/* Star Wars intro text crawl
        <Crawl
            title="Episode IV"
            subTitle="A New Hope"
            text="It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy…"
        />
        */}
        {!start ?
            <div className="start-container">
                <form onSubmit={handleSubmitStart}>
                    <input
                        className='start-input'
                        placeholder="Senha"
                        value={passValue}
                        onChange={(e) => setpassValue(e.target.value)}
                        //onClick={(e) => setstart(true)}
                    />
                </form>
            </div>
            :
            <>
                {/* Star Wars intro text crawl */}
                <section className="intro">
                Há muito tempo, em uma galáxia muito, muito distante....
                </section>

                <div className="board">
                    <div className="content">
                        <p className="title">Episode I</p>
                        <p className="subtitle">O ENCONTRO DE DOIS <br/>NERDOLAS</p>
                        <br />
                        <p>Após inúmeras turbulências existências, nossos heróis encontravam-se abatidos, cansados, sem esperanças... Sem expectativas de encontrar um grande lovezinho.</p>
                        <p>Porém, foi em um trailer de Deadpool & Wolverine, que algo aconteceu. 👀</p>
                        <img className="img-responsive" src="https://c.tenor.com/BlRcuERpwskAAAAd/tenor.gif" />
                        <p>Um olhar, um sorriso, um "oi, tudo bem, VIADO?"</p>
                        <p>E a magia estava no arrrr...</p>
                        <img className="img-responsive" src="https://c.tenor.com/rsB66bq2gIgAAAAd/tenor.gif" />
                        <p>Assim, começava uma história de amor COMPLETAMENTE improvável.</p>
                        <p>Foram algumas semanas de longas conversas, flertes e referências nerdolas.</p>
                        <img className="img-responsive" src="https://c.tenor.com/mV75yoDbITYAAAAd/tenor.gif" />
                        <p>Até que, finalmente, o primeiro encontro acontece. E rola TUDO DE BOM!!!</p>
                        <img className="img-responsive" src="https://c.tenor.com/6BOApE8MQycAAAAC/tenor.gif" />
                        <p>Oh yeaaaah! Beibeeeeee... 🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄🥄</p>
                        <div className="separator" style={{height: '100px'}} />
                        <p>E tivemos a primeira viageeeeeeem \o/</p>
                        <img className="img-responsive" src="https://c.tenor.com/tfwIivcfDLoAAAAC/tenor.gif" />
                        <p>Onde encontramos nossa turminha do barulho!</p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczPF34rf6OATlMJUiHAcAjAFmlYvo-p_EQVcWS6LzKnztoSehcSMxWio9oCIrMUoAsPHIka2rUM5IHyO7HqiflA5b5zZoLLIN8-1lotgerY3FICANH3aHi5TZMDTxx-XYTpdsfSGXQy-i-LdlDpzs847QA=w1510-h2012-s-no?authuser=0" />
                        <p>Tivemos nosa primeira noite na fogueira</p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczOfItmv4N5RiSs0azKo4DFKPIKQPlNvN4VXFLsZtdtzjvgbD_GLQ5L7gMAMkZL71kTV4Iy1iwsPx6SYlQ6b034qeaHo7uaaxbl7TVmwlaSvnEdBQ0kYvF7Pm2ZPY66Noy8FGakhUY3wXq5fl2_Uz6MBBQ=w730-h972-s-no?authuser=0" />
                        <p>E fizemos nossa primeira trilha</p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczMrhuFOXBVyiJ5QEcOI6uKNC6Fev748c7nJ0-NethmuTaR3pCruT6C8AoAwmsaXchbp0Pxj81UsWQWE7hdmTsc1QfalwIXjm64JXRJ_CsMkUlYqDUhXVNxghEm7FGuZjmZ69Efihrow0Ms3KTH7V7fGww=w1510-h2012-s-no?authuser=0" />
                        <p>E noites inesquecíveis sob um céu estrelado</p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczNrdw33tuekpYwNlPmnTaZLZWxS4OGrgepJpl55BHiqgcX-qrIYjYcybOTm9rMAzeGpj5v_Ft-atboK_O8rSq2pKYEme7mQ47Rg6QTmO2dpFicgjg_NbkPnYwMliuzj1C5AvOIyLjYJOAxVDheU4jqpqA=w1200-h1600-s-no?authuser=0" />
                        <p>Um lugar encantado</p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczOo9iqt_A72IDe8rsLpjPEQ0uWYCQAD4a1Ar8pTqeUkP6DPIQP0zZodA2KgZ1koIP0tv-rU6U37q0ozZrAhSVrgz-6YEbyaOzeezm0h7uJKL58g785AweKJ73Uz-1AkqiXWnnY7QdI7avDRte8QOjaHaA=w1510-h2012-s-no?authuser=0" />
                        <p>E um violão arretado.</p>
                        <img className="https://lh3.googleusercontent.com/pw/AP1GczOfeoPQ-hEfOf8eYMmwxoEucInpH1DluuH1__UIoyzILwFkfxQzHWeoesc4XZh2SOyXemipx4Lhm2Cb1RS2H8IU-Lm3m5DSXxxJCl_hqrmsSrJAO749hYlayVfDczihDtw4bGd0w8OHuXdSlwASx_6jPA=w1510-h2012-s-no?authuser=0" />
                        <p>Porquê somos assim, feitos pro fim do mundo... </p>
                        <img className="img-responsive" src="https://lh3.googleusercontent.com/pw/AP1GczNJrM02vkglpCF-6kpCZz3iw3zAC__-go2MQsiEJEfhyGIrDbdVJSFGQI7CIEwnbP2GRUXdwEApKktYTISePFt7iLx_leRwENQE_XTMRoA4uDdT4OeWQ23Zxz2VHFmxQ3LhYIn952F78lVcs6Dg5O6B2w=w730-h972-s-no?authuser=0" />
                        <p>Te quero pra mim, como me quero pra ti, VIADO! S2 S2 S2</p>
                        <div className="separator" style={{height: '100px'}} />
                        <div>
                            <p>Li, concordo e aceito os coockies:
                                <input 
                                    className='input-check'
                                    type="checkbox" 
                                    value="1"
                                    onChange={(e) => setcheckTerms(!!e.target.checked)}
                                ></input>
                            </p>
                            <h1>Bora namora comigo? </h1>
                            <button 
                                className='btn btn-yes'
                                disabled={!checkTerms}
                                onClick={() => null}
                            >Sim</button>
                            <button 
                                className='btn btn-no'
                                onClick={() => null}
                            >
                                Não
                                </button>
                        </div>

                    </div>
                </div>
            </>
        }
        
    </div>)
};



const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div>
        <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    );
};
  



console.log("app.js");
const reactAppElement = document.getElementById('react_app');
const root = createRoot(reactAppElement);
root.render(<App />);