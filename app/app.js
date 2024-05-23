import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';

const App = (props) => {

    // Sets the number of stars we wish to display
    const numStars = 100;
    const audioUrl = "./assets/star-wars-theme-song.mp3";

    const [playing, toggle] = useAudio(audioUrl);
    const [start, setstart] = useState(false);

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
    }, []);

    useEffect(() => {
      if (start) {
        toggle();
      }
    }, [start])
    
    

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
                <button
                    className="start-button"
                    onClick={(e) => setstart(true)}
                >
                Start
            </button>
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
                        <p></p>
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