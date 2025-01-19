import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";

function CheckRooms() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [errorlist, setError] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [userList, setUserList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ViewCategory, setCategory] = useState([]);
    const [refresh, forceUpdate] = useState();
    const [ServiceList, setServiceList] = useState([]);
    const { categorieId, serviceId } = useParams();
    const [RoomList, setRoomList] = useState([]);

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get(`/api/roomserv/${serviceId}`).then((res) => {
                console.log("id de la service est ", serviceId);
                //route.params.category_id
                if (res.data.status === 200) {
                    console.log(res.data.rooms);
                    setRoomList(res.data.rooms);
                    setLoading(false);
                }
            });
        });
    }, []);

    const filteredcategory = RoomList.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    var dispaly_Categorydata = "";
    if (loading) {
        return <div className="pre-loader">
            <div className="pre-loader-box">
                {/* <div className="loader-logo"><img src="vendors/images/deskapp-logo.svg" alt /></div> */}
                <div className="loader-progress" id="progress_div">
                    <div className="bar" id="bar1" />
                </div>
                <div className="percent" id="percent1">0%</div>
                <div className="loading-text">
                    Loading...
                </div>
            </div>
        </div>

    }
    else {
        var ServiceStatus = '';
        var badgeClass = ''
        dispaly_Categorydata = filteredcategory.map((item) => {
            if (item.active == '0') {
                ServiceStatus = 'Disabled';
                badgeClass = 'badge badge-danger';
            }
            else if (item.active == '1') {
                ServiceStatus = 'Active';
                badgeClass = 'badge badge-success';
            }
            return (
                <tr key={item.id}>

                    <td className="table-plus"><img src={`http://localhost:8000/${item.image}`} width={100} height={100} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td>{item.start}</td>
                    <td>{item.end}</td>

                    <td><span className={`badge ${badgeClass}`}>{ServiceStatus}</span></td>
                    <td>

                        <Link className="dropdown-item" onClick={() => Swal.fire({
                            title: 'You should create account first before making a booking, Thank you !! ',
                        })} ><i className="dw dw-edit2" /> Book Now !!</Link>

                    </td>
                </tr>
            )
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
                            <li><Link to="/RegisterSec">Create account</Link></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                <div className="container">
                    <div className="card-box mb-30">
                        <br></br>
                        <h2 className="text-blue h3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Queues List</h2>
                        <form>
                            <div className="form-group mb-0">
                                <input type="text" className="form-control search-input" placeholder="Search service by adress" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <div className="dropdown">
                                </div>
                            </div>
                        </form>
                        <br></br>
                        <table className="data-table table nowrap">
                            <thead>
                                <tr>
                                    <th className="table-plus datatable-nosort">Photo</th>
                                    <th>Name  </th>
                                    <th>Location  </th>
                                    <th>Adrees  </th>

                                    <th>Status</th>
                                    <th className="datatable-nosort">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dispaly_Categorydata}
                          

                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default CheckRooms;
