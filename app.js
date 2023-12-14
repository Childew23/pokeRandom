const button = document.getElementById('button'); //bouton
const imgWrapper = document.getElementById('img-wrapper'); //div qui va contenir l'image
const pokeNumber = document.getElementById('number'); //l'ID du pokémon dans le pokédex 
const pokeName = document.getElementById('name'); //le nom du pokémon en anglais
const body = document.querySelector('body'); //le body
const typeWrapper = document.getElementById('type-wrapper'); //div qui va afficher tous les types du pokémon

//Fonction asynchrone qui va changer le pokemon à chaque clic sur le buoton ou rafraichissement de la page
async function changePokemon() {
    let randomNumber = Math.ceil(Math.random() * 1007) + 1;  //Nombre qui va générer un pokemon aléatoire 
    let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    let data = await fetch(requestString);
    let response = await data.json(); //Ça nous donne notre reponse sous format JSON

    imgWrapper.innerHTML = ''; //On remet à 0 le HTML de la div pour éviter qu'on rajoute des pokémon à chaque fois qu'on clique sur le bouton
    typeWrapper.innerHTML = ''; //On remet à 0 le HTML de la div pour éviter qu'on rajoute des types à chaque fois qu'on clique sur le bouton
    const image = document.createElement('img'); //On crée une image qui va contenir l'image du pokémon
    image.src = response.sprites.front_default; //Sprite de devant du pokémon
    image.alt = `sprite of ${response.name}`;
    image.id = 'image';
    imgWrapper.appendChild(image);
    pokeNumber.textContent = `#${response.id}`; //ID du pokémon dans le pokédex
    pokeName.textContent = response.name; //Le nom du pokémon

    //Objet qui relie un type à une couleur
    const typeColor = {
        'normal': '#a0a2a0',
        'fighting': '#ff8100',
        'flying': '#82baef',
        'poison': '#923fcc',
        'ground': '#915121',
        'rock': '#b0aa82',
        'bug': '#92a212',
        'ghost': '#704170',
        'steel': '#60a2b9',
        'fire': '#e72324',
        'water': '#2481ef',
        'grass': '#3da224',
        'electric': '#fac100',
        'psychic': '#ef3f7a',
        'ice': '#3dd9ff',
        'dragon': '#4f60e2',
        'dark': '#50413f',
        'fairy': '#ef70ef',
    }

    //Tableau qui va contenir le type ou les types du pokémon
    const pokeTypes = [];

    //On rajoute les types dans le tableau pokeTypes
    response.types.forEach(type => {
        pokeTypes.push(type.type.name);
    });

    //La couleur du body va dépendre du nombre et des différents types du pokémon
    if (pokeTypes.length > 1) {
        const bgColor1 = typeColor[pokeTypes[0]];
        const bgColor2 = typeColor[pokeTypes[1]];
        body.style.background = `linear-gradient(140deg, ${bgColor1} 0%, ${bgColor2} 100%)`;
        button.style.backgroundColor = bgColor1;

        // On crée 2 images en fonction des types du pokémon
        const type1 = document.createElement('img');
        type1.src = `img/${pokeTypes[0]}.png`;
        type1.alt = `picture ${pokeTypes[0]}`;
        const type2 = document.createElement('img');
        type2.src = `img/${pokeTypes[1]}.png`;
        type2.alt = `picture ${pokeTypes[1]}`;
        //On les rajoute à typeWrapper pour les afficher
        typeWrapper.appendChild(type1);
        typeWrapper.appendChild(type2);

    } else {
        const bgColor = typeColor[pokeTypes[0]];
        body.style.background = bgColor;
        button.style.backgroundColor = bgColor;

        //On créé une image qui va changer en fonction du type du pokémon
        const type = document.createElement('img');
        type.src = `img/${pokeTypes[0]}.png`;
        type.alt = `picture ${pokeTypes[0]}`;
        typeWrapper.appendChild(type); //On rajoute le type pour les afficher
    }
};

changePokemon(); //La fonction se lance dès le chargement la page
button.addEventListener('click', changePokemon); //Quand on clique sur le bouton ça lance la fonction changePokemon