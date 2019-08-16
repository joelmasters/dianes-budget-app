import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import EditBucketInputs from './EditBucketInputs';

export default class EditBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      right: this.props.showScreen
    }
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [side]: open });
  };

  fullList = side => (
    <div
      style={styles.fullList}
      role="presentation"
    >
      <EditBucketInputs
        bucket={this.props.bucket} 
        edit={this.editBucket}
        deleteBucket={this.deleteBucket} />
    </div>
  );

  editBucket = (edittedBucket) => {
    this.props.editBucket(edittedBucket);
    this.toggleDrawer('right', false);
  }
  deleteBucket = (deletedBucket) => {
    this.props.deleteBucket(deletedBucket);
    this.toggleDrawer('right', false);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.showScreen !== this.state.showScreen) {
      this.setState({ right: nextProps.showScreen });
    }
  }

  render() {
    return (
      <div>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          {this.fullList('right')}
        </Drawer>
      </div>
    );
  }
}

const styles = {
  fullList: {
    width: '90vw',
    height: '100vh',
  }
}
  
