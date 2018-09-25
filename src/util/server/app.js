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
  expences: [],
  users: []
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

checkData();

app.post('/api/saveExpence', function(req, res) {
  console.log('Saving expence...');
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
      if (dataObj.expences) {
        const updatedExpences = [ ...dataObj.expences ];
        const id = _.uniqueId();

        updatedExpences.push({
          userName,
          bucksAmount,
          when,
          what,
          note,
          id
        });
        newJsonData = {
          ...dataObj,
          expences: updatedExpences
        };
        fs.writeFile('data.json', JSON.stringify(newJsonData), 'utf8', (attrs) => {});
        response = updatedExpences;
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
          userName
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

app.get('/api/getExpences', async function(req, res) {
  console.log('Getting expences...');
  let response;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      response = { error: "We broke!" };
    } else {
      dataObj = JSON.parse(data);
      response = dataObj.expences;
    }
    res.json(response);
  });
});

app.get('/api/resetExpences', async function(req, res) {
  console.log('Resetting expences...');

  fs.writeFile('data.json', JSON.stringify({
    ...INITIAL_DATA,
    expences: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      ...INITIAL_DATA
    });
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


app.get('/api/resetUsers', async function(req, res) {
  console.log('Resetting users...');

  fs.writeFile('data.json', JSON.stringify({
    ...INITIAL_DATA,
    users: []
  }), 'utf8', (attrs) => {
    res.json({
      ok: true,
      ...INITIAL_DATA
    });
  });
});
