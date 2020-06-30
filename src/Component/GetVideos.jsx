import React, { Component, Fragment } from "react";
import firebase from "../firebase";
class GetVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      name: "",
    };
  }
  async componentDidMount() {
    let videosData = this.state.videos;
    firebase
      .database()
      .ref("videos")
      .on("value", (snap) => {
        snap.forEach((x) => {
          videosData.push({
            id: x.key,
            name: x.val().name,
            url: x.val().url,
          });
        });
      });
    console.log(videosData);
  }

  render() {
    let Videos = () => {
      return this.state.videos.map((video) => (
        <Fragment>
          <h1>{video.name}</h1>
          <p>
            <video controls>
              <source src={video.url} />
            </video>
          </p>
        </Fragment>
      ));
    };
    return (
      <Fragment>
        <h1>Videos</h1>
        {<Videos />}
      </Fragment>
    );
  }
}

export default GetVideos;
