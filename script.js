var pokeNum; //variable for number of Pokemon
var giveUpBool = false; //variable to see if player has given up
var streakNum = 0;

//fetching pokemon data from api
function fetchPokemom() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then( (res) => {
        return res.json();
    })
    .then( (data) => {
        const pokemon = { //creates pokemon object
            name: data.name,
            id: data.id,
            image: data.sprites['front_default']
        };
        const name = pokemon.name;
        if ((pokemon.name).includes("-")){
            const arr = (pokemon.name).split("-");
            name = arr[0]
        }
        hide(); 
        var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;
        document.getElementById("randomPoke").src=`${url}`; //uses pokeNum to get image
        var pokeStr = JSON.stringify(document.getElementById(`guess`).value); //creates variable for future comparisons
        if (giveUpBool) {
            show();
            document.getElementById(`guess`).value = pokemon.name; //puts pokemon name in input bar
        }
        if ((pokeStr.toLowerCase()).includes(pokemon.name)){
            show();
            document.getElementById(`guess`).style.backgroundImage = "url('check2-circle.svg')"
            document.getElementById(`guess`).style.backgroundColor = "lime";
            document.getElementById(`giveButton`).innerHTML = "TRY ANOTHER!"
            streakNum++;
            document.getElementById(`streak`).innerHTML = `Streak: ${streakNum}`;
        }
        else if (pokeStr.length > 2){
            document.getElementById(`guess`).value = "";
            document.getElementById(`guess`).placeholder = "TRY AGAIN";
            document.getElementById(`guess`).style.backgroundImage = "url('x-circle.svg')"
        }
    })
}

function randomId(){ //reasigns pokeNum with another random value
    pokeNum = Math.floor(Math.random() * 898) + 1; 
    fetchPokemom();
}

function hide(){ //turns pokemon black
    document.getElementById("randomPoke").style.filter="brightness(0%)";
}

function show(){ //reveals pokemon
    document.getElementById("randomPoke").style.filter="brightness(100%)";
}

function guessAgain(){ //guess input box style changes
    document.getElementById(`guess`).value = "";
    document.getElementById(`guess`).placeholder = "ENTER TO SUBMIT";
    document.getElementById(`guess`).style.backgroundImage = "url('question-circle.svg')"
    document.getElementById(`guess`).style.backgroundColor = "white";
}

function giveUp(){ //changes give up button to try again button and vice versa
    if (document.getElementById(`giveButton`).innerHTML === "GIVE UP"){
        show();
        document.getElementById(`giveButton`).innerHTML = "TRY AGAIN";
        document.getElementById(`guess`).style.backgroundImage = "url('x-circle.svg')"
        streakNum = 0;
        document.getElementById(`streak`).innerHTML = `Streak: ${streakNum}`;
        giveUpBool = true; //turns bool to true for other comparisons
        fetchPokemom();
    }
    else if (document.getElementById(`giveButton`).innerHTML !== "GIVE UP"){
        document.getElementById(`giveButton`).innerHTML = "GIVE UP";
        giveUpBool = false; //turns bool to false for other comparisons
        hide();
        randomId();
        guessAgain();
    }
}

function enterGuess(){ //guess with enter key
    document.getElementById(`guess`).addEventListener("keyup", function(event) {
        if (event.keyCode === 13){
            event.preventDefault();
            fetchPokemom();
            console.log(document.getElementById('guess').value)
        }
    })
}

randomId(); //initial random num and initial fetch
document.getElementById("giveButton").addEventListener("click", giveUp); //checks giveUp button and runs giveUp function if clicked
enterGuess();