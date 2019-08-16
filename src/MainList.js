import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: '80px',
  },
}));

export default function MainList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {props.buckets.map(x => 
          <ListItem button key={x.name} onClick={() => props.bucketClicked(x)}>
            <ListItemText primary={x.name} secondary={"$" + x.left + " Remaining"} />
          </ListItem>
        )}
      </List>
    </div>
  );
}
