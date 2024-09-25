document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.dishes img');
  const dishDetails = document.getElementById('dish-details');

  const showDishDetails = (dishName, price) => {
    dishDetails.innerHTML = `
      <h3>${dishName}</h3>
      <p>Price: $${price.toFixed(2)}</p>
    `;
  };

  const resetImages = () => {
    images.forEach(img => img.style.transform = 'scale(1)');
  };

  images?.forEach(image => {
    image.addEventListener('click', function () {
      const dishName = this.alt;
      const price = parseFloat(this.getAttribute('data-price'));

      showDishDetails(dishName, price);

      resetImages();
      this.style.transform = 'scale(1.2)';
    });
  });

  const availableDishes = document.querySelectorAll('#available-dishes li');
  const mealPlan = document.getElementById('meal-plan');
  const totalCostElement = document.getElementById('total-cost');
  let totalCost = 0;

  const updateTotalCost = () => {
    totalCostElement.textContent = totalCost.toFixed(2);
  };

  const addDishToMealPlan = (dishName, price) => {
    const mealPlanItem = document.createElement('li');
    mealPlanItem.textContent = `${dishName} - $${price.toFixed(2)} `;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      totalCost -= price;
      mealPlan.removeChild(mealPlanItem);
      updateTotalCost();
    });

    mealPlanItem.appendChild(removeBtn);
    mealPlan.appendChild(mealPlanItem);

    totalCost += price;
    updateTotalCost();
  };

  availableDishes?.forEach(dish => {
    const addButton = dish.querySelector('.add-btn');
    addButton.addEventListener('click', () => {
      const dishName = dish.getAttribute('data-name');
      const price = parseFloat(dish.getAttribute('data-price'));

      addDishToMealPlan(dishName, price);
    });
  });
});

  