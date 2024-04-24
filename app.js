const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemGrid');
const recipesList = document.getElementById('recipesList');
const savedRecipesList = document.getElementById('savedRecipesList');
const resetBtn = document.getElementById('resetBtn');
const searchRecipeBtn = document.getElementById('searchRecipeBtn');
const inputField = document.getElementById('inputField');

const APP_ID = '14494e99';
const APP_KEY = '326753c7d2788295f7e0e911fcf5fdf7';
let inputValue = '';

inputField.addEventListener('change', handleInputChange);
addItemBtn.addEventListener('click', addItem);
searchRecipeBtn.addEventListener('click', searchRecipes);
resetBtn.addEventListener('click', resetForm);

function handleInputChange(e) {
    inputValue = e.target.value;
    console.log(inputValue);
}

function addItem() {
    const newItemText = itemInput.value.trim();
    if (newItemText !== '') {
        const li = document.createElement('li');
        li.textContent = newItemText;
        itemList.appendChild(li);
        itemInput.value = '';
    }
}

function searchRecipes(e) {
    e.preventDefault();
    const query = inputField.value.trim();
    if (query !== '') {
        recipesList.innerHTML = '';
        getRecipes(query);
        inputField.value = '';
    }
}

function resetForm() {
    recipesList.innerHTML = '';
    inputField.value = '';
}

function getRecipes(inputValue) {
    fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayRecipes(data.hits.slice(0, 8));
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function displayRecipes(recipes) {
    recipes.forEach(item => {
        const { label, url, image } = item.recipe;
        const recipeItem = createRecipeItem(label, url, image);
        recipesList.appendChild(recipeItem);
        const addBtn = recipeItem.querySelector('button');
        addBtn.addEventListener('click', () => addSavedRecipe(label, url));
    });
}

function createRecipeItem(label, url, image) {
    const recipeItem = document.createElement('div');
    const imageElement = document.createElement('img');
    imageElement.src = image;
    recipeItem.appendChild(imageElement);
    const recipeLink = document.createElement('a');
    const addBtn = document.createElement('button');
    recipeLink.classList.add('link');
    addBtn.textContent = "Save this Recipe";
    recipeLink.href = url;
    recipeLink.target = "_blank";
    recipeLink.textContent = label;
    recipeItem.appendChild(recipeLink);
    recipeItem.appendChild(addBtn);
    return recipeItem;
}

function addSavedRecipe(label, url) {
    const savedRecipeItem = document.createElement('li');
    const savedRecipeLink = document.createElement('a');
    const labelTextNode = document.createTextNode(label);
    savedRecipeLink.href = url;
    savedRecipeLink.appendChild(labelTextNode);
    savedRecipeItem.appendChild(savedRecipeLink);
    savedRecipesList.appendChild(savedRecipeItem);
    savedRecipeLink.target = "_blank";
}