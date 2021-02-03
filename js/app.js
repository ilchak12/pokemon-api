let pokeName = document.querySelector(".poke-name-input");
let searchBth = document.querySelector(".search-btn");
let loadBtn = document.querySelector(".load-more");

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function getPokemon(pokeid) {
    fetch(`${API_URL}/${pokeid}`)
    .then(res => res.json())
    .then(data => {
        const parentBlock = document.querySelector(".pokedex");
        const childBlock = document.createElement("div");
        const hpStat = data.stats[0].base_stat;
        const attackStat = data.stats[1].base_stat;
        const defenseStat = data.stats[2].base_stat;
        const specAttackStat = data.stats[3].base_stat;
        const specDefenseStat = data.stats[4].base_stat;
        const speedStat = data.stats[5].base_stat
        const weight = data.weight;
        const pokeType = data.types[0].type.name;

        childBlock.classList.add("pokemon", `${pokeType}`);
        childBlock.innerHTML = `
            <div class="poke-img">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png" alt="">
            </div>
            <div class="poke-name">
                <h2>${data.name} #${data.id}</h2>
            </div>
            <div class="poke-stats">
                <div class="hp-stat">HP: <span>${hpStat}</span></div>
                <div class="attack-stat">Attack: <span>${attackStat}</span></div>
                <div class="defense-stat">Defense: <span>${defenseStat}</span></div>
                <div class="spec-a-stat">Special Attack: <span>${specAttackStat}</span></div>
                <div class="spec-d-stat">Special Defense: <span>${specDefenseStat}</span></div>
                <div class="speed-stat">Speed: <span>${speedStat}</span></div>
                <div class="weight-stat">Weight: <span>${weight}</span></div>
            </div>
            <div class="poke-abilities">
                Abitlities: <span>${data.abilities.map(el => " " + el.ability.name)}</span>
            </div>
            <div class="right-top-angle ${pokeType}"></div>
            <div class="left-bottom-angle ${pokeType}"></div>
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

getPokemon(pokeName.value);
searchBth.addEventListener("click", function() {
    getPokemon(pokeName.value)
});

function loadPokes(currentCount = 20) {
    fetch(`${API_URL}?limit=${currentCount}`)
    .then(res => res.json())
    .then(data => {
        function createPokemon(el, i) {
            const parentBlock = document.querySelector(".pokedex-all");
            const childBlock = document.createElement("div");
            childBlock.classList.add("pokemon");
            childBlock.innerHTML = `
            <div class="poke-img">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${i+1}.png" alt="">
            </div>
            <div class="poke-name">
                <h2>${el.name} #${i+1}</h2>
            </div>
            `,
            parentBlock.appendChild(childBlock)

            fetch(`${API_URL}/${i+1}`)
            .then(res1 => res1.json())
            .then(data1 => {
                const pokeType = data1.types[0].type.name;
                childBlock.classList.add(pokeType);
            })
        }

        data.results.map((el, i) => 
            createPokemon(el, i),
        )

        let allPokes = document.querySelectorAll(".pokedex-all .pokemon");
        allPokes.forEach((el, i) => (
            el.addEventListener("click", function(e) {
                getPokemon(i+1);
                let currentActive = document.querySelector(".pokemon.active");
                if(el.classList.contains("active")) {
                    el.classList.add("active");
                } else {
                    el.classList.add("active");
                    currentActive.classList.remove("active");
                }
            }),
            document.addEventListener("click", function(e) {
                const its_poke = e.target == el || el.contains(e.target);
                const pokeIsAct = el.classList.contains("active");
                if(!its_poke && pokeIsAct) {
                    el.classList.remove("active")
                }
            })
        ))
    })
}

loadPokes();
let count = 20;
loadBtn.addEventListener("click", function() {
    let parent = document.querySelector(".pokedex-all");
    let child = document.querySelectorAll(".pokedex-all .pokemon");
    child.forEach(el => {
        parent.removeChild(el);
    })
    count = count + 10;
    loadPokes(count)
})


//BACK TO TOP and DOWN
let bttBtn = document.querySelector(".back-to-top");
let btdBtn = document.querySelector(".back-to-down");

function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if(scrolled > coords/2) {
        bttBtn.classList.add("show");
        btdBtn.classList.add("show");
    } else {
        bttBtn.classList.remove("show");
        btdBtn.classList.remove("show");
    }
}

function backToTop() {
    if(window.pageYOffset > 0) {
        window.scrollBy(0, -100);
        setTimeout(backToTop, 0);
    }
}

function backToDown() {
    if(window.pageYOffset > 0) {
        window.scrollTo(0, document.documentElement.scrollHeight);
    }
}

window.addEventListener("scroll", trackScroll);
bttBtn.addEventListener("click", backToTop);
btdBtn.addEventListener("click", backToDown);