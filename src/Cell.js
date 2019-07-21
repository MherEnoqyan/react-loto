
import React, { PureComponent } from 'react';

class Cell extends PureComponent {

  render() {
    const { field, number, selected, selectHandler } = this.props;

    return (
      <div className={`cell ${selected && "selected"}`} onClick={() => {selectHandler(field, number)}}>
        {number}
      </div>
    );
  }
}

export default Cell;
