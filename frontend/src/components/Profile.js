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
const theme = {
    spacing: 8,
  }

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


  class Profile extends React.Component{
      render(){
            return(
            <div>
            <CssBaseline />
            <Container spacing = {8}>
            <Typography component="h1" variant="h2">
                Profile
            </Typography>
            <div>
                <img style = {{width:160, height:160, borderRadius:160/2}}
                src = "https://ibb.co/t3g8Cyx"
                />
            </div>
            
            <Paper >
            <Typography component="h1" variant="h5" align = 'left'>
                Edit Profile Image
            </Typography>
            <TextField id="filled-basic"  type = "file"  />
                
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>

            <Divider />
            <Typography component="h1" variant="h5" align = 'left'>
                    Email
                </Typography>
                <Typography component="h1" variant="h6" align = 'center'>
                    zcai57@wisc.edu
                </Typography>
                <div>
                <form>
    
                <TextField id="filled-basic" label="New Email"  type = "email"/>
                
               
              
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>
                
                </form>
                </div>
                <Divider />
            <Typography component="h1" variant="h5" align = 'left'>
                Username
            </Typography> 
            <Typography component="h1" variant="h6" align = 'center'>
                zcai57
            </Typography>
            <TextField id="filled-basic" label="New Username"  />
                
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>
            <Divider />
            <Typography component="h1" variant="h5" align = 'left'>
                Password
            </Typography> 
            <Typography component="h1" variant="h5" align = 'center'>
                ********
            </Typography> 
            <TextField id="filled-basic" label="New Password" type = "password" />
                
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>
            <Divider />
            
            <Typography component="h1" variant="h5" align = 'left'>
                StudyLocation
            </Typography> 
            <Typography component="h1" variant="h5" align = 'center'>
                anywhere
            </Typography> 
            <TextField id="filled-basic" label="New Studylocation"  />
                
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>

                <Typography component="h1" variant="h5" align = 'left'>
                StudyTime
            </Typography> 
            <Typography component="h1" variant="h5" align = 'center'>
                anytime
            </Typography> 
            
            <TextField id="filled-basic"  variant = "outlined" type = 'date'/>
            <TextField id="filled-basic"  variant = "outlined" type = 'time'/>
                <Button align="right" variant = "contained" color = "primary" size = "large">
                    Save
                </Button>
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
