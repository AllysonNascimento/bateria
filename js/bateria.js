// SELETORES GERAIS

const qS = (el) => document.querySelector(el);
const qSa = (el) => document.querySelectorAll(el);
const cursor = qS('.cursor img');


// EVENTO ONDE OBSERVA A MOVIMENTAÇÃO DO MOUSE

window.addEventListener('mousemove', (e) => {

    let xPos = e.pageX - 35;
    let yPos = e.pageY - 15 ;

    cursor.style.left = xPos+'px';
    cursor.style.top = yPos+'px';

    cursor.addEventListener('click', ()=>{
        cursor.style.animation = 'hit 0.3s ease';

        setTimeout(()=> {
            cursor.style.removeProperty('animation');
        }, 200)
    })
});

let clickBateria = qSa('.key', '.active')

// EVENTO ONDE FAZ O CLICK NOS BOTÕES FUNCIONAR E RETORNAR OS SONS
clickBateria.forEach(function(el){
    el.addEventListener('click', ()=>{
        let clicknumpad = el.getAttribute('data-key')
        playSound(clicknumpad);
    })  
});

// EVENTO QUE RECONHECE O CLIQUE DAS TECLAS ESPECIFICADAS NA BATERIA
document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
});

// EVENTO QUE PERMITE A COMPOSIÇÃO ATRAVÉS DO INPUT
qS('.composer button').addEventListener('click', ()=>{
    let song = qS('#input').value;

    if(song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
});

// FUNÇÃO QUE ATIVA OS SONS
function playSound (sound) {
    let audioElement = qS(`#s_${sound}`);
    let keyElement = qS(`div[data-key='${sound}']`);

    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add('active');
        
        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 250)
    }
};

// FUNÇÃO QUE RODA AS COMPOSIÇÕES
function playComposition(songArray) {
    let wait = 0;
    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`numpad${songItem}`);
        }, wait);

        wait += 250;
    }
}
