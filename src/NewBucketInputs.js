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

const useStyles = makeStyles(theme => ({
  container: {
    display: 'block',
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
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#f48fb1',
    height: '60px',
  },
  input: {
    display: 'none',
  },
}));

export default function NewBucketInputs(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    set: 0,
    left: 0,
    endOfMonth: 'rollover',
    history: [],
  });

  const handleChangeValue = name => event => {
    setValues({ ...values, 
      set: parseInt(event.target.value),
      left: parseInt(event.target.value) });
  };
  const handleChangeName = name => event => {
    setValues({ ...values, 
      name: event.target.value });
  };
  const handleRadioChange = name => event => {
    setValues({ ...values, [name]: event.target.value});
  }
  const createNew = () => {
    props.createNew({ ...values });
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <h2 style={styles.title}>Create New Bucket</h2>
      <TextField
        id="outlined-dense"
        label="Bucket Name"
        className={classes.textField}
        variant="outlined"
        onChange={handleChangeName('name')}
        fullWidth
      />
      <TextField
        id="outlined-dense"
        label="Budgeted Amount"
        type="number"
        onChange={handleChangeValue('set')}
        className={classes.textField}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
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
      <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={createNew}
          fullWidth>
        Create
      </Button>
    </form> 
  );
}

const styles = {
  title: {
    marginLeft: '10px',
  }
}