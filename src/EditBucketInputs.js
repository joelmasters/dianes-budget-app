import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'block',
    paddingRight: theme.spacing(2),
    //flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(3),
    textAlign: 'center',
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonAdd: {
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    width: '100%',
    height: '60px',
    backgroundColor: '#f48fb1',
  },
  buttonDelete: {
    margin: theme.spacing(1),
    display: 'block',
  },
  input: {
    display: 'none',
  },
  title: {
    margin: theme.spacing(1),
  },
  list: {}
}));

export default function EditBucketInputs(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: props.bucket.name,
    left: props.bucket.left,
    set: props.bucket.set,
    endOfMonth: props.bucket.endOfMonth,
    history: props.bucket.history,
  });

  const handleSubtract = name => event => {
  };
  const handleAdd = name => event => {
  };
  const handleRadioChange = name => event => {
    let vals = {...values};
    vals.endOfMonth = event.target.value;
    setValues({...vals});
    props.edit({ ...vals }, false);
  }
  const edit = () => {
    let prevVal = values.left;
    let add = parseInt(document.getElementById('textfield-add').value);
    add = !add ? 0 : add;
    let sub = parseInt(document.getElementById('textfield-subtract').value); 
    sub = !sub ? 0 : sub;
    let diff = add - sub;
    let newVal = parseInt(prevVal) + diff;
    
    if (newVal !== 0 && newVal !== "0") {
      values.left = newVal;
      let d = new Date();
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      let da = d.getDate();
      let n = m + "/" + da + "/" + y;

      values.history.unshift({
        diff: diff,
        date: n,
      });
    } 

    let set = parseInt(document.getElementById('textfield-set').value);
    if (set && set !== values.set) {
      values.set = set;
      values.left = set;
    }

    setValues({ ...values });
    props.edit({ ...values }, true);
  }
  const deleteBucket = () => {
    props.deleteBucket({ ...values });
  }
  const deleteHistoryItem = (idx) => {
    let valChange = values.history.splice(idx, 1);
    values.left -= valChange[0].diff;
    setValues({ ...values });
    props.edit({ ...values }, false);
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <h3 className={classes.title}>${values.left} Remaining</h3>
      <TextField
        id="textfield-subtract"
        label="Spent"
        type="number"
        onChange={handleSubtract('left')}
        className={classes.textField}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        id="textfield-add"
        label="Gained"
        type="number"
        onChange={handleAdd('left')}
        className={classes.textField}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <Button 
          variant="contained" 
          color="primary" 
          size="large"
          className={classes.buttonAdd}
          onClick={edit}>
        Save
      </Button>
      <br />
      {values.history.length > 0 ? <List 
            component="nav" 
            aria-label="history"
            className={classes.list}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                History
              </ListSubheader>
            }>
          {values.history.map((x,i) => 
            <ListItem button key={x.date + i}>
              <ListItemText primary={"$" + x.diff} secondary={x.date} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteHistoryItem(i)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List> : ''}
      <br />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">At the end of the month:</FormLabel>
        <RadioGroup
          aria-label="end-of-month"
          name="end-of-month"
          className={classes.group}
          value={values.endOfMonth}
          onChange={handleRadioChange('endOfMonth')}
        >
          <FormControlLabel value="rollover" control={<Radio />} label="Roll Over Remaining" />
          <FormControlLabel value="zero" control={<Radio />} label="Zero Out" />
        </RadioGroup>
      </FormControl>
      <br />
      <TextField
        id="textfield-set"
        label="Budgeted Amount"
        type="number"
        onChange={handleAdd('set')}
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        placeholder={values.set.toString()}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <Button 
          variant="contained" 
          color="default"
          size="small" 
          className={classes.buttonDelete}
          onClick={deleteBucket} >
        Delete Bucket
      </Button>
    </form> 
  );
}
