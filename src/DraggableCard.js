// @ts-check
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';


const cardSource = {
  beginDrag(props, monitor) {
    return {
      text: props.text
    };
  }
};

@DragSource('Card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends React.Component {
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div style={{ opacity: (isDragging ? 0.5 : 1), ...this.props.style }}>
        {text}
      </div>
    );
  }
}