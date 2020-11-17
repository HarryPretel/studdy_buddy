import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Popup from 'reactjs-popup';
import TextField from '@material-ui/core/TextField';
import './CreateEvent.css'


const drawerWidth = 240;

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
  root: {
       flexGrow: 1,
       zIndex: 1,
       overflow: "hidden",      
       position: "relative",
       display: "flex"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  fixedHeight: {
    height: 240,
  },
});

function createData(id, Name, Location, Host , Time, Joinstatus) {
    return { id, Name, Location, Host, Time, Joinstatus};
  }

const rows = [
    createData(0, 'Study for CS506', 'Madison, WI', 'Dr.Strange', '16 Mar, 2019', 'Joined'),
    createData(1, 'Study for CS506', 'Madison, WI', 'Superman', '16 Mar, 2019', 'Joined'),
    createData(2, 'Study for CS506', 'Madison, WI', 'Batman', '16 Mar, 2019', 'Joined'),
    createData(3, 'Study for CS506', 'Madison, WI', 'Wonderwoman', '16 Mar, 2019', 'Joined'),
    createData(4, 'Study for CS506', 'Madison, WI', 'Ironman', '16 Mar, 2019', 'Joined'),
  ];

class Course extends React.Component{
    state = {
      course: this.props.course,
      events: []
    }

    componentDidUpdate(prevProps){
      if (prevProps.course !== this.props.course){
        this.setState({
          courses: this.props.course
        })
      }
    }

    componentDidMount(){
      this.handle_fetch_event()
    }
    
    handle_join_event(data){
      let input = '{"participants":[{"username":"'+ this.props.username+'"}]}'
      fetch('http://localhost:8000/api/events/' + data + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem('token')}`
        },
        body: input
      })
      .then(response => response.json())
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      })
    }

    handle_fetch_event(){
      fetch('http://localhost:8000/api/events/courses/' + this.state.course.pk +'/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authentication': 'Token ' + this.props.token
        },
      })
      .then(res => res.json())
      .then(json => {
        console.log(JSON.stringify(json))
        this.setState({
          events: json,
        })
        console.log(this.state.events)
      })
      .catch(error => {
        console.log("ERROR: " + error)
      });
    }

    is_joined(data){
      var flag = false;
      for (var i = 0; i < data.length; i++){
        if (data[i].pk === this.props.userpk){
          flag = true;
        }
      }
      return flag;
    }
    
    render(){
        const classes = useStyles;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        console.log('course')
        console.log(this.state.course)

        return (
            <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                {this.state.course.department} {this.state.course.number}
                </Typography>
                
            </Container>
            <Container className={classes.cardGrid} maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item item xs={12} md={8} lg={8} sm = {12}>
                <Paper className={fixedHeightPaper} >
                    <React.Fragment>
                        <Typography component="h2" variant="h6" color="primary" align="left" gutterBottom>
                        Events
                        {/* <Button align="right"  variant = "contained" color = "primary" size = "small" style={{float: 'right', right: 7, top: 7}}>Create event</Button> */}
                        <Popup trigger={<button type = "Button" class = "Button" style={{float: "right"}}> Create Event</button>} position="bottom center">
                          <div class = 'CreateEvent' >
                            
                            <Typography component="h1" variant="h5">
                            Create Event for CS 506
                            </Typography>
                            <form className={classes.form} noValidate>
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Title"
                                name="email"
                                autoComplete="email"
                                autoFocus
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Date"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Start Time"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="End Time"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Size Limit"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Description"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                              />
                                
                            {/* <Link >Cancel</Link> */}
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                              
                                className={classes.submit}
                              >
                                Confirm
                              </Button>
                              
                            </form>
                          </div>
                          <Box mt={8}>
                         
                          </Box>
                          </Popup>
                        </Typography>
                        <Table size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Host</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>StartTime</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((event) => (
                            <TableRow key={event.pk}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.organizer.first_name} {event.organizer.last_name}</TableCell>
                                <TableCell>{event.start}</TableCell>
                                <TableCell><a target = "_blank" component = "button" variant = "body2" href = {event.link} >Link</a></TableCell>
                                <TableCell>
                                {/* <Button align="right" class="btn btn-xs" onClick = {() => this.handle_join_event(event.pk)}>Join</Button> */}
                                    {this.is_joined(event.participants)
                                      ? 'Joined'
                                      : <Button align="right" variant = "contained" color = "primary" size = "small" onClick = {()=>this.props.handle_join_event(event.pk)}>Join</Button>
                                    }
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>

                        {/* <div className={classes.seeMore}>
                        <Link color="primary" href="#" >
                            See more orders
                        </Link>
                        </div> */}
                </React.Fragment>

                </Paper>
            </Grid>
            <Grid item item xs={12} md={4} lg={4} sm = {12}>
                <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                        <Typography component="h2" variant="h6" color="primary" align="left" gutterBottom>
                        Students
                        </Typography>
                        <Table size="small">
                        {/* <TableHead>
                            <TableRow>
                            <TableCell>Host</TableCell>
                            </TableRow>
                        </TableHead> */}
                        <TableBody>
                            {this.state.course.user.map((student) => (
                            <TableRow key={student.pk}>
                                
                                <TableCell>
                                    <PermIdentityIcon style={{ fontSize: 25}} >profile</PermIdentityIcon>
                                    {student.first_name} {student.last_name}
                                </TableCell>
    
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>

                        {/* <div className={classes.seeMore}>
                        <Link color="primary" href="#" >
                            See more orders
                        </Link>
                        </div> */}
                </React.Fragment>

                </Paper>
            </Grid>
          </Grid>
          </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
                <Copyright />
                </Container>
            
            </footer>
            </div>

         
        );
    }
}

export default withStyles(useStyles)(Course);
