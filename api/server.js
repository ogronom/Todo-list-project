// Create express app
const express = require("express");
const app = express();

// using bodyParser to parse JSON bodies into JS objects
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adding Helmet to enhance Rest API's security
const helmet = require('helmet');
app.use(helmet());

// enabling CORS for all requests
const cors = require('cors');
app.use(cors());

const db = require("./database.js");
const {request} = require("express");

// Server port
const HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, function() { console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT)); });


// Get the list of tasks
app.get("/api/tasks", function(req, res) {
  console.log("INFO: received a get request for all tasks");
  const sql = "SELECT * FROM tasks";
  const params = [];
  db.all(sql, params, function(err, rows) {
    if (err) {
      res.status(400).json({"error":err.message});
      console.log("ERROR: retrieving ALL from tasks failed.");
      return;
    }
    console.log("INFO: retrieved ALL from tasks.");

    let sortedRows = rows.sort((a,b) => a.item_order - b.item_order);
    res.send(sortedRows);
  });
});

// Delete task
app.delete("/api/tasks/:id", function(req, res) {
  console.log("INFO: received a delete request for id"+req.params.id);
  db.run(
    'DELETE FROM tasks WHERE id = ?',
    req.params.id,
    function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        console.log("ERROR: deleting item from tasks failed, id="+req.params.id);
        return;
      }
      console.log("INFO: deleting item from tasks, id="+req.params.id);
      res.json({"message":"deleted", changes: this.changes})
    });
});

// Get a single task by id
app.get("/api/tasks/:id", function(req, res) {
  console.log("INFO: received a get request for task id" + req.params.id);
  const sql = "SELECT * FROM tasks WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, function(err, row) {
    if (err) {
      res.status(400).json({"error":err.message});
      console.log("ERROR: retrieving item from tasks failed, id=" + req.params.id);
      return;
    }
    console.log("INFO: retrieved item from tasks, id=" + req.params.id);
    res.send(row);
  });
});

// Create a new task
app.post('/api/new-task', function(req, res) {
  console.log("INFO: received a new task save request");
  const data = {
    title: req.body.title,
    details: req.body.details ? req.body.details : '',
    status: req.body.status ? req.body.status : '',
    priority: req.body.priority ? req.body.priority : '',
    item_order: req.body.item_order
  };
  const sql = 'INSERT INTO tasks (title, details, status, priority, item_order) VALUES (?,?,?,?,?)';
  const params = [data.title, data.details, data.status, data.priority, data.item_order];
  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message});
      console.log("ERROR: inserting item to tasks failed");
      return;
    }
    console.log("INFO: inserted item to tasks");
    data.id = this.lastID;
    res.send(data);
  });
});

// Update tasks order
app.post('/api/tasks-order', function(req, res) {
  console.log("INFO: received a new task order save request.");
  const data = req.body;
  let updated_count = 0;
  for (let i=0; i < data.length; i++) {
    const sql = 'UPDATE tasks SET item_order =  ? WHERE id = ?';
    const params = [data[i].order, data[i].id];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({"error": err.message});
        console.log("ERROR: updating item_order of a task " + data[i].id + " failed");
        return;
      }
      console.log("INFO: updated item_order of a task " + data[i].id);
      updated_count++;
    });
  }
  let checkInterval = setInterval(() => {
    if ( updated_count === data.length ) {
      clearInterval(checkInterval);
      res.send(data);
    }
  }, 500);
});

// Update an existing task
app.patch("/api/tasks/:id", function(req, res) {
  console.log("INFO: received an update request for task id"+req.params.id);
  const data = {
    // title, details, status, priority
    title: req.body.title,
    details: req.body.details ? req.body.details : '',
    status: req.body.status ? req.body.status : '',
    priority: req.body.priority ? req.body.priority : ''
  };

  db.run(
    `UPDATE tasks SET
           title =  ?,
           details = COALESCE(?,details),
           status = COALESCE(?,status),
           priority = COALESCE(?,priority)
           WHERE id = ?`,
    [data.title, data.details, data.status, data.priority, req.params.id],
    function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        console.log("ERROR: updating item in tasks failed, id=" + req.params.id);
        return;
      }
      console.log("INFO: updated item in tasks, id=" + req.params.id);
      res.send(data);
    });
})



// Default response for any other request
app.use(function(req, res){
  res.status(404);
});
