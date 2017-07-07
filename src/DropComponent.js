import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props) {
    return true;
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
    result: monitor.getDropResult()
  };
}

@DropTarget('Card', squareTarget, collect)
export default class DropComponent extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  componentWillReceiveProps(nextProps) {
    if (this.props.isOver === false && nextProps.isOver === true) {
      this.props.handleOver({ index: this.props.index });
    }
  }


  render() {
    const { isOver, connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div>
        {children}
      </div>
    );
  }
}
