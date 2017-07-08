// @ts-check
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { Card as AntdCard } from 'antd';


const cardSource = {
  beginDrag(props, monitor) {
    return {
      props,
    };
  }
};

@DragSource('Card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends React.Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div>
        <AntdCard>
          <div style={{ opacity: (isDragging ? 0.5 : 1), ...this.props.style }} className="flex-stretch">
            <img src={this.props.imgSrc} />
            <div>
              <p>{this.props.text}</p>
              <p>{this.props.desc}</p>
            </div>
          </div>
        </AntdCard>
      </div>
    );
  }
}

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  componentClass: PropTypes.func,
  props: PropTypes.object,
  placeHolder: PropTypes.element,
  desc: PropTypes.string,
};
