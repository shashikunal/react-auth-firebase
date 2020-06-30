import React, { Component, Fragment } from "react";
import AddCourseForm from "./AddCourseForm";
class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      id: "",
      coursetitle: "",
      courseimage: "",
      trainer: "",
      timings: "",
      date: new Date().toDateString(),
    };
  }
  render() {
    return (
      <Fragment>
        <AddCourseForm user={this.props.user} />
      </Fragment>
    );
  }
}

export default AddCourse;
