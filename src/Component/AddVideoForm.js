import React, { Component, Fragment } from "react";
import firebase from "../firebase";
class AddVideoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: "",
      url: "",
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePhoto(e) {
    if (e.target.files[0]) {
      let profilephoto = e.target.files[0];
      this.setState({ image: profilephoto });
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { image } = this.state;
    let uploadTask = firebase.storage().ref(`videos/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //Progress
      },
      (err) => {
        //error
        console.log(err);
      },
      () => {
        //completion
        firebase
          .storage()
          .ref("videos")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url }, () => {
              let items = this.state;
              firebase
                .database()
                .ref("/videos")
                .push({
                  ...items,
                });
            });
          })
          .catch((err) => console.log(err));
      }
    );
  }

  render() {
    return (
      <Fragment>
        <h1>hello</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            name="uploadphoto"
            placeholder="upload photo"
            onChange={this.handleChangePhoto}
          />
          <input
            type="text"
            placeholder="video name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button>Add Video</button>
        </form>
      </Fragment>
    );
  }
}

export default AddVideoForm;
