window.onload = function() {
    console.log("Page loaded");
    generatecard();
};
const cardImages=[
    "kidrunningaway.jpg",
    "kidsplaying.jpg",
"little girls.jpg",
"ethrooster.jpg"];
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatecard() {
    console.log("Generating cards...");
    const gridcontainer = document.querySelector(".gridcontainer");
    gridcontainer.innerHTML = "";
    const shuffled = shuffle([...cardImages, ...cardImages]);
    shuffled.forEach(image => {
        const card = document.createElement('div');
        card.classList.add("memory-card");
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="imgs/${image}" alt="detective">
                </div>
            </div>`;
        card.addEventListener("click", flipCard.bind(null, card));
        gridcontainer.appendChild(card);
    });
}

let flippedCards=[];
let moves=0;
let score=0;
function flipCard(card){
    if(flippedCards.length<2){
        card.classList.add('flipped');
        flippedCards.push(card);
    }
        if(flippedCards.length===2){
            setTimeout(check,1000);
            moves++;
            updateStatus();
        }
    
}
function check(){
    const [card1,card2]=flippedCards;
    const img1=card1.querySelector('.card-back img');
    const img2=card2.querySelector('.card-back img');
    if(img1.src===img2.src){
        /*card1.style.opacity='0';
        card2.style.opacity='0';*/
        card1.classList.add('matched');
        card2.classList.add('matched');
        score+=Score(moves);
        updateStatus();
    }else{
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards=[];
}
function Score(moves){
return Math.max(100-moves*10,0);
}
function updateStatus(){
document.getElementById('moves').textContent=moves;
document.getElementById('score').textContent=score;
}
