const gameSummary = { // obiekt przechowujemy dane
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = { // obiekt przechowuje dane aktualnej gry
    playerHand: "", // co wybraliśmy
    aiHand: "", // co wybrał random (komputer)
    
}

function aiChoice(){
    return hands[Math.floor(Math.random()*3)].dataset.option; // wybieramy jedna z 3 dłoni i bierzemy wartość z data-option(papier, kamien lub nożyczki)
}


const hands = [...document.querySelectorAll('.select img')]; // pobieramy wszystkie pola z rekami (szukaj w select img) i umieszczamy w tablicy
// pierwsza funkcja
function handSelection(){
    game.playerHand = this.dataset.option; //przypisujemy do playerHand to co wybraliśmy czyli w html data-optional papier, kamień lubnożyczki
    hands.forEach(hand => hand.style.boxShadow = ''); // czyścimy z obramowania
    this.style.boxShadow = '0 0 0 4px yellow'; // zrobi obramowanie żółte nie zmieni wielkości (0-przesuniecie na x, 0-przesuniecie na y, 0-rozmycie, 4px-grubość, kolor )
}
function checkResult(player, ai){
    if (player === ai){   //sprawdza czy remis
        return 'draw';
    }
    else if ((player === "papier" && ai === "kamień") || (player === "nożyczki" && ai === "papier") || 
    (player === "kamień" && ai === "nożyczki")){  // kiedy wygyrwamy
        return 'win';
    }
    else {
    return 'loss'; // kiedy przegramy
    }
    }
    //publikacja wyniku
    function publishResult(player, ai, result){
        document.querySelector('[ data-summary="your-choice"]').textContent = player;
        document.querySelector('[ data-summary="ai-choice"]').textContent = ai;
        document.querySelector('p.numbers span').textContent = ++ gameSummary.numbers // ile razy zagraliśmy
        
        if (result ==="win"){
            document.querySelector('p.wins span').textContent = ++ gameSummary.wins;
            document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś!!";
            document.querySelector('[data-summary="who-win"]').style.color = "green";
        }
        else if (result ==="loss"){
            document.querySelector('p.losses span').textContent = ++ gameSummary.losses;
            document.querySelector('[data-summary="who-win"]').textContent = "Wygrał komputer :(";
            document.querySelector('[data-summary="who-win"]').style.color = "red";
        }
        else {
            document.querySelector('p.draws span').textContent = ++ gameSummary.draws;
            document.querySelector('[data-summary="who-win"]').textContent = "Remis";
            document.querySelector('[data-summary="who-win"]').style.color = "grey";
        }
    }
    function endGame(){
        document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
        game.playerHand= "";
    }

// funkcja startująca
function startGame() {
    if(!game.playerHand){ return alert("wybierz dłoń")// jeśli playerHand nie zostałą wybrana(wartość jest pusta)
    }
    game.aiHand = aiChoice() // co wybrał komputer
    const gameResult = checkResult(game.playerHand, game.aiHand)
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

hands.forEach(hand => hand.addEventListener('click', handSelection)) // nasłuchiwanie na klikniecie na konkretny element z dłońmi i wywołuje funkcje handselection
document.querySelector('.start').addEventListener('click', startGame)//pobieramy przycisk start i po kliknieciu wywołujemy startGame