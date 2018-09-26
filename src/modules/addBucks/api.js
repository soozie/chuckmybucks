
export function getExpenses() {
  return fetch('http://localhost:4000/api/getExpenses')
  .then(response => { return response.json(); })
  .then(jsonResponse => {
    return jsonResponse;
  })
  .catch(error => { return error; });
}

export function getUsers() {
  return fetch('http://localhost:4000/api/getUsers')
  .then(response => { return response.json(); })
  .then(jsonResponse => {
    return jsonResponse;
  })
  .catch(error => { return error; });
}

export function getCategories() {
  return fetch('http://localhost:4000/api/getCategories')
  .then(response => { return response.json(); })
  .then(jsonResponse => {
    return jsonResponse;
  })
  .catch(error => { return error; });
}

export function saveExpense(expense) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/api/saveExpense`, {
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

export function saveUser(user) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/api/saveUser`, {
      method: "POST",
      body: JSON.stringify(user),
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

export function saveCategory(category) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:4000/api/saveCategory`, {
      method: "POST",
      body: JSON.stringify(category),
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
