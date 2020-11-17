import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
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
  heroContent: { 
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
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
        console.log(this.state.courses)
      })
      .catch(error => {
        console.log("ERROR: " + error)
      });

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
 
render() {
  const classes = useStyles;
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
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Dashboard
            </Typography>
            {/* <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography> */}
            {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
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
                    <Button size="small" color="primary" onClick = {(e) => this.props.handle_course(e,course)}>
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          <Grid item xs = {12}>
          <Paper className={Paper} >
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
                                <TableCell>{event.start}</TableCell>
                                <TableCell><a target = "_blank" component = "button" variant = "body2" href = {event.link} >Link</a></TableCell>
                                <TableCell>
                                <Button align="right" class="btn btn-xs">Join</Button>
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
