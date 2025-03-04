const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const holeElements = document.querySelectorAll('.hole');
const difficultyButtonElement = document.querySelectorAll('.difficulty-btn')
let score = 0;

let difficultyLevel = 'easy';

const difficultySettings = {
    easy : {
        interval: 1000
    },

    medium : {
        interval: 800
    },

    hard : {
        interval: 500
    }
}

let setting = difficultySettings[difficultyLevel];

difficultyButtonElement.forEach(function(difficultyBtn){
    difficultyBtn.addEventListener('click',function(event){
        const button = event.target;
        difficultyLevel = button.dataset.difficulty;
        setting = difficultySettings[difficultyLevel];
    })
})

startButton.addEventListener('click',function(event){

    score= 0;
    scoreElement.textContent = score;
    startButton.disabled = true;

    let gameInterval = setInterval(function(){
        let randomHole = Math.floor(Math.random() * holeElements.length);
        holeElements[randomHole].classList.add('mole');

        setTimeout(function(){
            holeElements[randomHole].classList.remove('mole');
        },setting.interval)
    },setting.interval)

    setTimeout(function(){
        clearInterval(gameInterval);
        alert("Game Over !! Score is " + score);
        startButton.disabled = false;
    },10000)

})

holeElements.forEach(function(holeElements){
    holeElements.addEventListener('click',function(event){
        let hole = event.target;
        if(hole.classList.contains("mole")){
            score += 2;
            scoreElement.textContent = score;
            const audio = new Audio('./audio/whack-easy.mp3');
            audio.currentTime = 0;
            audio.play();
        }
    });
});