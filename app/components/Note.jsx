
import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
  beginDrag(props) {
    console.log('begin dragging note', props);

    return {
      id: props.id
    };
  },

  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id,
          sourceProps = monitor.getItem(),
          sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetId });
    }
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class Note extends React.Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      id,
      onMove,
      ...props
    } = this.props;

    return connectDragSource(connectDropTarget(
      <li style={{ opacity: isDragging ? 0 : 1 }} {...props}>{props.children}</li>
    ));
  }
}

export default Note;
