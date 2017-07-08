import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { Icon } from 'antd';

const squareTarget = {
  canDrop(props) {
    return props.canDrop;
  },
  drop(props) {

  },

  hover() {
  }
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    didDrop: monitor.didDrop(),
    item: monitor.getItem(),
    result: monitor.getDropResult(),
  };
}

@DropTarget(['Card', 'component'], squareTarget, collect)
export default class DropComponent extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    hover: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isOver === false && nextProps.isOver === true) {
      this.props.handleOver({ index: this.props.index });
    }
  }

  onMouseEnter = () => {
    this.setState({
      hover: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      hover: false,
    });
  };


  onDelete = () => {
    this.props.onDelete(this.props.component);
  };



  render() {
    const { isOver, connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ position: 'relative', paddingLeft: 100 }}>
        {this.state.hover && this.props.showIcon && (
          <Icon
            onClick={this.onDelete}
            type="close"
            className="can-click"
            style={{ position: 'absolute', left: 50, top: 5, zIndex: 10, fontSize: 20 }}
          />
        )}
        {children}
      </div>
    );
  }
}
