import Link from 'next/link'
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../components/appLayout'
import Page from '../components/page'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 750,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  contentGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit,
    position: 'absolute',
    width: '100vw',
    bottom: '0px',
  },
});

class Landing extends Page {
  static async getInitialProps ({ req, query: { id } }) {
    let props = await super.getInitialProps({req})
    props.id = id
    return props
  }

  constructor(props) {
    super(props)
  }

  render(){
    const { classes } = this.props;
    return (
      <Layout {...this.props}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                <i style={{ paddingRight: '10px' }} className="fab fa-react"/>
                Next-Skeleton
              </Typography>
              <Typography variant="title" align="center" color="textSecondary" paragraph>
                A simple framework to help get you started with your Server-side Next.js app.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <a style={{ textDecoration: 'none' }} href='https://github.com/Fairbanks-io/next-skeleton' target='_blank' rel='noopener noreferrer'>
                      <Button variant="contained" color="primary">
                        <i style={{ paddingRight: '10px' }} className="fab fa-github"/>
                        View on GitHub
                      </Button>
                    </a>
                  </Grid>
                  <Grid item>
                    <a style={{ textDecoration: 'none' }} href='https://nextjs.org/learn/' target='_blank' rel='noopener noreferrer'>
                      <Button variant="outlined" color="primary">
                        Learning Next.js
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.contentGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              <Grid item sm={6} md={4} lg={4}>
                <h3>Server-Side Rendered Pages</h3>
                <List component="nav">
                  <ListItem button component="a" href="/page/first">
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Sample Page 1" />
                  </ListItem>
                  <ListItem button component="a" href="/page/second">
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Sample Page 2" />
                  </ListItem>
                  <ListItem button component="a" href="/page/third">
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Sample Page 3" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item sm={6} md={4} lg={4}>
                <h3>Included Features</h3>
                <List component="nav">
                  <ListItem button component="a" href="https://material-ui.com/" target='_blank' rel='noopener noreferrer'>
                    <i className="fab fa-2x fa-uikit"></i>
                    <ListItemText primary="Material UI" />
                  </ListItem>
                  <ListItem button component="a" href="https://fontawesome.com/icons" target='_blank' rel='noopener noreferrer'>
                    <i className="fab fa-2x fa-font-awesome-alt"></i>
                    <ListItemText primary="FontAwesome 5" />
                  </ListItem>
                  <ListItem button component="a" href="https://github.com/iaincollins/next-auth" target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-2x fa-user-lock"></i>
                    <ListItemText primary="OAuth Integrated" />
                  </ListItem>
                  <ListItem button component="a" href="https://mongoosejs.com/" target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-2x fa-stream"></i>
                    <ListItemText primary="MongoDB Modeling via Mongoose" />
                  </ListItem>
                  <ListItem button component="a" href="https://mongoosejs.com/" target='_blank' rel='noopener noreferrer'>
                    <i className="far fa-2x fa-file-code"></i>
                    <ListItemText primary="Winston Logging" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item sm={6} md={4} lg={4}>
                <h3>Links and Documentation</h3>
                <List component="nav">
                  <ListItem button component="a" href="https://nextjs.org/docs#setup" target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Next.js Setup" />
                  </ListItem>
                  <ListItem button component="a" href="https://nextjs.org/docs#custom-app" target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Using a Custom _App" />
                  </ListItem>
                  <ListItem button component="a" href="https://nextjs.org/docs#custom-document" target='_blank' rel='noopener noreferrer'>
                    <i className="fas fa-xs fa-minus"></i>
                    <ListItemText primary="Using a Custom _Document" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="title" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subheading" align="center" color="textSecondary" component="p">
            Copyright &copy; Next-Skeleton {(new Date()).getFullYear()}
          </Typography>
        </footer>
        {/* End footer */}
      </Layout>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
