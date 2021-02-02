let pokeName = document.querySelector(".poke-name-input");
let searchBth = document.querySelector(".search-btn");

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function getPokemon() {
    fetch(`${API_URL}/${pokeName.value}`)
    .then(res => res.json())
    .then(data => {
        const parentBlock = document.querySelector(".pokedex");
        const childBlock = document.createElement("div");
        childBlock.classList.add("pokemon");
        childBlock.innerHTML = `
            <div class="poke-img">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png" alt="">
            </div>
            <div class="poke-name">
                <h2>${data.name}</h2>
            </div>
            <div class="poke-stats">
                <div class="hp-stat">HP: <span>${data.stats[0].base_stat}</span></div>
                <div class="attack-stat">Attack: <span>${data.stats[1].base_stat}</span></div>
                <div class="defense-stat">Defense: <span>${data.stats[2].base_stat}</span></div>
                <div class="spec-a-stat">Special Attack: <span>${data.stats[3].base_stat}</span></div>
                <div class="spec-d-stat">Special Defense: <span>${data.stats[4].base_stat}</span></div>
                <div class="speed-stat">Speed: <span>${data.stats[5].base_stat}</span></div>
                <div class="weight-stat">Weight: <span>${data.weight}</span></div>
            </div>
            <div class="right-top-angle"></div>
            <div class="left-bottom-angle"></div>
        `
        let currentChild = document.querySelector(".pokemon");
        if(!currentChild) {
            parentBlock.appendChild(childBlock);
        } else {
            currentChild.remove(childBlock);
            parentBlock.appendChild(childBlock);
        }
    })
}

getPokemon();
searchBth.addEventListener("click", getPokemon);