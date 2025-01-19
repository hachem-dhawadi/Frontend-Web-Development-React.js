import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RegisterSec() {

  const navigate = useNavigate();
  const [errorlist, setError] = useState([]);
  const [errorlist2, setError2] = useState([]);
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    cin: '',
    phone: '',
    role: '',
  });

  const [picture, setPicture] = useState([]);
  const [pdf, setPdf] = useState(null);


  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  }

  /*const handleImage = (e) => {
    setPicture(e.target.files[0]);
  }*/
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  }

  const handlePdf = (e) => {
    setPdf(e.target.files[0]);
  }

  const handleRoleChange = (event) => {
    setRegister(prevState => ({ ...prevState, role: event.target.value, }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', registerInput.name);
    formData.append('email', registerInput.email);
    formData.append('password', registerInput.password);
    formData.append('cin', registerInput.cin);
    formData.append('phone', registerInput.phone);
    formData.append('role', registerInput.role);
    formData.append('image', picture.image);
    formData.append('service', pdf);


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      }).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate('/login');
          //setError([]);
          //setError2(res.data.validation_errors2);
        } else {
          setError(res.data.validation_errors); 
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
              <img src="vendors/images/deskapp-logo.svg" />
            </a> */}
          </div>
          <div className="login-menu">
            <ul>
              <li><Link to="/login">Log in</Link></li>
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
                  <h2 className="text-center text-primary">Register To E-Saff</h2>
                </div>
                <form onSubmit={registerSubmit}>

                  <div className="input-group custom">
                    <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control form-control-lg" placeholder="Username" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="icon-copy dw dw-user1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{errorlist.name}</p>
                  <div className="input-group custom">
                    <input type="text" name="cin" onChange={handleInput} value={registerInput.cin} className="form-control form-control-lg" placeholder="CIN" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i class="icon-copy fa fa-address-card-o" aria-hidden="true"></i></span>
                    </div>
                  </div>
                  <p class="text-danger">{errorlist.cin}</p>
                  <div className="input-group custom">
                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control form-control-lg" placeholder="Email" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i class="icon-copy dw dw-email"></i></span>
                    </div>
                  </div>
                  <p class="text-danger">{errorlist.email}</p>
                  <div className="input-group custom">
                    <input type="text" name="phone" onChange={handleInput} value={registerInput.phone} className="form-control form-control-lg" placeholder="Phone number" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i class="icon-copy dw dw-phone-call"></i></span>
                    </div>
                  </div>
                  <p class="text-danger">{errorlist.phone}</p>
                  <div className="input-group custom">
                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control form-control-lg" placeholder="Password" />
                    <div className="input-group-append custom">
                      <span className="input-group-text"><i className="dw dw-padlock1" /></span>
                    </div>
                  </div>
                  <p class="text-danger">{errorlist.password}</p>

                  <div className="input-group custom">
                    <select name="role" className="custom-select col-12" title="Select role" onChange={handleRoleChange}>
                      <option selected="">Register as.......</option>
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                      <option value="counter-clerk">Counter-Clerk</option>
                    </select>
                  </div>
                  <p class="text-danger">{errorlist.role}</p>

                  <p class="text">Select Image</p>
                  <div className="form-control selectpicker">
                    <input type="file" name="image" onChange={handleImage} ClassName="form-control" placeholder="hhh" />
                  </div>
                  <p class="text-danger">{errorlist.image}</p>




                  {registerInput.role === 'admin' && (
                    <div>
                      <p class="text">Select receipt</p>
                      <div className="form-control selectpicker">
                        <input
                          type="file"
                          name="service"
                          onChange={handlePdf}
                          //className="form-control"
                        />
                      </div>
                      <p className="text-danger">{errorlist.service}</p>
                      <br />
                    </div>
                  )}




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

export default RegisterSec;