const _ = require('lodash');
const fetch = require('node-fetch');
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const INITIAL_DATA = {
  expenses: [],
  users: [],
  categories: [],
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Listening at host", host, port);
});

const readFile = (err, data) => {
  if (err) {
    fs.writeFile('data.json', JSON.stringify(INITIAL_DATA), 'utf8', (attrs) => console.log('!', attrs));
    return false;
  } else {
    dataObj = JSON.parse(data);
    console.log('Good!');
    return dataObj;
  }
}

const checkData = async () => {
  fs.readFile('data.json', 'utf8', readFile);
}

const readFile2 = (err, data) => {
  if (err) {
    fs.writeFile('dataplan.json', JSON.stringify(INITIAL_DATA), 'utf8', (attrs) => console.log('!', attrs));
    return false;
  } else {
    dataObj = JSON.parse(data);
    console.log('Good!');
    return dataObj;
  }
}

const checkData2 = async () => {
  fs.readFile('dataplan', 'utf8', readFile2);
}

checkData();
checkData2();

app.post('/api/saveExpense', function(req, res) {
  console.log('Saving expense...');
  const userName = req.body.userName;
  const bucksAmount = req.body.bucksAmount;
  const when = req.body.when;
  const what = req.body.what;
  const note = req.body.note;

  fs.readFile('data.json', 'utf8', (err, data) => {
    let response;
    if (err) {
      response = { error: "We broke!" };
    } else {
      let newJsonData;
      dataObj = JSON.parse(data);
      if (dataObj.expenses) {
        const updatedExpenses = [ ...dataObj.expenses ];
        const id = _.uniqueId();

        updatedExpenses.push({
          userName,
          bucksAmount,
          when,
          what,
          note,
          id
        });
        newJsonData = {
          ...dataObj,
          expenses: updatedExpenses
        };
        fs.writeFile('data.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedExpenses;
      } else {
        response = { error: "We broke!" };
      }
    }

    res.json(response);
  });
});

app.post('/api/saveUser', function(req, res) {
  console.log('Saving user...');
  const userName = req.body.userName;
  const salary = req.body.salary;

  fs.readFile('data.json', 'utf8', (err, data) => {
    let response;
    if (err) {
      response = { error: "We broke!" };
    } else {
      let newJsonData;
      dataObj = JSON.parse(data);
      if (dataObj.users) {
        const updatedUsers = [ ...dataObj.users ];
        const id = _.uniqueId();

        updatedUsers.push({
          userName,
          salary,
          id
        });
        newJsonData = {
          ...dataObj,
          users: updatedUsers
        };
        fs.writeFile('data.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedUsers;
      } else {
        response = { error: "We broke!" };
      }
    }

    res.json(response);
  });
});

app.post('/api/saveCategory', function(req, res) {
  console.log('Saving category...');
  const name = req.body.name;

  fs.readFile('data.json', 'utf8', (err, data) => {
    let response;
    if (err) {
      response = { error: "We broke!" };
    } else {
      let newJsonData;
      dataObj = JSON.parse(data);
      if (dataObj.categories) {
        const updatedCategories = [ ...dataObj.categories ];
        const id = _.uniqueId();

        updatedCategories.push({
          name,
          id
        });
        newJsonData = {
          ...dataObj,
          categories: updatedCategories
        };
        fs.writeFile('data.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedCategories;
      } else {
        response = { error: "We broke!" };
      }
    }

    res.json(response);
  });
});


app.post('/api/saveTripExpense', function(req, res) {
  console.log('Saving expense...');
  const userName = req.body.userName;
  const totalAmount = req.body.totalAmount;
  const paidAmount = req.body.paidAmount;
  const remainingAmount = req.body.remainingAmount;
  const when = req.body.when;
  const what = req.body.what;
  const note = req.body.note;

  fs.readFile('dataplan.json', 'utf8', (err, data) => {
    let response;
    if (err) {
      response = { error: "We broke!" };
    } else {
      let newJsonData;
      dataObj = JSON.parse(data);
      if (dataObj.expenses) {
        const updatedExpenses = [ ...dataObj.expenses ];
        const id = _.uniqueId();

        updatedExpenses.push({
          userName,
          totalAmount,
          paidAmount,
          remainingAmount,
          when,
          what,
          note,
          id
        });
        newJsonData = {
          ...dataObj,
          expenses: updatedExpenses
        };
        fs.writeFile('dataplan.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedExpenses;
      } else {
        response = { error: "We broke!" };
      }
    }

    res.json(response);
  });
});

app.post('/api/saveTripUser', function(req, res) {
  console.log('Saving user...');
  const userName = req.body.userName;
  const budget = req.body.budget;

  fs.readFile('dataplan.json', 'utf8', (err, data) => {
    let response;
    if (err) {
      response = { error: "We broke!" };
    } else {
      let newJsonData;
      dataObj = JSON.parse(data);
      if (dataObj.users) {
        const updatedUsers = [ ...dataObj.users ];
        const id = _.uniqueId();

        updatedUsers.push({
          userName,
          budget,
          id
        });
        newJsonData = {
          ...dataObj,
          users: updatedUsers
        };
        fs.writeFile('dataplan.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedUsers;
      } else {
        response = { error: "We broke!" };
      }
    }

    res.json(response);
  });
});


app.get('/api/getExpenses', async function(req, res) {
  console.log('Getting expenses...');
  let response;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.expenses;
    }
    res.json(response);
  });
});

app.get('/api/getUsers', async function(req, res) {
  console.log('Getting users...');
  let response;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.users;
    }
    res.json(response);
  });
});

app.get('/api/getCategories', async function(req, res) {
  console.log('Getting categories...');
  let response;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.categories;
    }
    res.json(response);
  });
});


app.get('/api/getTripExpenses', async function(req, res) {
  console.log('Getting expenses...');
  let response;

  fs.readFile('dataplan.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.expenses;
    }
    res.json(response);
  });
});

app.get('/api/getTripUsers', async function(req, res) {
  console.log('Getting users...');
  let response;

  fs.readFile('dataplan.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.users;
    }
    res.json(response);
  });
});


app.get('/api/resetExpenses', async function(req, res) {
  console.log('Resetting expenses...');

  fs.writeFile('data.json', JSON.stringify({
    ...INITIAL_DATA,
    expenses: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      expenses: []
    });
  });
});

app.get('/api/resetUsers', async function(req, res) {
  console.log('Resetting users...');

  fs.writeFile('data.json', JSON.stringify({
    ...INITIAL_DATA,
    users: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      users: []
    });
  });
});

app.get('/api/resetCategories', async function(req, res) {
  console.log('Resetting categories...');

  fs.writeFile('data.json', JSON.stringify({
    ...INITIAL_DATA,
    categories: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      categories: []
    });
  });
});


app.get('/api/resetTripExpenses', async function(req, res) {
  console.log('Resetting expenses...');

  fs.writeFile2('dataplan.json', JSON.stringify({
    ...INITIAL_DATA,
    expenses: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      expenses: []
    });
  });
});

app.get('/api/resetTripUsers', async function(req, res) {
  console.log('Resetting users...');

  fs.writeFile2('dataplan.json', JSON.stringify({
    ...INITIAL_DATA,
    users: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      users: []
    });
  });
});
