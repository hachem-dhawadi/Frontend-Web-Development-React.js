import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function WelcomePage() {


    return (
        <>
            <div className="login-header box-shadow">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="brand-logo">
                        {/* <a href="login.html">
                            <img src="vendors/images/deskapp-logo.svg"/>
                        </a> */}
                    </div>
                </div>
            </div>
            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-lg-7">
                        <img src="vendors/images/register-page-img.png" alt />
                        </div>
                        <div className="col-md-6 col-lg-5">
                            <div className="login-box bg-white box-shadow border-radius-10">
                                <div className="login-title">
                                    <h2 className="text-center text-primary">Start with E-Saff</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="input-group mb-0">
                                                <Link to="/CheckCategories"
                                                    className="btn btn-outline-primary btn-lg btn-block"
                                                >
                                                     Check Services
                                                </Link>
                                            </div>
                                            <div
                                                className="font-16 weight-600 pt-10 pb-10 text-center"
                                                data-color="#707373"
                                            >
                                                OR
                                            </div>
                                            <div className="input-group mb-0">
                                                <Link to="/login"
                                                    className="btn btn-outline-primary btn-lg btn-block"
                                                >
                                                    Start Queue Management 
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default WelcomePage;
