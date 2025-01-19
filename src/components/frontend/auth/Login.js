import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userlist, setUserlist] = useState([]);//categorylist
  

  useEffect(() => {
    axios.get(`/api/allusers`).then(res => {
        if (res.data.status === 200) {
            //setUserlist(res.data.users);
            console.log(res.data.users);
        }
    });
}, []);

  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          
          swal("Success", res.data.message, "success");

          if (res.data.role === 'admin') {
            navigate('/viewrooms');
          }
          else if (res.data.role === 'counter-clerk') {
            navigate('/ListOfJobs');
          
          } else if (res.data.role === 'client') {
            navigate('/CategoriesLogin');
          }
          else {
            navigate('/master');
          }

        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  }

  



  return (
    <div className="login-page">
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            {/* <a href="login.html">
              <img src="vendors/images/deskapp-logo.svg" alt />
            </a> */}
          </div>
          <div className="login-menu">

            <ul>
              <li><Link to="/welcome">Welcome Page</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src="vendors/images/login-page-img.png" alt />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">Log in To E-Saff</h2>
                </div>
                <form onSubmit={loginSubmit}>
                  <div className="input-group custom">
                    <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control form-control-lg" placeholder="Email" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="icon-copy dw dw-user1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{loginInput.error_list.email}</p>
                  <div className="input-group custom">
                    <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control form-control-lg" placeholder="**********" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="dw dw-padlock1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{loginInput.error_list.password}</p>
                  <div className="row pb-30">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password"><Link to="/ForgetPassword">Forgot Password</Link></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        {/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
										*/}
                        <button type="submit" className="btn btn-primary btn-lg btn-block" href="index.html">Sign In</button>
                      </div>
                      <div className="font-16 weight-600 pt-10 pb-10 text-center" data-color="#707373">OR</div>
                      <div className="input-group mb-0">
                      </div>
                      <div className="input-group mb-0">
                        <Link  to="/registerSec" className="btn btn-outline-primary btn-lg btn-block" >Register To Create Account</Link>
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

export default Login;
