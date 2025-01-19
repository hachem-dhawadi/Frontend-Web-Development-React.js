import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/superadmin/Footer";
import LeftSidebar from "../../../layouts/superadmin/LeftSidebar";
import Navbar from "../../../layouts/superadmin/Navbar";

function AddCategory() {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [errorlist, setError] = useState([]);


    const [categoryInput, setCategory] = useState({
        name: '',
        adresse: '',
        description: '',
    });

    const [picture, setPicture] = useState([]);
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }
    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
    }
    const handleLocationChange = (event) => {
        setCategory(prevState => ({ ...prevState, location: event.target.value, }));
    };



    useEffect(() => {
        document.title = "Add New Category";
    }, []);

    const submitService = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('name', categoryInput.name);
        formData.append('description', categoryInput.description);
        formData.append('active', allcheckbox.active ? '1' : '0');

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/store-category`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.data.status === 200) {
                    setCheckboxes(res.data.service);
                    navigate('/viewcategories');
                    swal("Succes", res.data.message, "success");
                    setError([]);
                }
                else if (res.data.status === 422) {
                    swal("All Fields are mendentory", "", "error");
                    setError(res.data.errors);
                }

            });
        });
    }


    return (

        <div>
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
            <div className="mobile-menu-overlay" />
            <div className="main-container">
                <div className="pd-ltr-20 xs-pd-20-10">
                    <div className="min-height-200px">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="title">
                                        <h4>Back to Home page</h4>
                                    </div>
                                    <nav aria-label="breadcrumb" role="navigation">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/master">Home</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add category</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="col-md-6 col-sm-12 text-right">
                                    <div className="dropdown">
                                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                                            2023
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">Export List</a>
                                            <a className="dropdown-item" href="#">Policies</a>
                                            <a className="dropdown-item" href="#">View Assets</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* horizontal Basic Forms Start */}
                        <div className="pd-20 card-box mb-30">
                            <div className="clearfix">
                                <div className="pull-left">
                                    <h4 className="text-blue h4">Add new Category</h4>
                                </div>
                            </div>
                            <form onSubmit={submitService}>
                                <br />
            
                                <div className="form-group">
                                    <label>Category name</label>
                                    <input name="name" onChange={handleInput} value={categoryInput.name} className="form-control" type="text" placeholder="Service medical,Sportif....." />
                                </div>
                                <p class="text-danger">{errorlist.name}</p>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control" placeholder="Enter Details..." />
                                </div>
                                <p class="text-danger">{errorlist.description}</p>

                                <div className="form-group">
                                    <label >Category image</label>
                                    <div className="custom-file">
                                        <div className="form-control selectpicker">
                                            <input type="file" name="image" onChange={handleImage} ClassName="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <p class="text-danger">{errorlist.image}</p>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <label className="weight-600">Category status</label>
                                            <div className="custom-control custom-checkbox mb-5">
                                                <input name="active" onChange={handleCheckbox} defaultChecked={allcheckbox.active === 1 ? true : false} type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Activate Category</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <button type="submit" class="btn btn-primary btn-block btn-lg">Submit </button>
                            </form>

                        </div>
                        {/* horizontal Basic Forms End */}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>



    );
}

export default AddCategory;