
import React from "react";
import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

function ServiceNotFound() {
  const [currentuser, setcurrentUser] = useState([]);

  useEffect(() => {
    axios.get('/api/getCurrentUser')
      .then(response => {
        setcurrentUser(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (

    <div className="error-page d-flex align-items-center flex-wrap justify-content-center pd-20">
      <div className="pd-10">
        <div className="error-page-wrap text-center">
          <h1>404</h1>
          <h3>Error:  Page Not Found</h3>
          <p>Sorry, the Page you’re looking for cannot be accessed.<br />Either check the URL</p>
          <div className="pt-20 mx-auto max-width-200">
            {currentuser.role === 'admin' ? (
              <Link to="/viewrooms" className="btn btn-primary btn-block btn-lg">Back To Home</Link>
            ) : currentuser.role === 'client' ? (
              <Link to="/ListBookingLogin" className="btn btn-primary btn-block btn-lg">Back To Home</Link>
            ) : currentuser.role === 'counter-clerk' ? (
              <Link to="/ListOfJobs" className="btn btn-primary btn-block btn-lg">Back To Home</Link>
            ) : (
              // Default link if none of the roles match
              <Link to="/master" className="btn btn-primary btn-block btn-lg">Back To Home</Link>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default ServiceNotFound;
