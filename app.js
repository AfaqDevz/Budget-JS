let totalBudget = document.getElementById('totalBudget');
let totalBudgetNumber = document.getElementById('totalBudgetNumber');
let savedBudget = JSON.parse(localStorage.getItem("savedBudget")) ?? 0;

let totalExpenseNumber = document.getElementById('totalExpenseNumber');
let savedExpense = JSON.parse(localStorage.getItem("savedExpense")) ?? 0;

let totalBalanceNumber = document.getElementById('totalBalanceNumber');

let productName = document.getElementById('productName');
let productPrize = document.getElementById('productPrize');

let maintable = document.getElementById('maintable');
let savedData = JSON.parse(localStorage.getItem("savedProducts")) ?? [];

let totalExpense = 0;

function addBudget() {
    let totalBudgetValue = Number(document.getElementById('totalBudget').value);
    if (totalBudgetValue !== '' && totalBudgetValue !== 0) {
        totalBudgetNumber.innerText = totalBudgetValue;
        addedBudget();
        localStorage.setItem('savedBudget', totalBudgetValue);
        balanceCheck();
    } else {
        fillFields();
    }
}

budgetCheck();
expenseCheck();
balanceCheck();

function budgetCheck() {
    let savedBudget = JSON.parse(localStorage.getItem("savedBudget")) ?? 0;
    totalBudgetNumber.innerText = savedBudget;
    totalBudget.value = savedBudget;
}

function balanceCheck() {
    let savedBudget = JSON.parse(localStorage.getItem("savedBudget")) ?? 0;
    let savedExpense = JSON.parse(localStorage.getItem("savedExpense")) ?? 0;
    let balance = savedBudget - savedExpense;
    totalBalanceNumber.innerText = balance;
}

function expenseCheck() {
    let savedExpense = JSON.parse(localStorage.getItem("savedExpense")) ?? 0;
    totalExpense = savedExpense;
    totalExpenseNumber.innerText = totalExpense;
}

function addItem() {
    if (productName.value !== "" && productPrize.value !== "") {
        addedItem();
        let serial = savedData.length + 1;
        maintable.innerHTML += `<tr id="row-${serial}">
                      <th scope="row">${serial}</th>
                      <td>${productName.value}</td>
                      <td>${productPrize.value}</td>
                      <td><button class="btn btn-danger" onclick="deleteButton(${serial})">Delete</button></td>
                    </tr>`;

        let savedItems = {
            serial: serial,
            productName: productName.value,
            productPrize: productPrize.value
        }

        savedData.push(savedItems);
        localStorage.setItem('savedProducts', JSON.stringify(savedData));

        totalExpense += Number(productPrize.value);
        localStorage.setItem('savedExpense', totalExpense);

        totalExpenseNumber.innerText = totalExpense;
        balanceCheck();

    } else {
        fillFields();
    }
}

displayItems();

function displayItems() {
    maintable.innerHTML = '';
    if (savedData.length > 0) {
        savedData.forEach((savedData, index) => {
            maintable.innerHTML += `<tr id="row-${index + 1}">
                <th scope="row">${index + 1}</th>
                <td>${savedData.productName}</td>
                <td>${savedData.productPrize}</td>
                <td><button class="btn btn-danger" onclick="deleteButton(${savedData.serial})">Delete</button></td>
                </tr>`;
        });
    } else {
        console.log('no data');
    }
}

function resetData() {
    localStorage.clear();

    maintable.innerHTML = '';
    totalBudgetNumber.innerText = 0;
    totalBudget.value = 0;
    totalExpenseNumber.innerText = 0;
    totalBalanceNumber.innerText = 0;
}

function deleteButton(serial) {
    const itemToDelete = savedData.find(savedItems => savedItems.serial === serial);

    if (itemToDelete) {
        totalExpense -= Number(itemToDelete.productPrize);
        localStorage.setItem('savedExpense', totalExpense);
        totalExpenseNumber.innerText = totalExpense;

        savedData = savedData.filter(savedItems => savedItems.serial !== serial);
        localStorage.setItem("savedProducts", JSON.stringify(savedData));

        displayItems();
        deletedItem();
        balanceCheck();
    }
}

function fillFields() {
    Swal.fire({
        icon: "error",
        title: "Please fill all the fields!",
    });
}

function addedBudget() {
    Swal.fire({
        icon: "success",
        title: "Added Budget!",
    });
}

function addedItem() {
    Swal.fire({
        icon: "success",
        title: "Added item!",
    });
}

function deletedItem() {
    Swal.fire({
        icon: "info",
        title: "Item deleted!",
    });
}
