import React, { PropTypes } from 'react';
import { Input, Button } from 'antd';

class SougouTranslate extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    value: '',
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  render() {
    return (
      <div>
        <Input value={'hello world'} type={'textarea'} />
        <Button>翻译</Button>
        <pre>
          你好,世界
        </pre>
      </div>
    );
  }
}

export default SougouTranslate;
