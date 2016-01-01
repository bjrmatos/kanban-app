
import React from 'react';

class Editable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    // this.renderTask = this.renderTask.bind(this);
    this.renderValue = this.renderValue.bind(this);

    this.state = {
      editing: false
    };
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(ev) {
    if (ev.key === 'Enter') {
      this.finishEdit(ev);
    }
  }

  finishEdit(ev) {
    this.props.onEdit(ev.target.value);

    this.setState({
      editing: false
    });
  }

  renderEdit() {
    return (
      <input
        type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
      />
    );
  }

  renderDelete() {
    return (
      <button className="delete" onClick={this.props.onDelete}>x</button>
    );
  }

  renderValue() {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.edit}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  }

  render() {
    const { value, onEdit, ...props } = this.props,
          editing = this.state.editing;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

export default Editable;
