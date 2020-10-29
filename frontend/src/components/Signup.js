import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import SignupForm from './SignupForm';
import CreateProfileForm from './CreateProfileForm';
import Steps from './Steps';

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

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <SignupForm />;
//     case 1:
//       return <CreateProfileForm />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            step: 1,
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password:'',
            time: [],
            location: '',
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

    handleOnChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        const classes = withStyles(useStyles);
        const activeStep = this.state.step;

        switch (this.state.step) {
            case 1:
                return <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
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
                            <Steps step = {this.state.step}/>
                            <SignupForm
                                first_name = {this.state.first_name}
                                last_name = {this.state.last_name}
                                email = {this.state.email}
                                username = {this.state.username}
                                password = {this.state.password}
                                onChange = {this.handleOnChange.bind(this)}
                                next = {this.next.bind(this)}
                                />
                            
                        </React.Fragment>
                        )}
                    </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
                </React.Fragment>
            case 2:
                return <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
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
                            <Steps step = {this.state.step}/>
                            <CreateProfileForm
                                time = {this.state.time}
                                location = {this.state.location}
                                onChange = {this.handleOnChange.bind(this)}
                                next = {e => this.props.handle_signup(e, this.state)}
                                prev = {this.prev.bind(this)}
                                />
                        </React.Fragment>
                    </React.Fragment>
                    </Paper>
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

// export default function SignUp() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <main className={classes.layout}>
//         <Paper className={classes.paper}>
//           <Typography component="h1" variant="h4" align="center">
//            Signup
//           </Typography>
//           <Stepper activeStep={activeStep} className={classes.stepper}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <React.Fragment>
//             {activeStep === steps.length ? (
//               <React.Fragment>
//                 <Typography variant="h5" gutterBottom>
//                   Thank you for signing up.
//                 </Typography>
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <div className={classes.buttons}>
//                   {activeStep !== 0 && (
//                     <Button onClick={handleBack} className={classes.button}>
//                       Back
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleNext}
//                     className={classes.button}
//                   >
//                     {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
//                   </Button>
//                 </div>
//               </React.Fragment>
//             )}
//           </React.Fragment>
//         </Paper>
//         <Copyright />
//       </main>
//     </React.Fragment>
//   );
// }