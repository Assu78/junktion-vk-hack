import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = {
    friends: [],
  }

  componentDidMount() {
    fetch('/api/friends')
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        this.setState({ friends: response.items });
      });
  }

  render() {
    const friends = this.state.friends.map(friend => <div><img src={friend.photo_50}/>{friend.first_name}</div>);
    return (
      <body>
        <div>
          {friends}
        </div>
      </body>
    );
  }
}
