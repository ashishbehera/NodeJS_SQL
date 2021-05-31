const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


//create a connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ashish123',
    database: 'nodemysql'
})

//Connect to MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
})

//Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Database Created');

    });
});

//Create table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send('Table created');
    })

});

//Insert values into employee table
app.get('/employee', (req, res) => {
    let post = { name: 'Martin Lloyds', designation: 'VS Product Owner' }
    let sql = 'INSERT INTO employee SET?'

    db.query(sql, post, (err) => {
        if (err) {
            throw err;
        }
        res.send('Employee added');
    });
});

//select employees
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * from employee';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    });

});

//update employee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Hakim Mendji';
    let sql = `UPDATE employee SET name = '${newName}' where id = ${req.params.id}`;
    let query = db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.json({ message: `Employee updated for new name as '${newName}' for ID ${req.params.id}` });
    });
});

//delete employee
app.get('/deleteemployee/:id', (req, res) => {
    let sql = `DELETE from employee where id = ${req.params.id}`;
    let query = db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.json({ message: `Employee deleted for ID ${req.params.id}`})

    })
})


app.listen(port, () => console.log(`Listening on port ${port}`))


