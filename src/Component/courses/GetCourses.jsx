import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import "./courses.styles.css";
import Spinner from "../Spinner/Spinner";
class GetCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: true,
      user: this.props.user,
      image: "",
    };
  }

  async componentDidMount() {
    let courseData = this.state.courses;
    await firebase
      .database()
      .ref("/courses")
      .on("child_added", (snap) => {
        courseData.push({
          id: snap.key,
          coursetitle: snap.val().coursetitle,
          trainer: snap.val().trainer,
          timings: snap.val().timings,
        });
        this.setState({ courses: courseData, loading: false });
      });

    //remove course
    await firebase
      .database()
      .ref("course")
      .on("child_removed", (snap) => {
        for (let i = 0; i < courseData.length; i++) {
          if (courseData[i].id === snap.key) {
            courseData.splice(i, 1);
          }
        }
        this.setState({ courses: courseData, loading: false });
      });
  }

  removeCourse = (id) => {
    firebase.database().ref("courses").child(id).remove();
  };

  render() {
    // eslint-disable-next-line no-lone-blocks
    let Courses = () => {
      return this.state.courses.map((course) => (
        <div className="card" key={Math.round(Math.random() * 1000)}>
          <div className="card-body">
            <h5 className="card-title text-uppercase font-weight-bold">
              Course : {course.coursetitle}
            </h5>
            <hr />
            <p className="card-text text-capitalize border-bottom pb-2">
              Trainer : {course.trainer}
            </p>
            <p className="card-text text-capitalize">
              Timings : {course.timings}
            </p>
            <button className="btn btn-dark btn-block">Join now</button>
            <button
              className="btn btn-danger btn-block"
              onClick={() => this.removeCourse(course.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ));
    };

    return (
      <Fragment>
        <h1 className="course_title">All courses</h1>
        <Fragment>
          <div className="card-parent">
            {this.state.loading ? <Spinner /> : <Courses />}
          </div>
        </Fragment>
      </Fragment>
    );
  }
}

export default GetCourses;
