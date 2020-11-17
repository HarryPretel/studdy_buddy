import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Bt from '@material-ui/core/Button'
import {Button} from 'react-bootstrap';

import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

function Copyright() {
  
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Study Buddy '}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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


const useStyles = makeStyles((theme) => ({
  // icon: {
  //   marginRight: theme.spacing(2),
  // },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3];

class CourseDemo extends React.Component{
  
  state = {
    courses: [],
    events: []
  }

  

componentDidMount() {
    this.handle_get_course()
    this.handle_get_event()
  }

handle_quit_course(data){
  let input = '{"userpk":' + this.props.userpk + '}'
  fetch('http://localhost:8000/api/courses/' + data + '/', {
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
  setTimeout(function() {this.handle_get_course()}.bind(this),100);
  
}

handle_get_course(){
  fetch('http://localhost:8000/api/courses/students/' + this.props.userpk + '/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(json => {
      console.log(JSON.stringify(json))
      this.setState({
        courses: json
      })
    })
    .catch(error => {
      console.log("ERROR: " + error)
    });
}

handle_get_event(){
  fetch('http://localhost:8000/api/events/students/' + this.props.userpk + '/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `jwt ${localStorage.getItem('token')}`
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
  setTimeout(function() {this.handle_get_event()}.bind(this),100);
}

get_date(data){
  var str = data.split("T")
  return str[0]
}

get_time(data){
  var str = data.split("T")[1]
  var res = str.split("Z")
  return res[0]
}

render() {
  const classes = withStyles(useStyles);
  console.log(this.state.courses)

  return( 
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container  maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Dashboard
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.courses.map((course) => (
              <Grid item key={course} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  {/* <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  /> */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.department} {course.number}
                    </Typography>
                    <Typography>
                      {course.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Bt size="small" variant = "contained" color="primary" onClick = {(e) => this.props.handle_course(e,course)}>
                      View
                    </Bt>
                    <Bt size="small"  variant = "contained"color="secondary" onClick = {() => this.handle_quit_course(course.pk)}>
                      Quit
                    </Bt>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          <Grid item xs = {12}>
          <Paper  className={Paper}>
                    <React.Fragment>
                        <Typography component="h2" variant="h6" color="primary" align="left" gutterBottom>
                        Events
                        </Typography>
                        <Table size="small">
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Host</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events.map((event) => (
                            <TableRow key={event.pk}>
                                <TableCell>{event.title} </TableCell>
                                <TableCell>{event.organizer.first_name} {event.organizer.last_name}</TableCell>
                                <TableCell>{this.get_date(event.start)} {this.get_time(event.start)}</TableCell>
                                <TableCell><a target = "_blank" component = "button" variant = "body2" href = {event.link} >Link</a></TableCell>
                                <TableCell>
                                <Button align="right" color = "secondary" size = "small" onClick = {()=>this.handle_quit_event(event.pk)}>Quit</Button>
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
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
  }
}
export default CourseDemo;

CourseDemo.propTypes = {
    handle_course: PropTypes.func.isRequired
  };
