import React, { Component, Fragment } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    var { email, password } = this.state;
    try {
      let userData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (userData.user.emailVerified) {
        const message = `${email} has been successfully logged in 😀`;
        toast.success(message);
        this.setState({ loading: true });
        this.props.history.push("/");
      } else {
        const errMessage = `${email} is not yet verified Please verify first then login`;
        toast.error(errMessage);
      }
      this.setState(() => ({ username: " ", password: "", loading: false }));
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    let { email, password, loading } = this.state;
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

                <div className="form-group mt-4">
                  <button className="btn btn-dark text-uppercase btn-block">
                    {loading ? "loading..." : "login"}
                  </button>
                </div>
                <div className="form-group">
                  <Link to="/password-reset" className="badge  p-2 btn-block">
                    Forgot Password
                  </Link>
                </div>
                <hr />
                <div className="form-group">
                  <Link to="/register">
                    Don't have an account please
                    <button className="btn btn-outline-dark btn-sm mr-2 ml-2">
                      Register
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

export default LoginComponent;
