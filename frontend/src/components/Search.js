import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SchoolIcon from '@material-ui/icons/School';
import PropTypes from 'prop-types';

const drawerWidth = 240;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
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

function createData(id, Number, Name, Joinstatus) {
    return { id, Number, Name , Joinstatus};
  }

const rows = [
    createData(0, 'CS506', 'Introduction to Software Engineering', 'Joined'),
    createData(2, 'CS537', 'Introduction to Operating Systems',  'Joined'),
    createData(3, 'CS540', 'Introduction to Artificial Intelligence',  'Joined'),
    
  ];

  class SearchCourse extends React.Component{

    render(){
        const classes = useStyles;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    

        return (
            <div className={classes.root}>
            <CssBaseline />
           
            <Grid container spacing={3}>
                <Grid item item xs={12} md={12} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <React.Fragment>
                            <Typography component="h2" variant="h6" color="primary" align="left" gutterBottom>
                            Search Result
                            </Typography>
                            <Table size="small">
                                <TableBody>
                                    {rows.map((row) => (
                                    <TableRow key={row.Name}>
                                        <TableCell>
                                            <SchoolIcon style={{ fontSize: 25}}>Course</SchoolIcon>
                                            {row.Number}: {row.Name}
                              
                                        </TableCell>
                                        {/* <TableCell>
                                          {row.Name}
                                        </TableCell> */}
                                        <TableCell align = "right">
                                        <Button class="btn btn-xs">See Page</Button>
                                        </TableCell>
            
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                    </React.Fragment>
                </Paper>
            </Grid>
            
          </Grid>

            <footer className={classes.footer}>
                <Container maxWidth="sm">
                <Typography variant="body1">My sticky footer can be found here.</Typography>
                <Copyright />
                </Container>
            
            </footer>
            </div>

         
        );
    }
}

export default withStyles(useStyles)(SearchCourse);

// SearchCourse.propTypes = {
//   display_form: PropTypes.func.isRequired,
// };