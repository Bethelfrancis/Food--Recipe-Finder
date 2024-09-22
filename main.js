const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const foodContainer = document.querySelector('.food-container');
const loadMoreBtn = document.getElementById('load-more');
const hambuger = document.querySelector('.hambuger');
const mobileNav = document.querySelector('.nav-links');
const navBtn = document.querySelectorAll('.nav-link-btn');

let startingIndex = 0;
let endingIndex = 4;
let allFoods = []

const fetchFoodData = async () => {
  try {
    const foodName = searchInput.value;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    const data = await res.json();

    if (!searchInput.value) {
      return alert('Input a value');
    }

    if (!data.meals) {
      return foodContainer.innerHTML = `<p>Food not found.</p>`;
    }

    allFoods = data.meals;
    displayFoods(startingIndex, endingIndex);

    if (allFoods.length > endingIndex) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none'
    }

  } catch (err) {
    console.log(err);
    alert('An error occurred while fetching the food data');
  }
}

const displayFoods = (start, end) => {
  foodContainer.innerHTML += allFoods.slice(startingIndex, endingIndex)
      .map(food => {
        return `
          <div class="food-item">
            <div class="food-image">
              <img src="${food.strMealThumb}" alt="${food.strMeal}" />
            </div>
            <div class="food-details">
              <h3>${food.strMeal}</h3>
              <p class="food-country">Country: ${food.strArea}</p>
              <div class="recipe-links">
                <a href="${food.strSource}" target="_blank" class="recipe-btn">View Recipe</a>
                <iframe src="${food.strYoutube.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        `
      })
      .join('');
}

hambuger.addEventListener('click', () => {
  hambuger.classList.toggle('open');
  mobileNav.classList.toggle('show');
})

navBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    hambuger.classList.remove('open');
    mobileNav.classList.remove('show');
  })
})

searchButton.addEventListener('click', e => {
  e.preventDefault();
  startingIndex = 0
  endingIndex = 4;
  foodContainer.innerHTML = '';
  fetchFoodData();
})

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
})

loadMoreBtn.addEventListener('click', () => {
  startingIndex += 4;
  endingIndex += 4;

  displayFoods(startingIndex, endingIndex);

  if (endingIndex >= allFoods.length) {
    loadMoreBtn.style.display = 'none';
  }
})