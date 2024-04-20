

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemGrid');

const recipesList = document.getElementById('recipesList');
const addRecipeBtn = document.getElementById('addRecipeBtn');
const searchRecipeBtn = document.getElementById('searchRecipeBtn');
const inputField = document.getElementById('inputField');

const APP_ID = '14494e99';
const APP_KEY = '326753c7d2788295f7e0e911fcf5fdf7';
let inputValue =  ''; 



inputField.addEventListener('change', (e) => {
    inputValue = e.target.value;
    console.log(inputValue);
});

addItemBtn.addEventListener('click', addItem);

searchRecipeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recipesList.innerHTML = null;
    void getRecipes(inputField.value)
    inputField.value = '';
    getRecipes();
});

addRecipeBtn.addEventListener('click', addRecipe);

function addItem() {
    const newItemText = itemInput.value.trim();
    if (newItemText !== '') {
        const li = document.createElement('li');
        li.textContent = newItemText;
        itemList.appendChild(li);
        itemInput.value = '';
    }
}

function getRecipes() {
    fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const recipes = data.hits;
            recipes.map((item)=>{
                const { label, url } = item.recipe;
                recipesList.innerHTML += `<li><a class="link" href="${ url }" >${ label }</a></li>`
            })
        });
}

function addRecipe() {
    const newRecipeText = itemInput.value.trim();
    if (newRecipeText !== '') {
        const li = document.createElement('li');
        li.textContent = newRecipeText;
        recipesList.appendChild(li);
        itemInput.value = '';
    }
}
