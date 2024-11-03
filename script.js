const result = document.getElementById('result')
const statsScore = document.getElementById('statsScore')
const statsMistake = document.getElementById('statsMistake')
const audioDobre = new Audio('assets/sounds/dzik-dobry.mp3')
const audioZle = new Audio('assets/sounds/dzik-zly.wav')
let numer = 0
let czyNalezyKliknac = false
let czyKliknietoDzika = false
let pierwszyRaz = true;
let timeInterval = 2000 
let numerInterval
let score = 0
let mistakes=0

function kolejnyNumer(){
    if(czyNalezyKliknac && !czyKliknietoDzika){
        audioZle.play()
        mistakes++;
    }
    else{
        if(timeInterval > 300){
            timeInterval -= 10
            clearInterval(numerInterval)
            numerInterval = setInterval(kolejnyNumer, timeInterval) 
        }     
    }

    numer += losowanie();
    czyKliknietoDzika = false;
    czyNalezyKliknac = czyMa7(numer)
    result.innerHTML = numer
}
function losowanie(){
    return Math.floor(1 + Math.random() * (numer.toString().length+1) * 2);
}
function statystyki(){
    statsScore.innerHTML = "Poprawne: " + score;
    statsMistake.innerHTML = "Błędne: " + mistakes;
}
function dzik(){
    

    if(pierwszyRaz){
        numerInterval = setInterval(kolejnyNumer, timeInterval)  
        pierwszyRaz=false
    }
    else{
        if(czyNalezyKliknac && !czyKliknietoDzika){
            czyKliknietoDzika = true
            score++; 
        }
        else{
            audioZle.play()
            mistakes++;
            statystyki();
            return;
        }
    }
    audioDobre.play()
    statystyki();
}

function czyMa7(numer){
    return numer % 7 === 0 || numer.toString().includes('7');
}
function reset(){
    clearInterval(numerInterval)
    result.innerHTML = "Gra w Dzika"
    numer=0
    czyNalezyKliknac = false
    czyKliknietoDzika = false
    pierwszyRaz = true
    timeInterval = 2000 
    score=0
    mistakes=0
    statsScore.innerHTML=""
    statsMistake.innerHTML=""

}
