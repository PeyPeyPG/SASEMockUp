var pokeImage = document.getElementById('randomPoke')

function fetchPokemom() {
    var pokeNum = Math.floor(Math.random() * 898) + 1; //variable for number of Pokemon
    console.log(pokeNum)
    fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then( res => {
        return res.json
    })
    /*.then( data => {
        console.log(data);
        const pokemon = results.map((data) => {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default']
        });
        document.getElementById("randomPoke").src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
    })*/
    
}

function randomId(){
    document.getElementById("randomPoke").style.filter="brightness(0%)";
    var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Math.floor(Math.random() * 898) + 1}.png`;
    document.getElementById("randomPoke").src=`${url}`;
    console.log(url);
    
}

function show(){
    document.getElementById("randomPoke").style.filter="brightness(100%)";
}

randomId();
document.getElementById("showButton").addEventListener("click", show);
document.getElementById("randButton").addEventListener("click", randomId);