import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Study Buddy
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  
  const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  });
  
  class SignupForm extends React.Component {
    state = {
      username: '',
      password: '',
      studytime: [],
      studylocation: ''
    };
  
    handle_change = e => {
      const name = e.target.name
      const value = e.target.value
      this.setState(prevstate => {
        const newState = { ...prevstate };
        newState[name] = value;
        return newState;
      });
    };
  
    
  
    render() {
      const classes = withStyles(useStyles);
      const studyTime = ['morning','afternoon','evening','night']
      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;
      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <InputLabel id="studytime-label">Preferred Study Time</InputLabel>
            <Select
              labelId="studytime-label"
              id="studytime"
              name = "studytime"
              multiple
              value={this.state.studytime}
              onChange={this.handle_change}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chip}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {studyTime.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="location"
              label="Preferred Study Location"
              name="location"
              value={this.state.studylocation}
              onChange={this.handle_change}
              autoFocus
            />
          </form>
          </div>
        </Container>
      );
    }
  }
  
  export default SignupForm;
  
  SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
  };