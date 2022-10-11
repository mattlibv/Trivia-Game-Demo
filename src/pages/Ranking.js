import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
      </>
    );
  }
}

export default connect()(Ranking);
