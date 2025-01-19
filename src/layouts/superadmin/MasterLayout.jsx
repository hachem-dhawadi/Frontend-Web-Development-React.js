import LeftSidebar from "./LeftSidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import React, { useState, useEffect } from 'react';


function MasterLayout() {
  const [user, setUser] = useState();
  const [categorie, setCategorie] = useState();
  const [catActive, setcatActive] = useState();
  const [catDesactive,setcatDesactive ] = useState();

  const [service, setservice] = useState();
  const [serActive, setserActive] = useState();
  const [serDesactive,setserDesactive ] = useState();

  const [queue, setqueue] = useState();
  const [qeActive, setqeActive] = useState();
  const [qeDesactive,setqeDesactive ] = useState();

  const [reservation, setreservation] = useState();
  
  const [allusers, setallusers] = useState();
  const [usActive, setusActive] = useState();
  const [usDesactive,setusDesactive ] = useState();

  const [payement, setpayement] = useState();

  const [job, setjob] = useState();


  useEffect(() => {
    axios.get('/api/getCurrentUser')
      .then(response => {
        setUser(response.data.user);
        console.log(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
      axios.get('/api/StaticCategorie')
      .then(response => {
        setCategorie(response.data.totalCategories);
        setcatActive(response.data.activeCategories);
        setcatDesactive(response.data.inactiveCategories);
          //console.log(response.data.user);
      })
      axios.get('/api/StaticServices')
      .then(response => {
        setservice(response.data.totalServices);
        setserActive(response.data.activeServices);
        setserDesactive(response.data.inactiveServices);
          //console.log(response.data.user);
      })
      axios.get('/api/StaticRoom')
      .then(response => {
        setqueue(response.data.totalRooms);
        setqeActive(response.data.activeRooms);
        setqeDesactive(response.data.inactiveRooms);
          //console.log(response.data.user);
      })
      axios.get('/api/StaticReservations')
      .then(response => {
        setreservation(response.data.totalReservations);

          //console.log(response.data.user);
      })
      axios.get('/api/StaticUsers')
      .then(response => {
        setallusers(response.data.totalUsers);
        setusActive(response.data.activeUsers);
        setusDesactive(response.data.inactiveUsers);
          //console.log(response.data.user);
      })
      axios.get('/api/StaticPayement')
      .then(response => {
        setpayement(response.data.totalPayments);
          //console.log(response.data.user);
      })
      axios.get('/api/StaticJobs')
      .then(response => {
        setjob(response.data.totalJobs);
          //console.log(response.data.user);
      })
   
  }, []);

  return (
    <body>

      <Navbar />
      <div className="right-sidebar">
        <div className="sidebar-title">
          <h3 className="weight-600 font-16 text-blue">
            Layout Settings
            <span className="btn-block font-weight-400 font-12">User Interface Settings</span>
          </h3>
          <div className="close-sidebar" data-toggle="right-sidebar-close">
            <i className="icon-copy ion-close-round" />
          </div>
        </div>
        <div className="right-sidebar-body customscroll">
          <div className="right-sidebar-body-content">
            <h4 className="weight-600 font-18 pb-10">Header Background</h4>
            <div className="sidebar-btn-group pb-30 mb-10">
              <a href="javascript:void(0);" className="btn btn-outline-primary header-white active">White</a>
              <a href="javascript:void(0);" className="btn btn-outline-primary header-dark">Dark</a>
            </div>
            <h4 className="weight-600 font-18 pb-10">Sidebar Background</h4>
            <div className="sidebar-btn-group pb-30 mb-10">
              <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-light ">White</a>
              <a href="javascript:void(0);" className="btn btn-outline-primary sidebar-dark active">Dark</a>
            </div>
            <h4 className="weight-600 font-18 pb-10">Menu Dropdown Icon</h4>
            <div className="sidebar-radio-group pb-10 mb-10">
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebaricon-1" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-1" defaultChecked />
                <label className="custom-control-label" htmlFor="sidebaricon-1"><i className="fa fa-angle-down" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebaricon-2" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-2" />
                <label className="custom-control-label" htmlFor="sidebaricon-2"><i className="ion-plus-round" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebaricon-3" name="menu-dropdown-icon" className="custom-control-input" defaultValue="icon-style-3" />
                <label className="custom-control-label" htmlFor="sidebaricon-3"><i className="fa fa-angle-double-right" /></label>
              </div>
            </div>
            <h4 className="weight-600 font-18 pb-10">Menu List Icon</h4>
            <div className="sidebar-radio-group pb-30 mb-10">
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-1" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-1" defaultChecked />
                <label className="custom-control-label" htmlFor="sidebariconlist-1"><i className="ion-minus-round" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-2" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-2" />
                <label className="custom-control-label" htmlFor="sidebariconlist-2"><i className="fa fa-circle-o" aria-hidden="true" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-3" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-3" />
                <label className="custom-control-label" htmlFor="sidebariconlist-3"><i className="dw dw-check" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-4" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-4" defaultChecked />
                <label className="custom-control-label" htmlFor="sidebariconlist-4"><i className="icon-copy dw dw-next-2" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-5" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-5" />
                <label className="custom-control-label" htmlFor="sidebariconlist-5"><i className="dw dw-fast-forward-1" /></label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="sidebariconlist-6" name="menu-list-icon" className="custom-control-input" defaultValue="icon-list-style-6" />
                <label className="custom-control-label" htmlFor="sidebariconlist-6"><i className="dw dw-next" /></label>
              </div>
            </div>
            <div className="reset-options pt-30 text-center">
              <button className="btn btn-danger" id="reset-settings">Reset Settings</button>
            </div>
          </div>
        </div>
      </div>
      <LeftSidebar />
     <div className="main-container">
  <div className="pd-ltr-20">

 
    <div className="card-box mb-30">
      <h2 className="h4 pd-20">Statistics</h2>
      <table className="data-table table nowrap">
        <thead>
          <tr>
            <th className="table-plus datatable-nosort">Type</th>
            <th>Image</th>
            <th>Total</th>
            <th>Active</th>
            <th>Disabled</th>
            <th>First creation</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h5 className="font-16">Categories</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/categories.png" width={70} height={70} alt />
            </td>
            <td>{categorie}</td>
            <td> <span className={`badge badge badge-success`}>{catActive}</span></td>
            <td> <span className={`badge badge-danger`}>{catDesactive}</span></td>

            <td>2023-05-30 20:28:14</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Services</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/customer-service.png" width={70} height={70} alt />
            </td>
            <td>{service}</td>
            <td> <span className={`badge badge badge-success`}>{serActive}</span></td>
            <td> <span className={`badge badge-danger`}>{serDesactive}</span></td>

            <td>2023-05-30 20:30:12</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Queues</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/Queue.png" width={70} height={70} alt />
            </td>
            <td>{queue}</td>
            <td> <span className={`badge badge badge-success`}>{qeActive}</span></td>
            <td> <span className={`badge badge-danger`}>{qeDesactive}</span></td>

            <td>2023-05-30 20:32:29</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Reservations</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/book.png" width={70} height={70} alt />
            </td>
            <td>{reservation}</td>
            <td> <span className={`badge badge badge-success`}><i class="icon-copy dw dw-question-1"></i></span></td>
            <td> <span className={`badge badge-danger`}><i class="icon-copy dw dw-question-1"></i></span></td>

            <td>2023-05-30 20:33:01</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Users</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/man.png" width={70} height={70} alt />
            </td>
            <td>{allusers}</td>
            <td> <span className={`badge badge badge-success`}>{usActive}</span></td>
            <td> <span className={`badge badge-danger`}>{usDesactive}</span></td>

            <td>2023-05-30 20:37:25</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Payments</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/receipt.png" width={70} height={70} alt />
            </td>
            <td>{payement}</td>
            <td> <span className={`badge badge badge-success`}>{payement} Done</span></td>
            <td> <span className={`badge badge-danger`}>0 failed</span></td>

            <td>2023-05-30 20:40:14</td>
          </tr>

          <tr>
            <td>
              <h5 className="font-16">Jobs</h5>
            </td>
            <td className="table-plus">
              <img src="vendors/images/suitcase.png" width={70} height={70} alt />
            </td>
            <td>{job}</td>
            <td> <span className={`badge badge badge-success`}><i class="icon-copy dw dw-question-1"></i></span></td>
            <td> <span className={`badge badge-danger`}><i class="icon-copy dw dw-question-1"></i></span></td>

            <td>2023-05-30 20:45:19</td>
          </tr>
       
 
        </tbody>
      </table>
    </div>
  </div>
</div>


      <Footer />
    </body>



  );
}

export default MasterLayout;
