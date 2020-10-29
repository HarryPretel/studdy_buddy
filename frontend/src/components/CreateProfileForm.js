import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dropdown } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";

  
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
      margin: theme.spacing(3),
      minWidth: 120,
      maxWidth: 300,
    },

    noLabel: {
      marginTop: theme.spacing(3),
    },
  });
  
  class CreateProfileForm extends React.Component {




  
    render() {
      const classes = withStyles(useStyles);
      const options = [
        {key: "m", text: "Morning", value: "m"},
        {key: "a", text: "Afternoon", value: "a"},
        {key: "e", text: "Evening", value: "e"},
        {key: "n", text: "Night", value: "n"},
      ];


      // const [state, setState] = React.useState({
      //   morning : false,
      //   afternoon : false,
      //   evening : false,
      //   night : false,
      // });
      //const {morning, afternoon, evening, night} = state;
      //const error = [morning, afternoon, evening, night].filter((v) => v).length > 2;

      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <Dropdown 
              placeholder='Preferred Study Time' 
              fluid multiple selection options={options} 
              value = {this.props.time}
              onChange={this.props.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="location"
              label="Preferred Study Location"
              name="location"
              value={this.props.location}
              onChange={this.props.onChange}
              autoFocus
            />
            <Button
              onClick = {this.props.next}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          </div>
        </Container>
      );
    }
  }
  
  export default CreateProfileForm;
