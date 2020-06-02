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
import Divider from '@material-ui/core/Divider';
import * as LoginCheck from '../UserManagement/LoginCheck';
import EditorPostUpload from './EditorPostUpload';
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
    postGrid :{
        marginTop: theme.spacing(2),
    }
});


class RecommendEditorPostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_list : [],
        }
    }

    handleClickOpen = () => {
        return 0;
    }

    // 게시물 목록을 받아오는 함수
    getPostList = () => {
        let all_user_data = this.getAllUserId();
        all_user_data.then((all_user_data) => {
            if (all_user_data == undefined) {
                return;
            } else {
                let editor_list = this.filterOutEditorId(all_user_data);
                editor_list.then((editor_list) => {
                    let editor_post_list = this.loopForGetEditorPost(editor_list);
                    editor_post_list.then((editor_post_list) => {
                        this.setState({post_list: editor_post_list});
                    });
                });
            }
        });
    }
    // 모든 사용자의 아이디를 얻어옴
    getAllUserId = async () => {
        const url = '/api/getAllOfUserId';
        

        let result = await axios.get(url);
        
        return result.data;

    }

    // 모든 사용자 중 editor를 뽑아냄
    filterOutEditorId = async (user_list) => {
        let editor_list = [];

        await this.asyncForEach(user_list, (item) => {
            if(item.qualification === "editor") {
                editor_list.push(item.user_id);
            }
        });
        return(editor_list);
    }

    // 사용자 게시물을 얻어옴
    loopForGetEditorPost = async (editor_list) => {
        const url = '/api/getUserName';
        const url2 = '/api/getEditorPostList';
        let following_editor_post_list = [];
        
        await this.asyncForEach(editor_list, async (item) => {
            let params = {
                user_id : item
            }

            let one_editor_name = this.getEditorName(url, params);
            await one_editor_name.then( async (one_editor_name) => {

                let one_editor_post_list = this.getEditorPostList(url2, params);
                await one_editor_post_list.then((one_editor_post_list) => {
                    one_editor_post_list.forEach(item2 => {
                        item2.user_name = one_editor_name[0].Items[0].user_name;
                        following_editor_post_list.push(item2);
                    });
                });
            });
        });

        return following_editor_post_list;
    }

    // editor의 영상 목록을 가져오는 함수
    getEditorPostList = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
        
    }

    // 사용자의 name을 가지고 오는 함수
    getEditorName = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
        
    }

    stateRefresh = () => {
        this.getPostList();
    }

    componentDidMount() {
        // this.getPostInfo().then(res => console.log(res))
        // .catch(err => console.log(err));
        let promiseResult = LoginCheck.loginCheck();
        let result = '';

        promiseResult.then((promiseResult) => {
            if (promiseResult === true) {
                this.getPostList();
            }

        })
        console.log(result);
    }

    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            추천 영상
                        </Typography>
                    </Box>

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

export default withStyles(styles)(RecommendEditorPostList);