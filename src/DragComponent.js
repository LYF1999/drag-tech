/**
 * Created by Ezero on 2017/7/8.
 */
// @ts-check
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { Icon } from 'antd';


const dragSource = {
  beginDrag(props, monitor) {
    props.onDrag(props);
    return {
      props,
    };
  },
  canDrag(props) {
    return props.canDrag
  }
};

@DragSource('component', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class DragComponent extends React.Component {

  state = {
    ready: false
  };

  onReady = () => {
    this.props.onReady(this.props.component);
  };

  onCancelReady = () => {
    this.props.onCancelReady(this.props.component);
  };

  onMouseEnter = () => {
    this.setState({
      ready: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      ready: false
    })
  };


  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ opacity: (isDragging ? 0.5 : 1), position: 'relative', paddingLeft: 25, ...this.props.style }}
      >
        {this.props.showIcon && this.state.ready && (
          <Icon
            type="plus"
            className="can-click"
            onMouseEnter={this.onReady}
            onMouseLeave={this.onCancelReady}
            style={{ position: 'absolute', left: 0, top: 5, zIndex: 10, fontSize: 20 }}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}
