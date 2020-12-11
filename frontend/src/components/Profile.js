import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { requirePropFactory } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Dropdown } from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        {/* <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '} */}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = theme => ({
    button: {
      margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
  });

  class Profile extends React.Component{
    
    state = {
        userprofile: {
            studytime: [],
            studylocation: '',
            user: {
                username: '',
                email: '',
                first_name: '',
                last_name: ''
            }
        },
        is_edit: false,
        profile:{}
    }

    componentDidMount(){
        this.handle_fetch_profile()
    }

    handle_fetch_profile(){
        fetch('http://localhost:8000/api/userprofiles/' + this.props.userpk + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.state.token
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json))
            this.setState({
                userprofile: json,
            })
            console.log('fetch profile')
            console.log(this.state.userprofile)
            console.log(this.state.userprofile.user.username)
        })
        .catch(error => {
            console.log("ERROR: " + error)
        });
    }

    handle_study_time(data){
        var i;
        var text ='';
        for (i = 0; i < data.length; i++) {
            if (i === 0) {
                if(data[i] === 'a'){
                    text += 'Afternoon'
                } else if(data[i] === 'e'){
                    text += 'Evening'
                } else if (data[i] === 'm') {
                    text += 'Morning'
                } else if (data[i] === 'n'){
                    text += 'Night'
                }
            }else{
                if(data[i] === 'a'){
                    text += ', Afternoon '
                } else if(data[i] === 'e'){
                    text += ', Evening '
                } else if (data[i] === 'm') {
                    text += ', Morning '
                } else if (data[i] === 'n'){
                    text += ', Night '
                }
            }
            
        }
        return text
    }

    handle_edit(){
            this.setState(prevState => ({
                ...prevState,
                is_edit: true
            }))
    }

    handle_time(e,d){
        this.setState(prevState => ({
            ...prevState,
            profile: {
                ...prevState.profile,
                studytime: d.value
            }
        }))
    }

    handle_location(e){
        this.setState(prevState => ({
            ...prevState,
            profile: {
                ...prevState.profile,
                studylocation: e.target.value
            }
        }))
    }

    handle_confirm(){
       
        fetch('http://localhost:8000/api/userprofiles/' + this.props.userpk + '/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(this.state.profile)
        })
        .then(response => response.json())
        .catch(error => {
            console.log("ERROR: " + error)
            alert(error);
        })
        alert('Edited Successfully')
        setTimeout(function() {this.handle_fetch_profile()}.bind(this),100);
        
        this.setState(prevState => ({
            ...prevState,
            is_edit: false
        }))
    }

      render(){
          console.log('render')
          console.log(this.state)
          const classes = withStyles(useStyles);
          const options = [
            {key: "m", text: "Morning", value: "m"},
            {key: "a", text: "Afternoon", value: "a"},
            {key: "e", text: "Evening", value: "e"},
            {key: "n", text: "Night", value: "n"},
          ];
            return(
            <div>
            
            <CssBaseline />
            <Container spacing = {12}>
            
            <Typography component="h1" variant="h2">
                {this.state.userprofile.user.first_name} {this.state.userprofile.user.last_name} 
            </Typography>
            {/* <div>
                <img style = {{width:160, height:160, borderRadius:160/2}}
                src = "https://ibb.co/t3g8Cyx"
                />
            </div> */}

            <Paper >
            <Typography component="h1" variant="h5" align = 'left'>
                Username :  {this.state.userprofile.user.username}
            </Typography> 
            
            <Typography component="h1" variant="h5" align = 'left'>
                Email : {this.state.userprofile.user.email}
            </Typography> 


            <Typography component="h1" variant="h4" align = 'left'>
                Profile
            </Typography> 
            {this.state.is_edit
                ? <Button variant="contained" color="secondary" className = {classes.button} onClick = {() => this.handle_confirm()}> Confirm </Button>
                : <Button variant="contained" color="primary" className = {classes.button} onClick = {() => this.handle_edit()}> Edit </Button>
            }
            
            <Divider />
            {this.state.is_edit
                ?
                <form className={classes.form} noValidate>
                <Typography component="h1" variant="h5" align = 'left'> Preferred study time: </Typography> 
                <Dropdown 
                    placeholder='Preferred Study Time' 
                    fluid multiple selection options={options} 
                    // value = {this.props.studytime}
                    onChange= {(event,data) => this.handle_time(event,data)}
                    id = "studytime"
                />
                </form>
                : <Typography component="h1" variant="h5" align = 'left'> Preferred study time: {this.handle_study_time(this.state.userprofile.studytime)}</Typography>
                
            }
             
            {/* <Typography component="h1" variant="h5" align = 'center'>
                
            </Typography>  */}
            {/* <TextField id="filled-basic" label="New Studylocation"  />
                
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button> */}
            {this.state.is_edit
                ? <form className={classes.form} noValidate>
                    <Typography component="h1" variant="h5" align = 'left'> Preferred study location: </Typography> 
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="studylocation"
                        label="Preferred Study Location"
                        name="location"
                        onChange={(e) => this.handle_location(e)}
                        autoFocus
                    />
                    </form>
                : <Typography component="h1" variant="h5" align = 'left'> Preferred study location: {this.state.userprofile.studylocation}</Typography>
            }
             
            {/* <Typography component="h1" variant="h5" align = 'center'>
                anytime
            </Typography>  */}
            
            {/* <TextField id="filled-basic"  variant = "outlined" type = 'date'/>
            <TextField id="filled-basic"  variant = "outlined" type = 'time'/>
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button> */}
            </Paper>
            </Container>
             
            
            

            <footer>
                    <Container maxWidth="sm">
                    {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
                    <Copyright />
                    </Container>
                
            </footer>
            </div>
        )
      }
  }

  export default Profile;
