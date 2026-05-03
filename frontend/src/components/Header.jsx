import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div>
        <h1>Employee Payroll App</h1>
      </div>
      <nav>
        <Link to="/" className="btn btn-primary" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/add" className="btn btn-primary">Add Employee</Link>
      </nav>
    </header>
  );
};

export default Header;
