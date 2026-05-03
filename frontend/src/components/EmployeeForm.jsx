import React, { useState, useEffect } from 'react';
import Employee from '../models/Employee';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    profilePic: '',
    gender: '',
    department: [],
    salary: 400000,
    day: '1',
    month: 'Jan',
    year: '2020',
    note: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      let employeeList = JSON.parse(localStorage.getItem('EmployeeList')) || [];
      let employee = employeeList.find(emp => emp.id.toString() === id);
      if (employee) {
        let sDate = new Date(employee._startDate);
        setEmployeeData({
          name: employee._name || '',
          profilePic: employee._profilePic || '',
          gender: employee._gender || '',
          department: employee._department || [],
          salary: employee._salary || 400000,
          note: employee._note || '',
          day: sDate.getDate().toString(),
          month: sDate.toLocaleString('default', { month: 'short' }),
          year: sDate.getFullYear().toString()
        });
      }
    }
  }, [id]);

  const changeValue = (event) => {
    setEmployeeData({ ...employeeData, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (event) => {
    let deps = [...employeeData.department];
    if (event.target.checked) {
      deps.push(event.target.value);
    } else {
      deps = deps.filter(dep => dep !== event.target.value);
    }
    setEmployeeData({ ...employeeData, department: deps });
  };

  const save = (event) => {
    event.preventDefault();
    try {
      let employee = new Employee();
      employee.id = id ? parseInt(id) : new Date().getTime();
      employee.name = employeeData.name;
      employee.profilePic = employeeData.profilePic;
      employee.gender = employeeData.gender;
      employee.department = employeeData.department;
      employee.salary = employeeData.salary;
      employee.note = employeeData.note;

      const dateStr = `${employeeData.month} ${employeeData.day}, ${employeeData.year}`;
      employee.startDate = new Date(dateStr);

      let employeeList = JSON.parse(localStorage.getItem('EmployeeList')) || [];
      if (id) {
        let index = employeeList.findIndex(emp => emp.id.toString() === id);
        if (index !== -1) {
          employeeList[index] = employee;
        }
      } else {
        employeeList.push(employee);
      }

      localStorage.setItem('EmployeeList', JSON.stringify(employeeList));
      alert(id ? 'Employee Updated Successfully' : 'Employee Added Successfully');
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  const reset = () => {
    setEmployeeData({
      name: '',
      profilePic: '',
      gender: '',
      department: [],
      salary: 400000,
      day: '1',
      month: 'Jan',
      year: '2020',
      note: ''
    });
    setError('');
  };

  return (
    <div className="form-content">
      <form className="form" onSubmit={save} onReset={reset}>
        <div className="form-head">Employee Payroll form</div>
        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

        <div className="row-content">
          <label className="label text" htmlFor="name">Name</label>
          <input className="input" type="text" id="name" name="name" value={employeeData.name} onChange={changeValue} required />
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="profilePic">Profile image</label>
          <div className="profile-radio-content">
            <label>
              <input type="radio" id="profile1" name="profilePic" value="../assets/profile-images/Ellipse -1.png" checked={employeeData.profilePic === '../assets/profile-images/Ellipse -1.png'} onChange={changeValue} required />
              <img className="profile" id="image1" src="" alt="1" />
            </label>
            <label>
              <input type="radio" id="profile2" name="profilePic" value="../assets/profile-images/Ellipse -2.png" checked={employeeData.profilePic === '../assets/profile-images/Ellipse -2.png'} onChange={changeValue} required />
              <img className="profile" id="image2" src="" alt="2" />
            </label>
          </div>
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="gender">Gender</label>
          <div>
            <input type="radio" id="male" name="gender" value="Male" checked={employeeData.gender === 'Male'} onChange={changeValue} required />
            <label className="text" htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" checked={employeeData.gender === 'Female'} onChange={changeValue} required />
            <label className="text" htmlFor="female">Female</label>
          </div>
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="department">Department</label>
          <div>
            {['HR', 'Sales', 'Finance', 'Engineer', 'Others'].map(dep => (
              <label key={dep}>
                <input type="checkbox" name="department" value={dep} checked={employeeData.department.includes(dep)} onChange={handleCheckbox} />
                {dep}
              </label>
            ))}
          </div>
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="salary">Salary</label>
          <input className="input" type="range" name="salary" id="salary" min="300000" max="500000" step="100" value={employeeData.salary} onChange={changeValue} />
          <output className="salary-output text" htmlFor="salary">{employeeData.salary}</output>
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="startDate">Start Date</label>
          <div>
            <select id="day" name="day" value={employeeData.day} onChange={changeValue}>
              {[...Array(31).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
            <select id="month" name="month" value={employeeData.month} onChange={changeValue}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select id="year" name="year" value={employeeData.year} onChange={changeValue}>
              {['2020', '2021', '2022', '2023', '2024', '2025', '2026'].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <div className="row-content">
          <label className="label text" htmlFor="note">Notes</label>
          <textarea id="note" className="input" name="note" value={employeeData.note} onChange={changeValue}></textarea>
        </div>

        <div className="buttonParent">
          <button type="button" className="resetButton button cancelButton" onClick={() => navigate('/')}>Cancel</button>
          <div className="submit-reset">
            <button type="submit" className="button submitButton" id="submitButton">{id ? 'Update' : 'Submit'}</button>
            <button type="reset" className="resetButton button">Reset</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
