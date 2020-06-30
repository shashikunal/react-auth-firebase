import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import md5 from "md5";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      loading: false,

      errors: {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    try {
      let { email, password, username } = this.state;
      e.preventDefault();
      let userData = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      userData.user.sendEmailVerification();
      let message = `A verification has been sent to ${email} please verify email address✉️`;
      toast.success(message);
      this.props.history.push("/login");

      await userData.user.updateProfile({
        displayName: username,
        photoURL: `https://www.gravatar.com/avatar/${md5(
          userData.user.email
        )}?d=identicon`,
      });

      firebase
        .database()
        .ref()
        .child("/users" + userData.user.uid)
        .set({
          photoURL: userData.user.photoURL,
          displayName: userData.user.displayName,
          uid: userData.user.uid,
          RegistrationDate: new Date().toString(),
        });

      this.setState({
        username: "",
        password: "",
        email: "",
        confirmpassword: "",
        loading: false,
      });
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    let { username, email, password, confirmpassword, loading } = this.state;

    return (
      <Fragment>
        <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
          <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
            register
          </h2>
          <div className="col-md-4 mx-auto card my-4">
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmpassword"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group mt-4">
                  <button className="btn btn-dark text-uppercase btn-block">
                    {loading ? "loading" : "register"}
                  </button>
                </div>
                <div className="form-group">
                  <Link to="/login">
                    already have an account Please
                    <button className="btn btn-outline-dark btn-sm mr-2 ml-2">
                      Login
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default RegisterComponent;
