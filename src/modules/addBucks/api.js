
export function saveExpense(expense) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/api/saveExpence`, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      resolve(jsonResponse);
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

export function getExpences() {
  return fetch('http://localhost:4000/api/getExpences')
  .then(response => { return response.json(); })
  .then(jsonResponse => {
    return jsonResponse;
  })
  .catch(error => { return error; });
}
