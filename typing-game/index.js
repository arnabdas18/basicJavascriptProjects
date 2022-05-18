const word = document.getElementById('word'),
test = document.getElementById('test'),
scoreEl = document.getElementById('score'),
timeEl = document.getElementById('time'),
endgameEl = document.getElementById('end-game-container'),
settingsBtn = document.getElementById('settings-btn'),
settings = document.getElementById('settings'),
settingsForm = document.getElementById('settings-form'),
difficultySelect = document.getElementById('difficulty');

// list of words for the game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

let randomWord      //init random word
score = 0,          //init score
time = 10,          //init time
//set difficulty value to local storage or medium
difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);

// add word to DOM
function addWordToDOM() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomWord;
}

// update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = `${time}s`;

    if(time === 0) {
        clearInterval(timeInterval);

        // end game
        gameOver();
    }
}

// game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onClick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

//event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    
    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //clear
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        } else if(difficulty === 'medium') {
            time += 4;
        } else {
            time += 6;
        }
        updateTime();
    }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});