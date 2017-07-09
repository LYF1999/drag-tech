import React, { PropTypes } from 'react';

import Code from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/lib/codemirror.css';

class CodeMirror extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  render() {
    const options = {
      lineNumbers: true,
      theme: 'dracula',
      mode: 'javascript',
      dragDrop: false,
    };
    if (this.props.canDrag) {
      options.configureMouse = function () {
        return {
          moveOnDrag: true,
        }
      }
    }

    return (<Code value={this.props.value} onChange={this.props.onChange} options={options} />);
  }
}

export default CodeMirror;
