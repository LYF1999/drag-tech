import React, { PropTypes } from 'react';
import { Input } from 'antd';

class Text extends React.Component {

  static propTypes = {};
  static defaultProps = {};


  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  pen = undefined;

  componentDidMount() {
    const editor = new Pen('#editor');
    this.pen = editor;
  }


  render() {
    return (
      <div style={{ marginBottom: 10 }} id="editor" />
    );
  }
}

export default Text;
