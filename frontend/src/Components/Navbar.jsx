import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = (props) => {

  const {user}=useAuthContext();
  const {logout} =useLogout();
  const handleClick=async(e)=>{
    //fire the logout function
    await logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-color-custom bg-body-tertiary ">
        <div className="container-fluid nav-fluid">
          <div className="navbar-logo-name">
            <div className="logo">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <div className="nav-tag">
              <h3 className="navbar-brand nav-text-color nav-text-bold" href="#">WorkoutDay</h3>
            </div>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            
            <ul className="navbar-nav mr-auto">
              {user&&(
                <>
                  <li className="nav-item">
                  <Link className="nav-link active nav-text-color" aria-current="page" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-text-color" to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link nav-text-color" href="#">About</a>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              {user?(
                <>
                  <li className="nav-item">
                      <span className="nav-link active nav-text-color" aria-current="page" >{user.email}</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active nav-text-color" aria-current="page" to="/" onClick={handleClick}>Logout</Link>
                  </li>
                </>
              ):(
                <>
                  <li className="nav-item">
                  <Link className="nav-link active nav-text-color" aria-current="page" to="/">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-text-color" to="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active nav-text-color" aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-text-color" to="/">SignUp</Link>
                </li>
              </ul>
          </div> */}

        </div>
      </nav>
    </div>
  )
};

export default Navbar;
