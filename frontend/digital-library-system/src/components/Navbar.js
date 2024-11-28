import '../styles/Navbar.css';
import logo from '../assets/ebookhub.png';

const Navbar = ({ userToken, userRole, username, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Ebook Hub Logo" />
      </div>
      <ul>
        <li><a href="/">home</a></li>
        <li><a href="/about">about</a></li>
        <li><a href="#contact">contact</a></li>
        {!userToken ? (
          <>
            <li><a href="login/">login</a></li>
          </>
        )
        : (
          <>
            <li>Welcome, {username}</li>
            {userRole === "admin" && <li>Admin Dashboard</li>}
            <li onClick={onLogout}>Log Out</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
