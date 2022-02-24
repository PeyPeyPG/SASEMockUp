var pokeNum = Math.floor(Math.random() * 898) + 1; //variable for number of Pokemon

function fetchPokemom() {
    console.log(pokeNum)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    .then( (res) => {
        return res.json();
    })
    .then( (data) => {
        console.log(data);
        const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default']
        };
        console.log(pokemon.name);
        document.getElementById("randomPoke").style.filter="brightness(0%)";
        var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;
        document.getElementById("randomPoke").src=`${url}`;
        console.log(url);
        console.log(document.getElementById(`guess`).value);
        console.log(JSON.stringify(pokemon.name));
        if ((JSON.stringify(document.getElementById('guess').value) === "a")){
            console.log("works");
        }
    })
}

function randomId(){
    pokeNum = Math.floor(Math.random() * 898) + 1; 
    fetchPokemom();
    /*document.getElementById("randomPoke").style.filter="brightness(0%)";
    var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Math.floor(Math.random() * 898) + 1}.png`;
    document.getElementById("randomPoke").src=`${url}`;
    console.log(url);
    */
}

function show(){
    document.getElementById("randomPoke").style.filter="brightness(100%)";
}

function guess(poke){
    if (document.getElementById(`guess`).value === poke){
        console.log(works);
    }
}

randomId();
document.getElementById("showButton").addEventListener("click", show);
document.getElementById("randButton").addEventListener("click", randomId);
document.getElementById("guessButton").addEventListener("click", guess);
fetchPokemom();