import React, { Component, Fragment } from "react";
import "./sidebar.styles.css";
import $ from "jquery";
import "bootstrap";
import SidebarMenu from "./SidebarMenu";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    $(document).ready(function () {
      // Hide submenus
      $("#body-row .collapse").collapse("hide");

      // Collapse/Expand icon
      $("#collapse-icon").addClass("fa-angle-double-left");

      // Collapse click
      $("[data-toggle=sidebar-colapse]").click(function () {
        SidebarCollapse();
      });

      function SidebarCollapse() {
        $(".menu-collapsed").toggleClass("d-none");
        $(".sidebar-submenu").toggleClass("d-none");
        $(".submenu-icon").toggleClass("d-none");
        $("#sidebar-container").toggleClass(
          "sidebar-expanded sidebar-collapsed"
        );

        // Collapse/Expand icon
        $("#collapse-icon").toggleClass(
          "fa-angle-double-left fa-angle-double-right"
        );
      }
    });
  }
  render() {
    return (
      <Fragment>
        <SidebarMenu user={this.props.user} />
      </Fragment>
    );
  }
}

export default SidebarComponent;
