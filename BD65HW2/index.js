let express = require('express');
let app = express();
app.use(express.json());

// --------------------- Sample Data ------------------
let employees = [];
let companies = [];

// --------------------- Exercise 1: Add a New Employee ------------------

function validateEmployee(employee) {
  if (!employee.name || typeof employee.name !== 'string') {
    return 'name is required and should be string';
  }

  if (!employee.companyId || typeof employee.companyId !== 'number') {
    return 'companyId is required and should be number';
  }

  return null;
}

app.post('/api/employees', (req, res) => {
  try {
    let error = validateEmployee(req.body);

    if (error) {
      res.status(400).json({ error: error });
    }
    let employee = { id: employees.length + 1, ...req.body };

    employees.push(employee);

    return res.status(201).json(employee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// --------------------- Exercise 2: Add a New Company ------------------
function validateCompany(company) {
  if (!company.name || typeof company.name !== 'string') {
    return 'Company name is required and should be string';
  }
  return null;
}

app.post('/api/companies', (req, res) => {
  let error = validateCompany(req.body);

  if (error) {
    return res.status(400).json({ error: error });
  }

  let company = { id: companies.length + 1, ...req.body };
  companies.push(company);

  return res.status(201).json(company);
});

module.exports = { app, validateEmployee, validateCompany };
