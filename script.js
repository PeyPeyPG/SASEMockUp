var pokeNum; //variable for number of Pokemon
var giveUpBool = false; //variable to see if player has given up

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
        hide(); 
        var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;
        document.getElementById("randomPoke").src=`${url}`; //uses pokeNum to get image
        var pokeStr = JSON.stringify(document.getElementById(`guess`).value); //creates variable for future comparisons
        if (giveUpBool) {
            show();
            document.getElementById(`guess`).value = pokemon.name; //puts pokemon name in input bar
        }
        if (pokeStr.toLowerCase() === JSON.stringify(pokemon.name)){
            show();
            //changes the look of both buttons
            document.getElementById(`guessButton`).style.backgroundColor = "lime";
            document.getElementById(`guessButton`).style.color = "white";
            document.getElementById(`guessButton`).innerHTML = "CORRECT";
            document.getElementById(`giveButton`).innerHTML = "TRY AGAIN";
        }
        else if (pokeStr.length > 2){
            //changes the look of both buttons and makes the input bar blank
            document.getElementById(`guessButton`).style.backgroundColor = "red";
            document.getElementById(`guessButton`).style.color = "white";
            document.getElementById(`guessButton`).innerHTML = "TRY AGAIN";
            document.getElementById(`guess`).value = "";
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

function guessAgain(){ //guess button and input box style changes
    document.getElementById(`guess`).value = "";
    document.getElementById(`guessButton`).innerHTML = "GUESS";
    document.getElementById(`guessButton`).style.color = "black";
    document.getElementById(`guessButton`).style.backgroundColor = "white";
}

function giveUp(){ //changes give up button to try again button and vice versa
    if (document.getElementById(`giveButton`).innerHTML === "GIVE UP"){
        show();
        document.getElementById(`giveButton`).innerHTML = "TRY AGAIN";
        giveUpBool = true; //turns bool to true for other comparisons
        fetchPokemom();
    }
    else if (document.getElementById(`giveButton`).innerHTML === "TRY AGAIN"){
        document.getElementById(`giveButton`).innerHTML = "GIVE UP";
        giveUpBool = false; //turns bool to false for other comparisons
        hide();
        randomId();
        guessAgain();
    }
}

randomId(); //initial random num and initial fetch
document.getElementById("giveButton").addEventListener("click", giveUp); //checks giveUp button and runs giveUp function if clicked
document.getElementById("guessButton").addEventListener("click", fetchPokemom); //checks guess button and runs fetchPokemon function if clicked