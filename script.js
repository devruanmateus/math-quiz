// Configuração e acesso ao botão de começar o jogo
let play = false;
let iconPlay = document.querySelector('.icon-play');
let playBtn = document.querySelector('#play-btn');

// Botão de enviar resposta
let sendResponseBtn = document.querySelector('#send');

// Campo de perguntas inicial
let question = document.querySelector('#question');
question.innerText = 'Quiz';

// Estilo inicial do botão
iconPlay.innerHTML = '<span class="material-symbols-outlined">sports_esports</span>';
playBtn.style.backgroundColor = 'gray';

// Campo de resposta
let responseField = document.querySelector('#iattempt');
responseField.disabled = true;


let cronometer = document.querySelector('#timer');
let timeLimit = 10;
let count;
let timer;

playBtn.addEventListener('click', function() {
    if (play) {
        play = false;
        iconPlay.innerHTML = '<span class="material-symbols-outlined icon-play">play_arrow</span>';
        playBtn.style.backgroundColor = 'blue';

        hits.innerText = 'X';
        failures.innerText = 'X';

        question.innerText = 'Quiz'
        responseField.disabled = true;

        // Limpa o cronômetro se o jogo for parado
        cronometer.innerText = 'Contador não iniciado'
        timeLimit = 10
        clearInterval(count)
    } else {
        play = true;
        iconPlay.innerHTML = '<span class="material-symbols-outlined icon-play">stop_circle</span>';
        playBtn.style.backgroundColor = 'red';

        hits.innerText = 0;
        failures.innerText = 0;

        game();
        responseField.disabled = false;
    }
});

function game() {
    let sendResponse = document.querySelector('#send');

    function questionGenerator() {
        // Resetar o campo para digitar a resposta
        responseField.value = ' ';

        // Gerar a nova resposta
        let n1 = parseInt(Math.random() * 100);
        let n2 = parseInt(Math.random() * 100);
        let result = n1 + n2;
        question.innerText = 'Quanto é ' + n1 + ' + ' + n2 + '?';
        return result;
    }

    let result = questionGenerator();

    // Temporizador
    cronometer.innerHTML = `<p id="timer">Você tem <span id="seconds">${timeLimit}</span> segundos para responder.</p>`;

    count = setInterval(function() {
        timeLimit--;

        cronometer.innerHTML = `<p id="timer">Você tem <span id="seconds">${timeLimit}</span> segundos para responder.</p>`;

        // Verifica se acabou o tempo
        if (timeLimit <= 0) {
            let countFailures = parseInt(failures.innerText);
            failures.innerText = countFailures + 1;
            
            result = questionGenerator();

            timeLimit = 10
        }
    }, 1000);

    sendResponseBtn.onclick = function() {
    
        // Não permite o usuário enviar uma resposta sem iniciar o jogo antes
        if (!play) {
            return;
        }

        let response = parseInt(document.querySelector('#iattempt').value);
        let countHits = parseInt(hits.innerText);
        let countFailures = parseInt(failures.innerText);

        // Verifica se a resposta está correta
        if (response === result) {
            hits.innerText = countHits + 1;
            timeLimit = 10
        } else {
            failures.innerText = countFailures + 1;
        }

        // Gera uma nova pergunta
        result = questionGenerator();
    };
}  

// Instrue o usuário a iniciar o jogo antes de tentar responder
sendResponseBtn.addEventListener('click', function() {
    if (!play) {
        question.innerHTML = 'Inicie o jogo antes de responder!';
        return;
    }
})