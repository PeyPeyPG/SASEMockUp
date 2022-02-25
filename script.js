var pokeNum = Math.floor(Math.random() * 898) + 1; //variable for number of Pokemon
var giveUpBool = false;

function fetchPokemom() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then( (res) => {
        return res.json();
    })
    .then( (data) => {
        const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default']
        };
        document.getElementById("randomPoke").style.filter="brightness(0%)";
        var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;
        document.getElementById("randomPoke").src=`${url}`;
        var pokeStr = JSON.stringify(document.getElementById(`guess`).value);
        console.log(document.getElementById(`guess`).value);
        console.log(JSON.stringify(pokemon.name));
        if (giveUpBool) {
            show();
            document.getElementById(`guess`).value = pokemon.name;
        }
        if (pokeStr === JSON.stringify(pokemon.name)){
            show();
            document.getElementById(`guessButton`).style.backgroundColor = "lime";
            document.getElementById(`guessButton`).style.color = "white";
            document.getElementById(`guessButton`).innerHTML = "CORRECT";
            document.getElementById(`giveButton`).innerHTML = "TRY AGAIN";
        }
        else if (pokeStr.length > 2){
            console.log(JSON.stringify(document.getElementById(`guess`).value).length)
            document.getElementById(`guessButton`).style.backgroundColor = "red";
            document.getElementById(`guessButton`).style.color = "white";
            document.getElementById(`guessButton`).innerHTML = "TRY AGAIN";
            document.getElementById(`guess`).value = "";
        }
    })
}

function randomId(){
    pokeNum = Math.floor(Math.random() * 898) + 1; 
    fetchPokemom();
}

function hide(){
    document.getElementById("randomPoke").style.filter="brightness(0%)";
}

function show(){
    document.getElementById("randomPoke").style.filter="brightness(100%)";
}

function guessAgain(){
    document.getElementById(`guess`).value = "";
    document.getElementById(`guessButton`).innerHTML = "GUESS";
    document.getElementById(`guessButton`).style.color = "black";
    document.getElementById(`guessButton`).style.backgroundColor = "white";
}

function giveUp(){
    if (document.getElementById(`giveButton`).innerHTML === "GIVE UP"){
        show();
        document.getElementById(`giveButton`).innerHTML = "TRY AGAIN";
        giveUpBool = true;
        fetchPokemom();
    }
    else if (document.getElementById(`giveButton`).innerHTML === "TRY AGAIN"){
        document.getElementById(`giveButton`).innerHTML = "GIVE UP";
        giveUpBool = false;
        hide();
        randomId();
        guessAgain();
    }
}

function guess(){
    fetchPokemom();
}

randomId();
document.getElementById("giveButton").addEventListener("click", giveUp);
document.getElementById("guessButton").addEventListener("click", guess);
fetchPokemom();