import React from "react";
import { Link } from "react-router-dom";

function LeftSidebar() {
  return (
    <div className="left-side-bar">
      <div className="brand-logo">
        <Link to="/login">
          <img src="vendors/images/deskapp-logo.svg" className="dark-logo" />
          <img src="vendors/images/deskapp-logo-white.svg" className="light-logo" />
        </Link>
        <div className="close-sidebar" data-toggle="left-sidebar-close">
          <i className="ion-close-round" />
        </div>
      </div>
      <div className="menu-block customscroll">
        <div className="sidebar-menu">

          {/*<ul id="accordion-menu">
          <li className="dropdown">
            <a href="javascript:;" className="dropdown-toggle">
              <span className="micon dw dw-house-1" /><span className="mtext">Home</span>
            </a>
            <ul className="submenu">
              <li><Link to="/addservices">Add Services</Link></li>
              <li><Link to="/viewservices">View Services</Link></li>
            </ul>
          </li>
          </ul>*/}
          <li>
            <div class="sidebar-small-cap"><i class="icon-copy fi-thumbnails"></i> App Managment</div>
          </li>
          <Link to="/master" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy dw dw-analytics-3"></i> Statistics</span>
          </Link>

          <li>
            <div class="sidebar-small-cap"><i class="icon-copy fi-thumbnails"></i> Users Managment</div>
          </li>
          <Link to="/ViewUser" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy fa fa-users" aria-hidden="true"></i> List Of Users</span>
          </Link>


          <div class="sidebar-small-cap"><i class="icon-copy fi-thumbnails"></i> Cateagories Managment</div>
          <Link to="/addcategories" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy dw dw-add"></i> Add Category</span>
          </Link>

          <Link to="/viewcategories" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy fi-list"></i> List Of Categories</span>
          </Link>

          <div class="sidebar-small-cap"><i class="icon-copy fi-thumbnails"></i> Services Managment</div>
          <Link to="/addservices" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy dw dw-add"></i> Add Service</span>
          </Link>

          <Link to="/viewservices" class="dropdown-toggle no-arrow">
            <span class="mtext"><i class="icon-copy fi-list"></i> List Of Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
