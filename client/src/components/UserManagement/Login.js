import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import axios from 'axios';

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        height: '100vh',
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
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },

});


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login_email: localStorage.getItem("user_id")
        }
    }

    getPostInfo = async () => {
        const url = '/api/qualification';
        let params = {
            user_id: localStorage.getItem('user_id')
        }

        const response = await axios.get(url, { params });
        var body = response.data[0].Item;
        
        if (body === undefined) {
            alert("환영합니다! 개인 정보를 먼저 입력한 후 이용해주세요!");
            window.location.href = "/#/signUp";
        }
        else {
            localStorage.setItem("qualification", body.qualification);
            window.location.href = "/#/editorPost/followEditorPost";
        }
    }

    responseGoogle = (response) => {
        localStorage.setItem("user_id", response.profileObj.email);
        console.log(localStorage.getItem("user_id"));

        this.getPostInfo();
    }



    render() {
        const { classes } = this.props;

        if (this.state.login_email !== null) {
            alert("잘못된 접근입니다.");
            window.location.href = "/#/editorPost/followEditorPost";
        }
        return (
            <div>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            YE-Connector
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            YE Connector에 오신 것을 환영합니다.<br/>
                            저희는 유튜버와 편집자 모두에게 보다 넓은 구인-구직의 기회를 드리는 사이트입니다.<br/>
                            처음 오신 분께서는 구글 계정으로 로그인하시고 공통 정보를 입력해주시기 바랍니다.<br/>
                            유튜버나 편집자께서는 마이 페이지에서 추가적인 정보를 작성하여 본인을 명확하게 표시해주시기 바랍니다.<br/>
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <GoogleLogin
                                    clientId="496679002793-62hpbnq8hrl68krd671usqjhfkcq0glm.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                        </div>
                    </Container>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Login);