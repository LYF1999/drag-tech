import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import _ from 'lodash';
import { Breadcrumb } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';

import DropContent from './DropContent';
import Card from './DraggableCard';

import './style.less';
import { Components } from './constants';

import './pen/src/pen';
import './pen/src/pen.css';
import './pen/src/font/fontello.ttf';


@DragDropContext(HTML5Backend)
class App extends Component {

  state = {
    isOpenSider: false,
    backgroundImg: ''
  };

  onMouseEnter = () => {
    this.setState({
      isOpenSider: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      isOpenSider: false,
    });
  }

  render() {
    return (
      <div className="flex-stretch">
        <div className="app-sider">
          <h2 style={{ margin: 20 }} className="text-center">Tech-Drag</h2>
        </div>
        <div style={{ width: '100%' }}>
          <Breadcrumb separator=">" style={{ padding: 20 }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tech-Drag</Breadcrumb.Item>
            <Breadcrumb.Item>Your Demo</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              backgroundImage: 'url("https://uploads.sxlcdn.com/static/backgrounds/nature/187.jpg")',
              width: '100%',
              height: 200,
              marginBottom: 40,
            }}>
          </div>
          <div>
            <DropContent />
          </div>
          <div
            style={{ width: 10, position: 'absolute', right: 0, top: 0, bottom: 0 }}
            onMouseEnter={this.onMouseEnter}
          />
          {this.state.isOpenSider && (
            <div className="drag-cards sider" onMouseLeave={this.onMouseLeave}>
              {_.map(Components, component => (
                <Card
                  imgSrc={component.imgSrc}
                  text={component.text}
                  componentClass={component.componentClass}
                  props={component.componentProps}
                  desc={component.desc}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;