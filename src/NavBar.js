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
    textAlign: 'center',
    marginLeft: theme.spacing(2),
    lineHeight: '50px',
    fontSize: '24px',
  }
}));

const iconStyle = {
  height: '50px',
  width: '50px',
  borderRadius: '5px',
  display: 'inline-block',
  position: 'relative',
  top: '10px',
  marginRight: '6px',
}

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <div className={classes.title}><img style={iconStyle} src="/rainbow_title_img.png" />
          Diane's Budget App
        </div>
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
