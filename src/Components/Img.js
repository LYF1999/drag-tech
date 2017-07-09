import React, { PropTypes } from 'react';

class Img extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div>
        <img className="img-response" src={this.props.src} />
      </div>
    );
  }
}

export default Img;
