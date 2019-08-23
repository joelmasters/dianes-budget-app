import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import NewBucketInputs from './NewBucketInputs';

export default class NewBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: this.props.showScreen
    }
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };

  fullList = side => (
    <div
      style={styles.fullList}
      role="presentation"
    >
      <NewBucketInputs 
        createNew={this.createNewBucket}/>
    </div>
  );

  createNewBucket = (newBucket) => {
    this.props.createNewBucket(newBucket);
    this.toggleDrawer('bottom', false);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.showScreen !== this.state.showScreen) {
      this.setState({ bottom: nextProps.showScreen });
    }
  }

  render() {
    return (
      <div>
        <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)}>
          {this.fullList('bottom')}
        </Drawer>
      </div>
    );
  }
}

const styles = {
  fullList: {
    width: 'auto',
    height: '80vh',
  }
}
  
