import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      let message = ` Please check your email and change password`;
      toast.success(message);
      this.props.history.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };
  render() {
    return (
      <Fragment>
        <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
          <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
            Login
          </h2>
          <div className="col-md-4 mx-auto card my-4">
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group mt-4">
                  <button className="btn btn-dark text-uppercase btn-block">
                    {this.state.loading === true ? "loading" : "Password reset"}
                  </button>
                </div>
                <div className="form-group">
                  <Link
                    to="/login"
                    className="btn  p-2 float-right btn-outline-secondary"
                  >
                    Login
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

export default PasswordReset;
