

function checkDetails(){
userName=document.getElementById('name').value;
cardNumber=document.getElementById('cardsNumber').value;
if(isUserName(userName) && isCorrectCardsNumber(cardNumber)){
    addInnerTextToElement('userName','Name:'+userName);
    addInnerTextToElement('cardNum','Pairs:'+cardNumber);
    hideSomething('loginPanel');
    showGamePanel();
    console.log('Starting game');

}
else{
addInnerTextToElement('erorrMessage',errorLoginMessage)
}

console.log(userName+cardNumber);

}

function runGame(){
    summonPhotos();

}

function handleScoreBoard(){   
    checkGameOver();
    addInnerTextToElement('score','Score:'+score);
    addInnerTextToElement('moves','Moves:'+moves);
}

function checkGameOver(){
    if(score==cardNumber){
       hideSomething('gamePanel');
       showSomething('gameOver');
       showSomething('refreshButton');
       var gameResults= 'Name:'+userName +'<br>Time:'+totalTime+'<br>Pairs:'+cardNumber+'<br>Moves: '+moves ;
       document.getElementById('gameOver').innerHTML=gameResults;
        console.log('GameOver');
    }
}

function openInstructios(){
hideSomething('loginPanel');
showSomething('instructionsSection');
}

function openAbout(){
    hideSomething('loginPanel');
showSomething('aboutSection');
}

function showGamePanel(){
    showSomething('gamePanel');
    showSomething('scoreDisplay');
    handleScoreBoard();
    timerStart();
    runGame();
}

function isUserName(userName){
if(userName.length>0){
    return true;
}
}

function summonPhotos(){
    const squarePanel = document.getElementById('squarePanel');

const mixedPhotos=[];
for( let i=0; i<cardNumber*2; i++){
    mixedPhotos[i]=imagesArr[i % cardNumber];
}

shuffleCards(mixedPhotos);
for (let i=0; i<mixedPhotos.length; i++){
    const card = createCard(mixedPhotos[i]); 
    const img = card.querySelector('.card-back img');
    img.alt = `Image ${i + 1}`; 
    squarePanel.appendChild(card); 
}
}

function timerStart(){
let seconds=0;
let minutes=0;
let hours=0;
setInterval(function() {
seconds++;
if(seconds==59){
    minutes++;
    seconds=0;
}
if(minutes>59){
    hours++;
    minutes=0;
}
let hoursDisplay = String(hours).padStart(2, '0');   
let minutesDisplay = String(minutes).padStart(2, '0'); 
let secondsDisplay = String(seconds).padStart(2, '0'); 
totalTime= `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
document.getElementById('time').innerText =totalTime;

},secondsValue);

}



function createCard(imageSrc) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
  
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = '?'; 
  
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Memory Card';
    cardBack.appendChild(img);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
  
    card.addEventListener('click', () => {
        if (card.classList.contains('flipped')) return;
        selectedCards.push({ card, imageSrc });
        card.classList.add('flipped'); // הפיכת הקלף
        if (selectedCards.length === 2) {
            disableAllClicks();
            let [firstCard, secondCard] = selectedCards;
            setTimeout(() => {
                checkIfEqual(firstCard, secondCard);
                enableAllClicks();
            }, checkTimeCards); // זמן בדיקת הקלפים
        }
    });
    return card;
  }

  function checkIfEqual(firstCard, secondCard) {
    if (firstCard.imageSrc === secondCard.imageSrc) {
        console.log('Match!!!');
        score++;
        moves++;
        handleScoreBoard();
    } else {
        console.log('No Match!');
        moves++;
        handleScoreBoard();

        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
        }, secondsValue); // מהירות היפוך הקלפים
    }
    selectedCards = [];
}

function disableAllClicks() {
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'none'; 
    });
}

function enableAllClicks() {
    document.querySelectorAll('.card').forEach(card => {
        card.style.pointerEvents = 'auto'; 
    });
}



 function shuffleCards(mixedPhotos){
    for (let i = mixedPhotos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mixedPhotos[i], mixedPhotos[j]] = [mixedPhotos[j], mixedPhotos[i]];
    }
 }

function isCorrectCardsNumber(cardNumber){
if(cardNumber>0 && cardNumber<=30){
    return true;
}
}

  function addInnerTextToElement(elmentId,text){
    document.getElementById(elmentId).innerText=text;

  }

  function showSomething(elementId){
    document.getElementById(elementId).classList.remove("hidden");
    document.getElementById(elementId).classList.add("visible");
}

function hideSomething(elementId){
    document.getElementById(elementId).classList.remove("visible");
    document.getElementById(elementId).classList.add("hidden");
}



function refreshPage() {
    location.reload();  
}

