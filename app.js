let totalBudget = document.getElementById('totalBudget');
let totalBudgetNumber = document.getElementById('totalBudgetNumber');
let savedBudget = parseFloat(localStorage.getItem("savedBudget")) || 0;

let totalExpenseNumber = document.getElementById('totalExpenseNumber');
let savedExpense = parseFloat(localStorage.getItem("savedExpense")) || 0;

let totalBalanceNumber = document.getElementById('totalBalanceNumber');

let productName = document.getElementById('productName');
let productPrize = document.getElementById('productPrize');

let maintable = document.getElementById('maintable');
let savedData = JSON.parse(localStorage.getItem("savedProducts")) || [];

let totalExpense = 0;

let alertBox = document.getElementById('alertBox');
let alertdiv = document.getElementById('alertdiv');

function showAlert() {
  alertdiv.style.visibility = 'visible';
  setTimeout(() => {
    alertdiv.style.visibility = 'hidden';
  }, 2000);
}

function addBudget() {
  let totalBudgetValue = parseFloat(document.getElementById('totalBudget').value);
  if (!isNaN(totalBudgetValue) && totalBudgetValue > 0) {
    totalBudgetNumber.innerText = totalBudgetValue;
    localStorage.setItem('savedBudget', JSON.stringify(totalBudgetValue));
    savedBudget = totalBudgetValue;
    alertdiv.style.backgroundColor = 'green';
    alertBox.innerText = `Added ${totalBudgetValue} budget!`
    showAlert();
    balanceCheck();
  }
  else {
    alertBox.innerText = `Add a number to add budget`;
    alertdiv.style.backgroundColor = 'rgb(146, 0, 0)';
    showAlert();
  }
}

budgetCheck();
expenseCheck();
balanceCheck();

function budgetCheck() {
  totalBudgetNumber.innerText = savedBudget;
  totalBudget.value = savedBudget;
}

function balanceCheck() {
  totalBalanceNumber.innerText = savedBudget - totalExpense;
}

function expenseCheck() {
  totalExpense = savedExpense;
  totalExpenseNumber.innerText = totalExpense;
}

function addItem() {
  let prizeValue = parseFloat(productPrize.value);
  if (productName.value !== "" && !isNaN(prizeValue) && prizeValue > 0) {
    if (savedBudget !== 0){
    if (Number(productPrize.value) <= Number(totalBalanceNumber.innerText)) {
      alertBox.innerText = `Added ${productName.value} for ${productPrize.value}!`
      alertdiv.style.backgroundColor = 'green';
      showAlert();
    let serial = savedData.length + 1;
    maintable.innerHTML += `<tr id="row-${serial}">
                              <th scope="row">${serial}</th>
                              <td>${productName.value}</td>
                              <td>${prizeValue}</td>
                              <td><button class="btn btn-danger" onclick="deleteButton(${serial})"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button></td>
                            </tr>`;

    let savedItems = {
      serial: serial,
      productName: productName.value,
      productPrize: prizeValue
    };

    savedData.push(savedItems);
    localStorage.setItem('savedProducts', JSON.stringify(savedData));

    totalExpense += prizeValue;
    localStorage.setItem('savedExpense', JSON.stringify(totalExpense));

    totalExpenseNumber.innerHTML = totalExpense;
    balanceCheck();

    productName.value = '';
    productPrize.value = '';
  }
  else{
    alertBox.innerText = `Low budget! Your current budget is ${savedBudget}!`
    alertdiv.style.backgroundColor = 'rgb(146, 0, 0)';
    showAlert();
  }
}
  else{
    alertBox.innerText = `Please first add the budget!`
    alertdiv.style.backgroundColor = 'rgb(146, 0, 0)';
    showAlert();
  }
}
  else {
    alertBox.innerText = `Fill all the fields to add a product!`;
    alertdiv.style.backgroundColor = 'rgb(146, 0, 0)';
    showAlert();
  }
}

displayItems();

function displayItems() {
  maintable.innerHTML = '';
  if (savedData.length > 0) {
    savedData.forEach((item, index) => {
      maintable.innerHTML += `<tr id="row-${index + 1}">
                                <th scope="row">${index + 1}</th>
                                <td>${item.productName}</td>
                                <td>${item.productPrize}</td>
                                <td><button class="btn btn-danger" onclick="deleteButton(${item.serial})"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button></td>
                              </tr>`;
    });
  } else {
    console.log('no data');
  }
}

function resetData() {
  alertBox.innerText = `All the data has been reset!`
  alertdiv.style.backgroundColor = 'green';
  showAlert();

  localStorage.clear();

  maintable.innerHTML = '';
  totalBudgetNumber.innerText = 0;
  totalBudget.value = 0;
  totalExpenseNumber.innerText = 0;
  totalBalanceNumber.innerText = 0;

  totalExpense = 0;
  savedBudget = 0;
  savedExpense = 0;
  savedData = [];

  productName.value = '';
  productPrize.value = '';
}

function deleteButton(serial) {
  const itemToDelete = savedData.find(item => item.serial === serial);

  if (itemToDelete) {
    totalExpense -= parseFloat(itemToDelete.productPrize);
    localStorage.setItem('savedExpense', JSON.stringify(totalExpense));
    totalExpenseNumber.innerHTML = totalExpense;

    savedData = savedData.filter(item => item.serial !== serial);
    localStorage.setItem("savedProducts", JSON.stringify(savedData));

    displayItems();
    balanceCheck();

    alertBox.innerText = `Serial ${serial} deleted!`
    alertdiv.style.backgroundColor = 'rgb(146, 0, 0)';
    showAlert();
  }
}
