import React from 'react';
import axios from 'axios';
import Features from './Features.jsx';
import AboutBody from './AboutBody.jsx';
import styles from '../../../public/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: window.location.pathname.split('/')[1],
      // gameId: 1,
      featureData: [],
      aboutHeader: '',
      aboutBody: '',
      features: '',
      featureTitle: ''
    };
    this.getAboutThisGameFeaturesData = this.getAboutThisGameFeaturesData.bind(this);
  }
  componentDidMount() {
    this.getAboutThisGameFeaturesData();
    // this.getImage();
    // this.getReviews();
  }

  // getGameData using axios get
  getAboutThisGameFeaturesData() {
    // console.log('getAbouthisGameFeaturesData is ran'); //console log works

    console.log(`component did mount with this id ${this.state.gameId}`);

    // console.log('this.state.gameId', this.state.gameId);
    // axios.get(`/api/features/${this.state.gameId}`)
    axios
      .get(
        `http://ec2-18-218-54-252.us-east-2.compute.amazonaws.com:8081/${this.state.gameId}`
      )
      // .get(`/api/features/${this.state.gameId}`)

      .then(res => {
        // handle data
        this.setState({
          featureData: res.data,
          aboutHeader: res.data[0].aboutHeader,
          aboutBody: res.data[0].aboutBody,
          features: res.data[0].features,
          featureTitle: res.data[0].featureTitle
        });
      })
      .catch(err => {
        console.error('error in get request in client', err);
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <AboutBody
          aboutBody={this.state.aboutBody}
          aboutHeader={this.state.aboutHeader}
        />
        <Features features={this.state.featureData} />
      </div>
    );
  }
}

export default App;
