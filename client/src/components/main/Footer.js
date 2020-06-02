import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({

});

class Footer extends Component {

    render() {
        const classes = styles();
        return (
            <Typography variant="body2" color="textSecondary" align="center" className={'footer_navigation'}>
                <br/>
                {'Copyright © '}
                {/* <Link color="inherit" href="https://material-ui.com/">
                    
                </Link>{' '} */}
                YE-Connector <br/>
                e-mail : gsygh@naver.com<br/>
                {new Date().getFullYear()}
                {'.'}
            </Typography>

        );
    }
} export default withStyles(styles)(Footer);

