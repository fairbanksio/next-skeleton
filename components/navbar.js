import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Router from 'next/router'
import { NextAuth } from 'next-auth/client'
import Link from 'next/link'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'absolute',
    right: '95px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 180,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      photo: ''
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
      this.state.photo = props.session.user.photo
      this.state.isAdmin =  (props.session.user.admin) ? true : false
    }
  }

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleSignIn = () => {
    this.setState({ userAuthd: true, anchorEl: null });
    this.handleMobileMenuClose();
    Router.push('/signin')
  };

  handleGoToDashboard = () => {
    this.handleMobileMenuClose();
    Router.push('/dashboard')
  };

  handleGoToAdmin = () => {
    this.handleMobileMenuClose();
    Router.push('/admin')
  };

  handleGoToAccount = () => {
    this.handleMobileMenuClose();
    Router.push('/account')
  };

  handleSignOut = async () => {


    const formData = {
      _csrf: await NextAuth.csrfToken(),
    }
    console.log(formData)
    // URL encode form
    // Note: This uses a x-www-form-urlencoded rather than sending JSON so that
    // the form also in browsers without JavaScript
    const encodedForm = Object.keys(formData).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key])
    }).join('&')

    fetch('/auth/signout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedForm
    })
    .then(async res => {
      if (res.status === 200) {
        // Force update session so that changes to name or email are reflected
        // immediately in the navbar (as we pass our session to it).
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
          isSignedIn:  false,
          anchorEl: null
        })

        Router.push('/')

      } else {
        this.setState({
          session: await NextAuth.init({force: true}), // Update session data
          alertText: 'Failed to signout',
          alertStyle: 'alert-danger',
        })
        Router.push('/account')
      }
    })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, userAuthd } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {this.state.isSignedIn == true
          ? <div>
              <MenuItem onClick={this.handleGoToDashboard}>Dashboard</MenuItem>
              {this.state.isAdmin == true
                ? <MenuItem onClick={this.handleGoToAdmin}>Admin</MenuItem>
                : null
              }
              <MenuItem onClick={this.handleGoToAccount}>Account</MenuItem>
              <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
            </div>
          : null
        }
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge className={classes.margin} badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            {this.state.isSignedIn == true
              ? <AccountCircle />
              : <Button onClick={this.handleSignIn} style={{ color: '#FFF', borderColor: '#FFF' }} variant="outlined" color="primary" size="small" className={classes.button}>Sign In</Button>
            }
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              <a style={{ textDecoration: 'none', color: 'white' }} href='/'>
                <i style={{ paddingRight: '10px' }} className="fab fa-react"/>
                Next-Skeleton
              </a>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {this.state.isSignedIn == true
                ? <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                : <Button onClick={this.handleSignIn} style={{ color: '#FFF', borderColor: '#FFF' }} variant="outlined" color="primary" size="small" className={classes.button}>Sign In</Button>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
