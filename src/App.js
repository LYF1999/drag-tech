import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DropContent from './DropContent';
import Card from './DraggableCard';

import './style.less';


@DragDropContext(HTML5Backend)
class App extends Component {

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent:'flex-start' }}>
        <div style={{ width: '60%', display: 'inline-block', border: '1px solid black' }}>
          <DropContent />
        </div>
        <div style={{ width: '30%', display: 'inline-block', border: '1px solid black', margin: 10, padding: 10 }}>
          <Card text="Glass" />
          <Card text="Banana" />
          <Card text="Paper" />
        </div>
      </div>
    );
  }
}

export default App;


{/*<div>*/
}
{/*<div style={{ width: '58%', display: 'inline-block', border: '1px solid black' }}>*/
}
{/*<ReactGridLayout*/
}
{/*className="layout"*/
}
{/*layout={layout}*/
}
{/*cols={12}*/
}
{/*rowHeight={30}*/
}
{/*width={1200}*/
}
{/*onDragStart={this.onDragStart}*/
}
{/*>*/
}
{/*<div key={'a'}>a</div>*/
}
{/*<div key={'b'} style={{ backgroundColor: 'blue' }}>b</div>*/
}
{/*</ReactGridLayout>*/
}
{/*</div>*/
}
{/*<div style={{ width: '30%', display: 'inline-block', border: '1px solid blue', margin: 10, padding: 10 }}>*/
}
{/*<div style={{ border: '1px solid black', margin: 10 }}>Text1</div>*/
}
{/*<div style={{ border: '1px solid black', margin: 10 }}>Text2</div>*/
}
{/*<div style={{ border: '1px solid black', margin: 10 }}>Text3</div>*/
}
{/*</div>*/
}
{/*</div>*/
}
