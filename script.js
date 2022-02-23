var pokeImage = document.getElementById('randomPoke')

function fetchPokemom() {
    var pokeNum = Math.floor(Math.random() * 898) + 1; //variable for number of Pokemon
    console.log(pokeNum)
    fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then( res => {
        return res.json
    })
    .then( data => {
        console.log(data);
        const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites['front_default']
        };
        document.getElementById("randomPoke").src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
    })
    
}

function changeImg(){
    document.getElementById("randomPoke").src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382`.png";
    const para = document.createElement("p");
    para.innerText = "pokemon";
    document.body.appendChild(p);
}
fetchPokemom();
changeImg();