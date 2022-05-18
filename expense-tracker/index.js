const balance = document.getElementById('balance'),
moneyPlus = document.getElementById('money-plus'),
moneyMinus = document.getElementById('money-minus'),
list = document.getElementById('list'),
form = document.getElementById('form'),
text = document.getElementById('text'),
amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() == '' || amount.value.trim() == '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

//Generate random ids
function generateID() {
    return Math.floor(Math.random() * 100000000);
}
//Add transaction to DOM list
function addTransactionDOM(transactions) {
    //get sign
    const sign = transactions.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //Add class base on value
    item.classList.add(transactions.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transactions.text}<span>${sign}${Math.abs(transactions.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transactions.id})">x</button>
    `;

    list.appendChild(item);
}

// Updates the balance income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc+=item), 0)
    .toFixed(2);

    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc+=item), 0) * -1)
    .toFixed(2);

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

// Remove transaction by ID

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    
    init();
}

// Update local storage transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
