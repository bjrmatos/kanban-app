
import React from 'react';
import Lane from './Lane.jsx';

class Lanes extends React.Component {
  renderLane(lane) {
    return (
      <Lane className="lane" key={`lane${lane.id}`} lane={lane} />
    );
  }

  render() {
    const lanes = this.props.items;

    return (
      <div className="lanes">{lanes.map(this.renderLane)}</div>
    );
  }
}

export default Lanes;
