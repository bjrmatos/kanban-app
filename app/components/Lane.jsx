
import AltContainer from 'alt-container';
import React from 'react';
import { DropTarget } from 'react-dnd';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem(),
          sourceId = sourceProps.id;

    if (!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class Lane extends React.Component {
  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }

  addNote(laneId) {
    NoteActions.create({task: 'New task'});
    LaneActions.attachToLane({ laneId });
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  editName(id, name) {
    if (name) {
      LaneActions.update({ id, name });
    } else {
      LaneActions.delete(id);
    }
  }

  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({ laneId, noteId });
    NoteActions.delete(noteId);
  }

  render() {
    const { connectDropTarget, lane, ...props } = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name" value={lane.name} onEdit={this.editName} />

          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
        </div>

        <AltContainer
          stores={[NoteStore]}
          inject={{
            items: () => NoteStore.get(lane.notes)
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
}

export default Lane;
