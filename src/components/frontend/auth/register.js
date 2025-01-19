
import axios from "axios";
import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import MasterLayout from "../../../layouts/superadmin/MasterLayout";
import swal from "sweetalert";
import Login from "./Login";



function Register() {

  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: '',
    cin: '',
    email: '',
    phone: '',
    password: '',
    error_list: [],
  });

  const [picture, setPicture] = useState([]);
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  }


  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      cin: registerInput.cin,
      email: registerInput.email,
      phone: registerInput.phone,
      password: registerInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate('/login');
        }
        else {
          console.log("eroor");
          setRegister({ ...registerInput, error_list: res.data.validation_errors });
          //navigate('/master');
        }
      });
    });

  }

  return (
    <div className="login-page">
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <a href="login.html">
              <img src="vendors/images/deskapp-logo.svg" />
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
            <div className="col-md-6 col-lg-7">
              <img src="vendors/images/login-page-img.png" />
            </div>

            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">Register To Esaff</h2>
                </div>
                <form onSubmit={registerSubmit}>
                  <div className="select-role">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn active">
                        <input type="radio" name="admin" id="admin" />
                        <div className="icon"><img src="vendors/images/briefcase.svg" className="svg" alt /></div>
                        <span>I'm</span>
                        Admin
                      </label>
                      <label className="btn">
                        <input type="radio" name="counterclerk" id="user" />
                        <div className="icon"><img src="vendors/images/person.svg" className="svg" alt /></div>
                        <span></span>
                        counter clerk
                      </label>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control form-control-lg" placeholder="Username" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="icon-copy dw dw-user1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{registerInput.error_list.name}</p>
                  <div className="input-group custom">
                    <input type="text" name="cin" onChange={handleInput} value={registerInput.cin} className="form-control form-control-lg" placeholder="CIN" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"></span>
                    </div>
                  </div>
                  <p class="text-danger">{registerInput.error_list.cin}</p>
                  <div className="input-group custom">
                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control form-control-lg" placeholder="Email" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"></span>
                    </div>
                  </div>
                  <p class="text-danger">{registerInput.error_list.email}</p>
                  <div className="input-group custom">
                    <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control form-control-lg" placeholder="Phone number" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"></span>
                    </div>
                  </div>
                  <p class="text-danger">{registerInput.error_list.phone}</p>
                  <div className="input-group custom">
                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control form-control-lg" placeholder="Password" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="dw dw-padlock1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{registerInput.error_list.password}</p>
                  <div classname="dropdown">
                    <select className="form-control selectpicker" title="Select Service">
                      <option value={1}>Medical</option>
                      <option value={2}>Tunisian Post</option>
                      <option value={3}>hairdressing</option>
                    </select>
                  </div>
                  <br />
                  <div className="form-control selectpicker">
                    <input type="file" name="image" onChange={handleImage} ClassName="form-control" />
                  </div>

                  <br />

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        <button type="submit" className="btn btn-primary btn-lg btn-block" href="index.html">Create Account</button>
                      </div>


                      <div>
                        <button type="button" id="success-modal-btn" hidden data-toggle="modal" data-target="#success-modal" data-backdrop="static">Launch modal</button>
                        <div className="modal fade" id="success-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered max-width-400" role="document">
                            <div className="modal-content">
                              <div className="modal-body text-center font-18">
                                <h3 className="mb-20">Form Submitted!</h3>
                                <div className="mb-30 text-center"><img src="vendors/images/success.png" /></div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                              </div>
                              <div className="modal-footer justify-content-center">
                                <a href="login.html" className="btn btn-primary">Done</a>
                              </div>
                            </div>
                          </div>
                        </div>
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

export default Register;
