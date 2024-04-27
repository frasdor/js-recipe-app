

const recipesList = document.getElementById('recipesList');
const resetBtn = document.getElementById('resetBtn');
const searchRecipeBtn = document.getElementById('searchRecipeBtn');
const inputField = document.getElementById('inputField');
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const removeButton = document.getElementById('removeButton');
const itemGrid = document.getElementById('itemGrid');

const APP_ID = '14494e99';
const APP_KEY = '326753c7d2788295f7e0e911fcf5fdf7';
let inputValue = '';
let itemToRemove = -1; // variable to track selected item (-1 means no choice)


inputField.addEventListener('change', (e) => {
    inputValue = e.target.value;
    console.log(inputValue);
});

searchRecipeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    recipesList.innerHTML = null;
    void getRecipes(inputField.value)
    inputField.value = '';
    getRecipes();
});

resetBtn.addEventListener('click', () => {
    recipesList.innerHTML = '';
    inputField.value = '';
}
);



function getRecipes() {
    fetch(`https://api.edamam.com/search?q=${inputValue}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const recipes = data.hits.slice(0, 4);
            recipes.forEach(item => {
                const { label, url, image } = item.recipe;
                const recipeItem = document.createElement('div');
                const imageElement = document.createElement('img');
                imageElement.src = image;
                recipeItem.appendChild(imageElement);
                const recipeLink = document.createElement('a');
                recipeLink.classList.add('link');
                recipeLink.href = url;
                recipeLink.textContent = label;
                recipeItem.appendChild(recipeLink);
                recipesList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

resetBtn.addEventListener('click', () => {
    recipesList.innerHTML = '';
    inputField.value = '';
});



  itemGrid.addEventListener('click', function(event) {
    //let target= event.target;
    //let li = target// target.closest('li');  // get reference by using closest
    
    let li = event.target;
    //console.log(li);
    let ulItems = Array.from( li.closest('ul').children ); // get array
    let index = ulItems.indexOf( li ); 
    itemToRemove = index; // itemToRemove gets index of the clicked element  
});
    
 // function to add items to the list
    function addItemToList(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;

    // what happens when mouse is over the button
    listItem.addEventListener('mouseover', function() { 
        listItem.style.backgroundColor = '#333';
        listItem.style.fontWeight = 'bold';
        listItem.style.transition = '.5s';
        
    });

    //what happens when mouse is out the button
    listItem.addEventListener('mouseout', function() {
        listItem.style.backgroundColor = '';
        listItem.style.fontWeight = '';
    });

   // add listItem to itemGrid as a child
    itemGrid.appendChild(listItem);
}

// Add button
addItemBtn.addEventListener('click', function() {
    const text = itemInput.value.trim();

    // check if text field is empty
    if (text) {
        addItemToList(text);
        itemInput.value = ''; // clear the text field
    }
});

// Remove button
removeButton.addEventListener('click', function() {
    const listItems = itemGrid.getElementsByTagName('li');
    
    if (listItems.length > 0 && itemToRemove>-1) {
        itemGrid.removeChild(listItems[itemToRemove]); // remove most recently clicked
        itemToRemove = -1;
    }
});