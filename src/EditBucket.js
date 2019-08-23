import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

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

  editBucket = (edittedBucket, toggle=true) => {
    this.props.editBucket(edittedBucket, toggle);
    if (toggle) {
      this.toggleDrawer('right', false);
    }
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
          <Button color="primary" style={styles.button} onClick={this.toggleDrawer('right', false)}>
            <ArrowBack />&nbsp;&nbsp;&nbsp;Back
          </Button>
          {this.fullList('right')}
        </Drawer>
      </div>
    );
  }
}

const styles = {
  fullList: {
    width: 'auto',
    height: '100vh',
  },
  button: {
    margin: '10px',
    textAlign: 'left',
    width: '100px',
  }
}
  
