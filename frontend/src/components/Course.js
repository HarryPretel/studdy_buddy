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

// function openModal(){
//   setIsOpen(true);
// }
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
      events: [],
      date: '',
      create:{
        status: 1,
      }
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
      setTimeout(function() {this.handle_fetch_event()}.bind(this),100);
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

    is_organizer(data){
      var flag = false;
      if (data.pk === this.props.userpk){
        flag = true;
      }
      console.log(flag)
      return flag;
    }

    handle_quit_event(data){
      let input = '{"userpk":' + this.props.userpk + '}'
      fetch('http://localhost:8000/api/events/' + data + '/', {
        method: 'DELETE',
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
      });
      setTimeout(function() {this.handle_fetch_event()}.bind(this),100);
    }

    handle_delete_event(data){
      fetch('http://localhost:8000/api/events/organizers/' + this.props.userpk + '-' + data + '/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem('token')}`
        },
      })
      .then(response => response.json())
      .catch(error => {
        console.log("ERROR: " + error)
        alert('Delete successfully');
      });
      setTimeout(function() {this.handle_fetch_event()}.bind(this),100);
    }

    get_date(data){
      var str = data.split("T")
      return str[0]
    }

    get_time(data){
      var str = data.split("T")[1]
      var res = str.split("Z")
      return res[0].split(":00")[0]
    }

    handle_on_change(e){
      if (e.target.id === 'date'){
        this.setState(prevState => ({
          ...prevState,
          date: e.target.value
        }))
      } else{
        this.setState(prevState => ({
          ...prevState,
          create: {
            ...prevState.create,
            [e.target.id]:e.target.value
          }
        }))
        setTimeout(function() {console.log(this.state.create)}.bind(this),100);
      }
    }

    handle_event_time(e){
      var datetime = this.state.date
      if (e.target.id === 'start'){
        console.log('here')
        datetime += 'T' + e.target.value + ':00Z'
        console.log(datetime)
      }else{
        datetime += 'T' + e.target.value + ':00Z'
      }
      setTimeout(function() {
        this.setState(prevState => ({
          ...prevState,
          create: {
            ...prevState.create,
            [e.target.id]:datetime
          }
        }))
      }.bind(this),100);
      setTimeout(function() {console.log(this.state.create)}.bind(this),100);
    }

    handle_create_event(){
      console.log(JSON.stringify(this.state.create))
      fetch('http://localhost:8000/api/events/create/' + this.props.userpk + '-' + this.state.course.pk + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(this.state.create)
      })
      .then(response => response.json())
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      })
      setTimeout(function() {this.handle_fetch_event()}.bind(this),100);
    }

    handle_on_submit(){
      var today = new Date()
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      var time_organized = date + 'T' + time + 'Z'

      this.setState(prevState => ({
        ...prevState,
        create: {
          ...prevState.create,
          time_organized: time_organized
        }
      }))
      console.log(this.state.create)
      setTimeout(function() {this.handle_create_event()}.bind(this),100);
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
                        <Popup trigger={<button type = "Button" class = "Button" sstyle={{float: "right"}}> Create Event</button>} position="bottom center">
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
                                id="title"
                                label="Title"
                                name="Title"
                                onChange = {(e) => this.handle_on_change(e)}
                                autoFocus
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Date"
                                type = "date"
                                id="date"
                                onChange = {(e) => this.handle_on_change(e)}
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Start Time"
                                type="time"
                                id="start"
                                onChange = {(e) => this.handle_event_time(e)}
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="End Time"
                                type="time"
                                id="end"
                                onChange = {(e) => this.handle_event_time(e)}
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Size Limit"
                                type="number"
                                id="size_limit"
                                onChange = {(e) => this.handle_on_change(e)}
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Link"
                                type="url"
                                id="link"
                                onChange = {(e) => this.handle_on_change(e)}
                              />
                              <TextField
                                // variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Description"
                                type="text"
                                id="description"
                                onChange = {(e) => this.handle_on_change(e)}
                              />
                                
                            {/* <Link >Cancel</Link> */}
                              <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick = {() => this.handle_on_submit()}
                                className={classes.submit}
                              >
                                Confirm
                              </Button>
                              
                            </form>
                          </div>
                          <Box mt={8}>
                         
                          </Box>
                          {/* </Modal> */}

                          </Popup>
                        </Typography>
                        <Table size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Host</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>StartTime</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((event) => (
                            <TableRow key={event.pk}>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.organizer.first_name} {event.organizer.last_name}</TableCell>
                                <TableCell>{this.get_date(event.start)}</TableCell>
                                <TableCell>{this.get_time(event.start)}</TableCell>
                                <TableCell><a target = "_blank" component = "button" variant = "body2" href = {event.link} >Link</a></TableCell>
                                <TableCell>
                                {/* <Button align="right" class="btn btn-xs" onClick = {() => this.handle_join_event(event.pk)}>Join</Button> */}
                                    {this.is_organizer(event.organizer)
                                      ? <Button align="right" variant = "contained" color = "secondary" size = "small" onClick = {()=>this.handle_delete_event(event.pk)}>Delete</Button>
                                      : this.is_joined(event.participants) 
                                        ? <Button align="right" variant = "contained" color = "tertiary" size = "small" onClick = {()=>this.handle_quit_event(event.pk)}>Quit</Button>
                                        : <Button align="right" variant = "contained" color = "primary" size = "small" onClick = {()=>this.handle_join_event(event.pk)}>Join</Button>
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
