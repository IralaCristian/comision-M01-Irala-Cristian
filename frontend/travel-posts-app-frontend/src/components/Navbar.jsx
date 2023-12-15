import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

function Navbar() {
  const navigate = useNavigate();

  // change between login or logout link depending from the user's session
  const { userIsLogged, logout } = useContext(AuthContext);
  let loginHidden = false;
  let logoutHidden = true;
  if (userIsLogged()) {
    loginHidden = true;
    logoutHidden = false;
  }

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="post/new">
                  Create a Post
                </Link>
              </li>
              <li className="nav-item" hidden={loginHidden}>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item" hidden={logoutHidden}>
                <Link className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
