function showDishDetails(name, price) {
    const details = document.getElementById('dish-details');
    details.innerHTML = `<h3>${name}</h3><p>Price: $${price}</p>`;
    details.style.display = 'block';
  }
  
  let mealPlan = [];
  let totalPrice = 0;
  
  function addToMealPlan(dishName, price) {
    mealPlan.push({ dishName, price });
    totalPrice += price;
    updateMealPlan();
  }
  
  function updateMealPlan() {
    const mealPlanList = document.getElementById('meal-plan-list');
    mealPlanList.innerHTML = '';
    mealPlan.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.dishName} - $${item.price}`;
      listItem.onclick = () => removeFromMealPlan(index);
      mealPlanList.appendChild(listItem);
    });
  
    document.getElementById('total-price').textContent = totalPrice;
  }
  
  function removeFromMealPlan(index) {
    totalPrice -= mealPlan[index].price;
    mealPlan.splice(index, 1);
    updateMealPlan();
  }
  