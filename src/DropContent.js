import React from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

import DropComponent from './DropComponent';
import DragComponent from './DragComponent';

const squareTarget = {
  canDrop(props) {
    return true;
  },

  drop(props) {

  },
  hover() {
  },
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
class DropContent extends React.Component {

  static propTypes = {};
  static defaultProps = {};

  insertPlaceHolder = null;

  placeHolder = {
    type: 'placeholder',
    props: {
      style: { backgroundColor: 'rgba(78,188,221,2.15)', width: '100%', height: 3, position: 'relative' },
    },
  };

  state = {
    components: [{
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '20px',
        },
      },
    }],
    havePlaceHolder: false,
    onDragIndex: undefined,
  };


  componentWillReceiveProps(nextProps) {
    const placeHolderIndex = this.getPlaceHolderIndex(this.state.components);
    const length = this.state.components.length;

    if (placeHolderIndex === undefined) {
      if (nextProps.didDrop === false && nextProps.isOver && !this.state.havePlaceHolder) {
        this.insertPlaceHolder = setTimeout(() => {
          this.setState(preState => ({
            components: [
              ...preState.components.slice(0, length - 1),
              this.placeHolder,
              preState.components[length - 1],
            ],
            havePlaceHolder: true,
          }));
        }, 10);

        return;
      }
      return;
    }

    if (this.props.didDrop === false && nextProps.didDrop === true) {
      const item = nextProps.item;
      if (item.props.inContent === true) {
        if (this.state.onDragIndex !== undefined) {
          if (this.state.onDragIndex < placeHolderIndex) {
            this.setState(preState => {
              return {
                components: [
                  ...preState.components.slice(0, preState.onDragIndex),
                  ...preState.components.slice(preState.onDragIndex + 1, placeHolderIndex),
                  item.props.component,
                  ...preState.components.slice(placeHolderIndex + 1)
                ]
              }
            })
          } else if (this.state.onDragIndex >= placeHolderIndex) {
            this.setState(preState => {
              return {
                components: [
                  ...preState.components.slice(0, placeHolderIndex),
                  item.props.component,
                  ...preState.components.slice(placeHolderIndex + 1, this.state.onDragIndex + 1),
                  ...preState.components.slice(this.state.onDragIndex + 2)
                ]
              }
            })
          }
          return
        }


        this.setState((preState) => {
          return {
            components: [
              ...preState.components.slice(0, placeHolderIndex),
              item.props.component,
              ...preState.components.slice(placeHolderIndex + 1),
            ],
          }
        });
        return;
      }

      this.setState((preState) => {
        return {
          components: [
            ...preState.components.slice(0, placeHolderIndex),
            {
              type: nextProps.item.props.componentClass,
              props: { ...nextProps.item.props.props, inContent: true },
              ref: `component-${length}`,
              showIcon: true,
            },
            ...preState.components.slice(placeHolderIndex + 1),
          ],
          havePlaceHolder: false,
        }
      });
      return;
    }

    if (this.props.isOver === true && nextProps.isOver === false) {
      this.setState(preState => ({
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
      if (component.type === 'placeholder') {
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

        if (placeHolderIndex === undefined) {
          return {
            components: [
              ...components.slice(0, index),
              this.placeHolder,
              ...components.slice(index),
            ],
          };
        }


        if (placeHolderIndex < index) {
          return {
            components: [
              ...components.slice(0, placeHolderIndex),
              ...components.slice(placeHolderIndex + 1, index),
              this.placeHolder,
              ...components.slice(index),
            ],
          };
        } else if (placeHolderIndex > index) {
          return {
            components: [
              ...components.slice(0, index),
              this.placeHolder,
              ...components.slice(index, placeHolderIndex),
              ...components.slice(placeHolderIndex + 1),
            ],
          };
        }
      });
    });
  };

  findIndexByRef = (components, ref) => {
    for (const [index, component] of components.entries()) {
      if (component.ref === ref) {
        return index;
      }
    }
  };


  createComponent = (component) => {

    const props = component.props;

    const otherProps = {};

    if (Reflect.has(props, 'onChange')) {
      otherProps.onChange = (value) => {
        this.setState(preState => {
          const index = this.findIndexByRef(preState.components, component.ref);
          const result = props.onChange(value);
          const newComponent = {
            ...component,
            props: {
              ...component.props,
              ...result,
            },
          };

          return {
            components: [
              ...preState.components.slice(0, index),
              newComponent,
              ...preState.components.slice(index + 1)
            ]
          };
        });
      };
    }


    const newProps = {
      ...props,
      ...otherProps,
    };

    if (component.type === 'placeholder') {
      return <div {...newProps} />
    } else {
      return <component.type {...newProps} />
    }
  };

  onDrag = (props) => {
    this.setState({
      onDragIndex: props.index,
    })
  };

  endDrag = (props) => {
    this.setState({
      onDragIndex: undefined,
    })
  }


  onDelete = (component) => {
    this.setState((preState) => {
      const index = this.findIndexByRef(preState.components, component.ref);
      return {
        components: [
          ...preState.components.slice(0, index),
          ...preState.components.slice(index + 1)
        ]
      }
    })
  };


  onReady = (component) => {
    this.setState((preState) => {
      const index = this.findIndexByRef(preState.components, component.ref);
      const newComponent = {
        ...component,
        props: {
          ...component.props,
          canDrag: true,
        },
        canDrag: true,
      };
      return {
        components: [
          ...preState.components.slice(0, index),
          newComponent,
          ...preState.components.slice(index + 1)
        ]
      }
    })
  };

  onCancelReady = (component) => {
    this.setState((preState) => {
      const index = this.findIndexByRef(preState.components, component.ref);
      const newComponent = {
        ...component,
        props: {
          ...component.props,
          canDrag: false
        },
        canDrag: false,
      };
      return {
        components: [
          ...preState.components.slice(0, index),
          newComponent,
          ...preState.components.slice(index + 1)
        ]
      }
    })
  }


  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div
        id="content"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ minHeight: 400, overflow: 'auto' }}>
          {_.map(this.state.components, (component, index) => (
            <div
              ref={component.ref}
              style={{ width: '100%' }}
            >
              <DropComponent
                index={index}
                handleOver={this.handleOver}
                showIcon={component.showIcon}
                component={component}
                onDelete={this.onDelete}
              >
                <DragComponent
                  inContent
                  index={index}
                  onDrag={this.onDrag}
                  endDrag={this.endDrag}
                  onReady={this.onReady}
                  showIcon={component.showIcon}
                  component={component}
                  canDrag={component.canDrag}
                  onCancelReady={this.onCancelReady}
                >
                  {this.createComponent(component)}
                </DragComponent>
              </DropComponent>
            </div>
          ))}
        </div>
      </div>,
    );
  }
}

export default DropContent;
