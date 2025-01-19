import Login from './components/frontend/auth/Login';
import Register from "./components/frontend/auth/register";
import MasterLayout from './layouts/superadmin/MasterLayout';
import AddService from "./components/frontend/services/AddService";
import ViewService from "./components/frontend/services/ViewService";
import EditService from "./components/frontend/services/EditService";
import ServiceNotFound from "./components/frontend/errors/ServiceNotFound";
import WelcomePage from "./components/frontend/WelcomePage";
import AddRoom from "./components/frontend/rooms/AddRoom";
import RegisterSec from "./components/frontend/auth/RegisterSec";
import ViewRoom from "./components/frontend/rooms/ViewRoom";
import ViewUser from "./components/frontend/users/ViewUser";
import EditRoom from "./components/frontend/rooms/EditRoom";
import AddCategory from "./components/frontend/categories/AddCategory";
import ViewCategory from "./components/frontend/categories/ViewCategory";
import EditCategory from "./components/frontend/categories/EditCategory";
import MasterAdminLayout from "./layouts/admin/MasterAdminLayout";
import EditUser from "./components/frontend/users/EditUser";
import Profil from "../src/layouts/Profil";
import FindJob from "./components/frontend/jobs/FindJob";
import ListOfJobs from "./components/frontend/jobs/ListOfJobs";
import ProfilSuperAdmin from "./layouts/superadmin/ProfilSuperAdmin";
import ProfilAdmin from "./layouts/admin/ProfilAdmin";
import ProfilCounterClerk from "./layouts/counter-clerk/ProfilCounterClerk";
import WorkList from "./components/frontend/jobs/WorkList";
import AddReservation from "./components/frontend/jobs/AddReservation";
import AddReservationAdmin from "./layouts/admin/AddReservationAdmin";
import ViewUserReservation from "./components/frontend/adminUsers/ViewUserReservation";
import ForgetPassword from "./components/frontend/auth/ForgetPassword";
import ViewEmployees from "./components/frontend/adminUsers/ViewEmployees";
import CheckCategories from "./components/frontend/authNot/CheckCategories";
import CheckServices from "./components/frontend/authNot/CheckServices";
import CheckRooms from "./components/frontend/authNot/CheckRooms";
import ProfilClient from "./layouts/Client/ProfilClient";
import CategoriesLogin from "./components/frontend/reservation/CategoriesLogin";
import ServicesLogin from "./components/frontend/reservation/ServicesLogin";
import RoomsLogin from "./components/frontend/reservation/RoomsLogin";
import ReservationLogin from "./components/frontend/reservation/ReservationLogin";
import ListBookingLogin from "./components/frontend/reservation/ListBookingLogin";
import React from "react";
import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";






axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
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


    <BrowserRouter>
      <Routes>
     
 
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/*" element={<Navigate to="/ServiceNotFound" />} />

        <Route path="/CheckCategories" element={<CheckCategories />} />
        <Route path="/CheckServices/:id" element={<CheckServices />} />
        <Route path="/CheckRooms/:categorieId/:serviceId" element={<CheckRooms />} />

        <Route path="/CategoriesLogin" element={<CategoriesLogin />} />
        <Route path="/ServicesLogin/:id" element={<ServicesLogin />} />
        <Route path="/RoomsLogin/:categorieId/:serviceId" element={<RoomsLogin />} />
        <Route path="/ReservationLogin/:categorieId/:serviceId/:id" element={<ReservationLogin />} />
        <Route path="/ListBookingLogin" element={<ListBookingLogin />} />



        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerSec" element={<RegisterSec />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/servicenotfound" element={<ServiceNotFound />} />
        <Route path="/edituser/:id" element={<EditUser />} />

        {/*<Route path="/login" element={localStorage.getItem('auth_token') ?  <Navigate to="/master"/> :  <Login/>} />
      <Route path="/register" element={localStorage.getItem('auth_token') ?  <Navigate to="/master"/> :  <Register/>} />
      */}

        <Route path="/addcategories" element={<AddCategory />} />
        <Route path="/viewcategories" element={<ViewCategory />} />
        <Route path="/editcategory/:id" element={<EditCategory />} />



        <Route path="/addservices" element={<AddService />} />
        <Route path="/viewservices" element={<ViewService />} />
        <Route path="/editservice/:id" element={<EditService />} />

        <Route path="/addrooms" element={<AddRoom />} />
        <Route path="/viewrooms" element={<ViewRoom />} />
        <Route path="/editroom/:id" element={<EditRoom />} />

        <Route path="/ViewUserReservation" element={<ViewUserReservation />} />
        <Route path="/ViewUser" element={<ViewUser />} />
        <Route path="/ViewEmployees" element={<ViewEmployees />} />


        <Route path="/FindJob/:id/:roomId" element={<FindJob />} />
        <Route path="/ListOfJobs" element={<ListOfJobs />} />
        <Route path="/WorkList" element={<WorkList />} />
        <Route path="/AddReservation/:categoryId/:serviceId/:roomId" element={<AddReservation />} />
        <Route path="/AddReservationAdmin/:categoryId/:serviceId/:roomId" element={<AddReservationAdmin />} />


        <Route path="/master" element={<MasterLayout />} />
        <Route path="/masteradmin" element={<MasterAdminLayout />} />
        <Route path="/profil" element={<Profil />} />

        <Route path="/ProfilSuperAdmin/:id" element={<ProfilSuperAdmin />} />
        <Route path="/ProfilAdmin/:id" element={<ProfilAdmin />} />
        <Route path="/ProfilCounterClerk/:id" element={<ProfilCounterClerk />} />
        <Route path="/ProfilClient/:id" element={<ProfilClient />} />
      </Routes>
    </BrowserRouter>



  );
}

export default App;
