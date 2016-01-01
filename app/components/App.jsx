
import AltContainer from 'alt-container';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

@DragDropContext(HTML5Backend)
class App extends React.Component {
  addItem() {
    LaneActions.create({ name: 'New Lane' });
  }

  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addItem}>+</button>

        <AltContainer
          stores={[LaneStore]}
          inject={{
            items: () => LaneStore.getState().lanes || []
          }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
}

export default App;
