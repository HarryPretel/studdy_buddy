import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import SignupForm from './SignupForm';
import CreateProfileForm from './CreateProfileForm';

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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Credentials', 'Profile'];

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            step: 1,
            profile: {
              studytime: 'a',
              studylocation: 'Home',
            } , 
            user: {username : '',
                first_name: '',
                last_name: '',
                email: '',
                password:'',}
        }
    }

    next() {
        this.setState({
            step: this.state.step + 1
        })
    }

    prev() {
        this.setState({
            step: this.state.step - 1
        })
    }

    handleUserOnChange(e) {
      
        this.setState(prevState => ({
          ...prevState,
          user: {
            ...prevState.user,
            [e.target.id]: e.target.value
          }
      }))
          
    }

    handleOnChange(e) {
      
      this.setState(prevState => ({
        ...prevState,
        profile: {
            ...prevState.profile,
            [e.target.id]: e.target.value
        }
    }))
        
  }

    render(){
        const classes = withStyles(useStyles);
        const activeStep = this.state.step;

        switch (this.state.step) {
            case 1:
                return <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    
                    <Typography component="h1" variant="h4" align="center">
                    Signup
                    </Typography>
                    <Stepper activeStep={this.state.step} className={classes.stepper}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === 2 ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                            Thank you for signing up.
                            </Typography>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <SignupForm
                                first_name = {this.state.user.first_name}
                                last_name = {this.state.user.last_name}
                                email = {this.state.user.email}
                                username = {this.state.user.username}
                                password = {this.state.user.password}
                                onChange = {this.handleUserOnChange.bind(this)}
                                next = {this.next.bind(this)}
                                />    
                        </React.Fragment>
                        )}
                    </React.Fragment>
                   
                    <Copyright />
                </main>
                </React.Fragment>
            case 2:
                return <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    
                    <Typography component="h1" variant="h4" align="center">
                    Signup
                    </Typography>
                    <Stepper activeStep={this.state.step} className={classes.stepper}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        <React.Fragment>
                            <CreateProfileForm
                                studytime = {this.state.profile.studytime}
                                studylocation = {this.state.profile.studylocation}
                                onChange = {this.handleOnChange.bind(this)}
                                next = {e => this.props.handle_signup(e, this.state)}
                                prev = {this.prev.bind(this)}
                                />
                        </React.Fragment>
                    </React.Fragment>
                    
                    <Copyright />
                </main>
                </React.Fragment>
            default:
                return null
        }
    }
}

export default Signup;

Signup.propTypes = {
    handle_signup: PropTypes.func.isRequired
};