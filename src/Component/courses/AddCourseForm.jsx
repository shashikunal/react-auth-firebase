import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import firebase from "../../firebase";
import { uuid } from "uuidv4";
class AddCourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      user: this.props.user,
      coursetitle: "",
      trainer: "",
      timings: "",
      updateBy: "",
      image: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    let { user, coursetitle, trainer, timings, id } = this.state;
    e.preventDefault();
    console.log(this.state);
    await firebase
      .database()
      .ref("/courses")
      .child(id)
      .set({
        id,
        coursetitle,
        trainer,
        timings,
        updateBy: [user.displayName, user.photoURL],
        createAt: new Date().toString(),
      });
    this.setState({
      coursetitle: "",
      trainer: "",
      timings: "",
      updateBy: "",
      image: "",
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <Fragment>
        <h1 className="display-5 font-weight-bold text-uppercase my-4 border-bottom pb-2">
          Add Course
        </h1>
        <div className="card card-body my-4">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="course title"
                  required
                  value={this.state.coursetitle}
                  onChange={this.handleChange}
                  name="coursetitle"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="trainer name"
                  required
                  value={this.state.trainer}
                  onChange={this.handleChange}
                  name="trainer"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  placeholder="timings"
                  required
                  value={this.state.timings}
                  onChange={this.handleChange}
                  name="timings"
                />
              </div>
              <div className="col-md-12 my-2">
                <button className="btn btn-dark mt-2">add Course</button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(AddCourseForm);
