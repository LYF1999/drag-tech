import React, { isValidElement } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

import DropComponent from './DropComponent';
import Card from './DraggableCard';

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
class DropContent extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  state = {
    components: [{
      type: 'bottom',
      props: {
        style: {
          width: '100%',
          height: '20px',
        }
      }
    }],
    havePlaceHolder: false,
  };


  insertPlaceHolder = null;

  childrenOffset = {};

  placeHolder = { type: 'placeHolder', props: { style: { backgroundColor: 'red', width: '100%', height: 20 } } };


  getChildrenOffset(children) {
    const result = {};
    _.forEach(children, (child, index) => {
      const realDOM = this.refs[`component-${index}`];
      result[index] = {
        top: realDOM.offsetTop,
        left: realDOM.offsetLeft,
      }
    });
    return result;
  }

  componentWillReceiveProps(nextProps) {
    let placeHolderIndex = this.getPlaceHolderIndex(this.state.components);
    const length = this.state.components.length;

    if (placeHolderIndex === undefined) {
      if (nextProps.didDrop === false && nextProps.isOver && !this.state.havePlaceHolder) {
        this.insertPlaceHolder = setTimeout(() => {
          this.setState((preState) => ({
            components: [
              ...preState.components.slice(0, length - 1),
              this.placeHolder,
              preState.components[length - 1]
            ],
            havePlaceHolder: true,
          }));
        }, 10);

        return;
      }
      return;
    }

    if (this.props.didDrop === false && nextProps.didDrop === true) {
      this.setState((preState) => ({
        components: [
          ...preState.components.slice(0, placeHolderIndex),
          {
            type: 'Card',
            props: nextProps.item,
            ref: `component-${length}`
          },
          ...preState.components.slice(placeHolderIndex + 1)
        ],
        havePlaceHolder: false,
      }));
      return;
    }

    if (this.props.isOver === true && nextProps.isOver === false) {
      this.setState((preState) => ({
        components: [
          ...preState.components.slice(0, placeHolderIndex),
          ...preState.components.slice(placeHolderIndex + 1),
        ],
        havePlaceHolder: false,
      }));
    }

  }

  componentDidUpdate() {
    // this.childrenOffset = this.getChildrenOffset(this.state.components)
  }

  getPlaceHolderIndex = (components) => {
    let placeHolderIndex;
    for (const [index, component] of components.entries()) {
      if (component.type === 'placeHolder') {
        placeHolderIndex = index;
      }
    }

    return placeHolderIndex;
  };

  handleOver = ({ index }) => {
    setTimeout(() => {
      if (this.insertPlaceHolder) {
        clearTimeout(this.insertPlaceHolder);
      }

      this.setState((preState) => {
        const components = preState.components;
        const placeHolderIndex = this.getPlaceHolderIndex(components);

        console.log(placeHolderIndex, index);

        if (placeHolderIndex === undefined) {
          return {
            components: [
              ...components.slice(0, index),
              this.placeHolder,
              ...components.slice(index)
            ]
          }
        }




        if (placeHolderIndex < index) {
          return {
            components: [
              ...components.slice(0, placeHolderIndex),
              ...components.slice(placeHolderIndex + 1, index),
              this.placeHolder,
              ...components.slice(index)
            ]
          }
        } else if (placeHolderIndex > index) {
          return {
            components: [
              ...components.slice(0, index),
              this.placeHolder,
              ...components.slice(index, placeHolderIndex),
              ...components.slice(placeHolderIndex + 1)
            ]
          }
        }
      })
    })
  };


  render() {
    const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;


    return connectDropTarget(
      <div
        id="content"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ width: 400, height: 400, overflow: 'auto' }}>
          {_.map(this.state.components, (component, index) => (
            <div ref={component.ref} key={index} style={{ width: '100%' }}>
              <DropComponent
                index={index}
                handleOver={this.handleOver}
              >
                <Card {...component.props} />
              </DropComponent>
            </div>
          ))}
        </div>
      </div>,
    );
  }
}

export default DropContent
