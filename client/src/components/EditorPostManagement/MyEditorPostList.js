import React, { Component } from 'react';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import EditorPostUpload from './EditorPostUpload';
import Divider from '@material-ui/core/Divider';
import * as LoginCheck from '../UserManagement/LoginCheck';
import Box from '@material-ui/core/Box';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, useParams } from 'react-router-dom';

import axios from 'axios';

const styles = theme => ({
    root: {
        maxWidth: 400,
        marginTop: theme.spacing(3)
    },
    media: {
        height: 215,
    },
    pageTitle: {
        marginTop: theme.spacing(2),
    },
    uploadButton: {
        marginTop: theme.spacing(2),
    },
    postGrid: {
        marginTop: theme.spacing(2),
    }
});

class MyEditorPostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_list : [],
            //user_name: '',
        }
    }

    handleClickOpen = () => {
        return 0;
    }

    getPostList = async () => {
        const url = '/api/myEditorPostList';
        let params = {
          user_id : localStorage.getItem('user_id')
        }
        
        const response = await axios.get(url, {params});
        console.log(response);
        
        this.setState({ 
            post_list: response.data,
            //user_name: response.data.user_name
        });
        
        
    }

    stateRefresh = () => {
        this.getPostList();
    }

    componentDidMount() {
        // this.getPostInfo().then(res => console.log(res))
        // .catch(err => console.log(err));
        let promiseResult = LoginCheck.loginCheck();

        promiseResult.then((promiseResult) => {
            if (promiseResult === true) {
                this.getPostList();
            }

        })
    }


    render() {
        const { classes } = this.props;
        

        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            나의 영상
                        </Typography>
                    </Box>

                    {/* 등록 컴포넌트 */}
                    {localStorage.getItem("qualification") === "editor"
                        ? <Box p={1} >
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <EditorPostUpload className={classes.uploadButton} stateRefresh={this.stateRefresh} />
                            </Typography>
                        </Box>
                        : null
                    }

                </Box>
                

                <Divider />
                <Grid className={classes.postGrid}
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.state.post_list.map(elem => (
                        <Grid item xs={12} sm={6} md={3} key={this.state.post_list.indexOf(elem)}>
                            <Card>
                                {/* <NavLink to={"/editorPost/" + elem.id} style={{ textDecoration: 'none' }}> */}
                                <NavLink to={{
                                    pathname: "/editorPost/" + elem.post_id,
                                    state: { editor_post_id: elem.post_id }
                                }}
                                    style={{ textDecoration: 'none' }}>
                                    <CardActionArea >
                                        <CardMedia
                                            // title={`quarter : ${elem.quarter}`}
                                            // subheader={`earnings : ${elem.earnings}`}
                                            className={classes.media}
                                            image={elem.youtube_post_thumbnail_url}

                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }}>
                                                {elem.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" style={{ textDecoration: 'none' }}>
                                                {elem.user_name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </NavLink>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(MyEditorPostList);