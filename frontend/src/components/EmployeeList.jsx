import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/employeeService';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);

  const loadEmployees = () => {
    EmployeeService.getAllEmployees().then(response => {
      setEmployeeList(response);
    }).catch(e => console.error(e));
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const remove = (employee) => {
    EmployeeService.deleteEmployee(employee.id).then(() => {
      loadEmployees();
    }).catch(e => console.error(e));
  }

  const edit = (employee) => {
    navigate(`/edit/${employee.id}`);
  }

  return (
    <div className="main-content">
      <div className="header-content">
        <div className="emp-detail-text">
          Employee Details <div className="emp-count">{employeeList.length}</div>
        </div>
        <button onClick={() => navigate('/add')} className="add-button">Add User</button>
      </div>

      <div className="table-main">
        <table id="table-display" className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((emp) => (
              <tr key={emp.id}>
                <td><img className="profile-list" src={emp.profilePic} alt="" /></td>
                <td>{emp.name}</td>
                <td>{emp.gender}</td>
                <td>
                  {emp.department && emp.department.map(dept => (
                    <div className="dept-label" key={dept}>{dept}</div>
                  ))}
                </td>
                <td>₹ {emp.salary}</td>
                <td>{emp.startDate ? new Date(emp.startDate).toDateString() : ''}</td>
                <td>
                  <button onClick={() => remove(emp)}>Delete</button>
                  <button onClick={() => edit(emp)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
