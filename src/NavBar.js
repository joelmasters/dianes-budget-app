import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 0,
    bottom: 'auto',
    backgroundColor: '#82ada9',
    height: '70px',
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -62,
    right: 0,
    marginRight: theme.spacing(2),
    backgroundColor: '#f48fb1',
    color: 'black',
  },
  title: {
    textAlign: 'left',
    marginLeft: theme.spacing(2),
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <h2 className={classes.title}>Diane's Budget App</h2>
        <Toolbar>
          <Fab color="secondary" 
                aria-label="create new bucket" 
                className={classes.fabButton}
                onClick={props.showNewBucketScreen}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </>
  );
}
