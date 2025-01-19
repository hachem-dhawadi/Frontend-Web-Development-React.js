import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Navbar() {
  const navigate = useNavigate();


  const [currentuser, setcurrentUser] = useState([]);
  const [job, setJobs] = useState([]);
  const [payementsList, setpayementsList] = useState([]);
  const [clercklist, setclerk] = useState([]);
  const [reser, setreser] = useState([]);
  //const [test, settest] = useState([]);


  useEffect(() => {
    axios.get(`/api/reservations`).then(res => {
      if (res.data.status === 200) {
        setreser(res.data.reservations);
        //setLoading(false);
        //console.log(res.data.reservations);
      }
    });
    axios.get('/api/getCurrentUser')
      .then(response => {
        setcurrentUser(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('/api/alljobsbyuserreciver')
      .then(response => {
        setJobs(response.data.jobs);
        console.log("reciver");
        console.log(response.data.jobs);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('/api/alljobsbyauth')
      .then(response => {
        setclerk(response.data.jobs);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('/api/AllOfPayements')
      .then(response => {
        console.log("all paymement")
        console.log(response.data.payements);
        setpayementsList(response.data.payements);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/logout`).then(res => {
        if (res.data.status === 200) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          swal("Success", res.data.message, "success");
          navigate('/login');
        }
      });
    });

  }
  function getCurrentUserProfileLink() {
    switch (currentuser.role) {
      case 'superadmin':
        return `/ProfilSuperAdmin/${currentuser.id}`;
      case 'admin':
        return `/ProfilAdmin/${currentuser.id}`;
      case 'counter-clerk':
        return `/ProfilCounterClerk/${currentuser.id}`;
      case 'client':
        return `/ProfilClient/${currentuser.id}`;
      default:
        return '/Profil';
    }
  }
  let displaycategorydata;


  if (currentuser.role === 'admin') {
    displaycategorydata = job.map((item) => {
      return (
        <ul>
          <li>
            <Link to={getCurrentUserProfileLink()}>
              <td className="table-plus"><img src={`http://localhost:8000/${item.user.image}`} alt={item.name} /></td>
              <h3>{item.user.name}</h3>
              <p>Sender: {item.user.email}</p>
              <p>Date: {item.created_at}</p>
            </Link>
          </li>
        </ul>
      );
    });
  } else if (currentuser.role === 'superadmin') {
    displaycategorydata = payementsList.map((item) => {
      let mode;
      if (item.payement_mode === 'Code') {
        mode = 'DT';
      } else {
        mode = 'USD';
      }
      return (
        <ul>
          <li>
            <Link to={getCurrentUserProfileLink()}>
              <td className="table-plus"><img src={`http://localhost:8000/${item.user.image}`} alt={item.user.name} /></td>
              <h3>{item.user.name}</h3>
              <p>Payment mode: {item.payement_mode}</p>
              <p>Date: {item.created_at}</p>
            </Link>
          </li>
        </ul>
      );
    });
  }
  else if (currentuser.role === 'counter-clerk') {
    displaycategorydata = clercklist.map((item) => {
      return (
        <ul>
          <li>
            <Link to={getCurrentUserProfileLink()}>
              <td className="table-plus"><img src={`http://localhost:8000/${item.reciver.image}`} alt={item.name} /></td>
              <h3>{item.reciver.name}</h3>
              <p>Owner: {item.reciver.email}</p>
              <p>Service : {item.room.service.name}</p>
              <p>Queue : {item.room.name}</p>
              <p>Statut : <span className={`badge badge badge-success`}> Accepted</span></p>

            </Link>
          </li>
        </ul>
      );
    });
  }
  else if (currentuser.role === 'client') {
    console.log('ooo' + reser)
    if (Object.keys(reser).length === 0) {
      displaycategorydata =
        <ul>
          <li>
            <Link to={getCurrentUserProfileLink()}>
              <h3>Reservaion has been canceled</h3>
              <p>Message :Your reservation has been canceled for unforeseen reasons. We sincerely apologize for any inconvenience caused. If you have any further questions or require assistance, please contact us. Thank you for your understanding</p>
            </Link>
          </li>
        </ul>
    }  
    else {

      displaycategorydata = reser.map((item) => {
        return (
          <ul>
            <li>
              <Link to={getCurrentUserProfileLink()}>
                <td className="table-plus"><img src={`http://localhost:8000/${item.room.image}`} alt={item.name} /></td>
                <h3>{item.room.service.name}</h3>
                <p>Queue : {item.room.name}</p>
                <p>Notification {item.notification}</p>
                <p>Date of booking : {item.date} </p>
              </Link>
            </li>
          </ul>
        );
      });
    }


  }

  // If the role is neither "admin" nor "superadmin", displaycategorydata will be undefined or null.

  // You can then use the displaycategorydata variable wherever you want in your component to render the appropriate content.


  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon dw dw-menu" />
        <div className="search-toggle-icon dw dw-search2" data-toggle="header_search" />

      </div>
      <div className="header-right">

        <div className="user-notification">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" role="button" data-toggle="dropdown">
              <i className="icon-copy dw dw-notification" />
              <span className="badge notification-active" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="notification-list mx-h-350 customscroll">
                <p>Notifications : </p>
                {displaycategorydata}
              </div>
            </div>
          </div>
        </div>
        <div className="user-info-dropdown">
          <div className="dropdown">
            <a className="dropdown-toggle" role="button" data-toggle="dropdown">
              <span className="user-icon">
                <img src={`http://localhost:8000/${currentuser.image}`} />
              </span>
              <span className="user-name">{currentuser.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <Link to={getCurrentUserProfileLink()} className="dropdown-item">
                <i className="dw dw-user1" />
                Profile
              </Link>

              <Link className="dropdown-item" to={getCurrentUserProfileLink()}><i className="dw dw-settings2" /> Setting</Link>
              <button type="button" onClick={logoutSubmit} className="dropdown-item" ><i className="dw dw-logout" /> Log Out</button>

            </div>
          </div>
        </div>
        {/* <div className="github-link">
          <a href="https://github.com/dropways/deskapp" target="_blank"><img src="vendors/images/github.svg" /></a>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
