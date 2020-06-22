import React, { Component, Fragment } from "react";
import UserPanel from "../Auth/UserPanel";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <UserPanel user={this.props.user} />
        <h1>hello</h1>
      </Fragment>
    );
  }
}

export default SidebarComponent;
