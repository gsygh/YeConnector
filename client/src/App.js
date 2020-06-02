import React, { Component } from 'react';
import './App.css';
import Footer from './components/main/Footer';
// import Context from './components/main/Context';
import Context from './containers/main/Context';
import { withStyles } from '@material-ui/styles';
import {withRouter} from 'react-router-dom';


const styles = theme => ({
  root: {
    width: '100%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    minWidth: 1080,
    margin: 10
    
  },

  edit: {
    
  }

});

class App extends Component {

  // componentDidMount() {
  //   this.initializeUserInfo();
  // }

  

  render() {
    const classes = this.props;
    return (
      <div className={classes.root}>
        {/* <EditorPost/> */}
        <Context history = {this.props}/>
        <Footer />
      </div>

    );
  }

}

export default withRouter(withStyles(styles)(App));
