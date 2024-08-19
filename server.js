const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool({
    user: 'postgres',
    password: '12345678',
    host: 'localhost',
    database: 'work_db'
}); 

pool.connect();
// Create a department
app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name) VALUES ($1)`;
  const params = [body.department_name];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Create a role
app.post('/api/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (role_title, role_salary, department_id) VALUES ($1, $2, $3)`;
  const params = [body.role_title, body.role_salary, body.department_id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Create an employee
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
  const params = [body.employee_first_name, body.employee_last_name, body.role_id, body.manager_id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});