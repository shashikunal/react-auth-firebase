import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      image: null,
      url: "",
      progress: 0,
      barStatus: false,
      buttonStatus: false,
      userRef: firebase.auth().currentUser,
      usersRef: firebase.database().ref("users"),
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      let profilephoto = e.target.files[0];
      this.setState({ image: profilephoto });
    }
  };

  handleUpload(e) {
    e.preventDefault();
    let { image } = this.state;
    let uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //Progress
        let progress = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        this.setState({ progress, barStatus: true, buttonStatus: true });
      },
      (err) => {
        //error
        console.log(err);
      },
      () => {
        //completion
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url, barStatus: false }, () => {
              this.changeAvatar();
            });
          })
          .catch((err) => toast.error(err));
      }
    );
  }

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.url,
      })
      .then((_) => toast.success("successfully updated..."))
      .catch((err) => toast.error(err));
    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.url })
      .then(() => console.log("updated"))
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.user.uid);
    let progressBar = (
      <progress
        value={this.state.progress}
        max={100}
        style={{ width: "100%" }}
      />
    );
    return (
      <Fragment>
        <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
          <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
            upload Profile photo
          </h2>
          <div className="col-md-4 mx-auto card my-4">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="image">Upload Photo</label>
                  <div className="progress1 my-2">
                    {this.state.barStatus === true ? progressBar : ""}
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    name="uploadPhoto"
                    id="image"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group mt-4">
                  <button
                    className="btn btn-dark text-uppercase btn-block"
                    onClick={this.handleUpload}
                  >
                    {this.state.buttonStatus === true && this.state.barStatus
                      ? "uploading..."
                      : "upload"}
                  </button>
                </div>
              </form>
              <img
                style={{ width: "100%" }}
                src={this.state.url || "https://via.placeholder.com/150"}
                alt={this.state.user}
              />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(UpdateProfile);
