import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import Geolocation from 'geolocation';

function ForgetPassword() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = () => {
    const formattedLocation = encodeURIComponent(location);
    const url = `https://www.google.com/maps?q=${formattedLocation}`;
    window.open(url, '_blank');
  };



  //   const handleButtonClick = () => {
  //     Geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  //       window.open(url);
  //       console.log(position.coords);
  //       console.log(longitude);
  //     });
  //   };

  // const handleButtonClick = () => {
  //     const location = "New York"; // Replace with the desired location

  //     const formattedLocation = encodeURIComponent(location);
  //     const url = `https://www.google.com/maps?q=${formattedLocation}`;
  //     window.open(url, '_blank');
  //   };



  return (
    <div>
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <a href="login.html">
              <img src="vendors/images/deskapp-logo.svg" alt />
            </a>
          </div>
          <div className="login-menu">
            <ul>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="vendors/images/forgot-password.png" alt />
            </div>
            <div className="col-md-6">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">Forgot Password</h2>
                </div>
                <h6 className="mb-20">Enter your email address to reset your password</h6>
                <form>
                  <div className="input-group custom">
                    <input type="text" className="form-control form-control-lg" placeholder="Email" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="fa fa-envelope-o" aria-hidden="true" /></span>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-5">
                      <div className="input-group mb-0">
                        {/*
                                  use code for form submit
                                  <input class="btn btn-primary btn-lg btn-block" type="submit" value="Submit">
                              */}
                        <input type="text" value={location} onChange={handleInputChange} />
                        <button onClick={handleButtonClick}>Open Google Maps</button>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="font-16 weight-600 text-center" data-color="#707373">OR</div>
                    </div>
                    <div className="col-5">
                      <div className="input-group mb-0">
                        <a className="btn btn-outline-primary btn-lg btn-block" href="login.html">Login</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ForgetPassword;
