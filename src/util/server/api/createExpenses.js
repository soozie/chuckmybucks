const fetch = require('node-fetch');

const userName = ['Nico', 'Zlata', 'Susa', 'Mati', 'Ange'];
const bucksAmount = Math.floor(Math.random() * 1000);
const when = ['12/03/2018'];
const what = ['Drink', 'Food', 'Tobacco', 'EatOut', 'Lunch', 'Shopping', 'Fun', 'Holiday', 'Rent'];
const note = 'Good';

const save = async (expense) => {
  fetch(`http://localhost:4000/api/saveExpense`, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      console.log('saved', jsonResponse);
    })
    .catch(error => {
      console.log(error);
    });
}


setInterval(async () => {
  const expense = {};

  expense.userName = userName[(Math.random() * userName.length) | '0'];
  expense.note = 'Good';
  expense.what = what[(Math.random() * what.length) | 0];
  expense.when = when[(Math.random() * when.length) | 0];
  expense.bucksAmount = `${Math.floor(Math.random() * 1000)}`;

  await save(expense);
}, 150);
