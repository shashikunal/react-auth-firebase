import React, { PureComponent, Fragment } from "react";
import "./HeaderComponent.styles.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
class HeaderComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        toast.success("successfully logged out");
        this.props.history.push("/login");
      });
  }

  render() {
    let { displayName, photoURL, email } = this.props.user;

    let AnonymousUser = () => {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </Fragment>
      );
    };
    let AuthUser = () => {
      return (
        <Fragment>
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {displayName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                {email}
              </a>
            </div>
          </div>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/update-photo"
              title="update profile image"
            >
              <img
                src={photoURL}
                alt={displayName}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                }}
              />
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={this.logout}>
              SignOut
            </a>
          </li>
        </Fragment>
      );
    };
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="logo" className="img_logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              {this.props.user.emailVerified ? <AuthUser /> : <AnonymousUser />}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
