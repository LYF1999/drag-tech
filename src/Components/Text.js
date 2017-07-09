import React, { PropTypes } from 'react';
import { Icon } from 'antd';

class Text extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  pen = undefined;

  componentDidMount() {
    const editor = new Pen('#editor');
    this.pen = editor;
  }


  render() {
    return (
      <div>
        <Icon type="file-text" />
        <div style={{ marginBottom: 10 }} id="editor" />
      </div>
    );
  }
}

export default Text;
