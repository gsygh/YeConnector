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
    pageTitle : {
        
        marginTop: theme.spacing(2),
    },
    uploadButton: {
        marginTop: theme.spacing(2),
    },
    postGrid :{
        marginTop: theme.spacing(2),
    }
});


class FollowEditorPostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_list : [],
        }
    }

    handleClickOpen = () => {
        return 0;
    }

    componentDidMount() {
        // this.getPostInfo().then(res => console.log(res))
        // .catch(err => console.log(err));
        let promiseResult = LoginCheck.loginCheck();
        

        promiseResult.then((promiseResult) => {
            if (promiseResult === true) {
                this.getPostList();
            }
            
        });
    }

    // 게시물 리스트를 받아오는 함수
    getPostList = () => {
        let following_list = this.getFollowingList();
        following_list.then((following_list) => {
            if (following_list == undefined) {
                return;
            } else {
                let following_editor_list = this.loopForFilterOutEditor(following_list);
                following_editor_list.then((following_editor_list) => {
                    let post_list = this.loopForGetEditerNameList(following_editor_list);
                    post_list.then((post_list) => {
                        this.setState({post_list: post_list});
                    });
                });
            }
        });
    }


    // 현재 사용자의 팔로잉 리스트를 가져오는 함수
    getFollowingList = async () => {
        const url = '/api/getFollowingList';
        let params = {
          user_id : localStorage.getItem('user_id')
        }

        const response = await axios.get(url, {params});
        console.log(response.data[0].Items[0].following_list);
        return response.data[0].Items[0].following_list;
    }

    // editor 판별 함수를 반복 실행하기 위한 함수
    loopForFilterOutEditor = async (following_list) => {
        const url = '/api/getQualification';
        let editor_list = [];
        console.log("filter:" + following_list);
        
        await this.asyncForEach(following_list, async (item) => {
            let params = {
                user_id : item
            }

            let editor_boolean = this.filterOutEditor(url, params);
            await editor_boolean.then((editor_boolean) => {
                
                // 에디터라면
                if (editor_boolean == true) {
                    editor_list.push(item);
                }
            });
        });
        return editor_list;
    }

    // editor를 판별하는 함수
    filterOutEditor = async (url, params) => {
        const response = await axios.get(url, {params});

        if(response.data[0].Items[0].qualification === "editor") {
            return true;
        }
        else {
            return false;
        }
    }

    // 사용자의 name을 가지고 오는 함수를 반복적으로 돌리는 함수
    loopForGetEditerNameList = async (following_editor_list) => {
        const url = '/api/getUserName';
        const url2 = '/api/getEditorPostList';
        let following_editor_post_list = [];
        
        await this.asyncForEach(following_editor_list, async (item) => {
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
                        console.log(following_editor_post_list);
                    });
                });
            });
        });
        
        return following_editor_post_list;
    }

    // 사용자의 name을 가지고 오는 함수
    getEditorName = async (url, params) => {
        const response = await axios.get(url, {params});
        console.log(response.data);
        return response.data;
        
    }


    // editor의 영상 목록을 가져오는 함수를 반복적으로 돌리는 함수
    // loopForGetEditorPostList = async (following_editor_list) => {
    //     const url = '/api/getFollowingEditorPostList';
    //     let following_editor_post_list = [];
        
    //     await this.asyncForEach(following_editor_list, async (item) => {
    //         let params = {
    //             user_id : item
    //         }

    //         let one_editor_post_list = this.getEditorPostList(url, params);
    //         await one_editor_post_list.then((one_editor_post_list) => {
    //             one_editor_post_list.forEach(item2 => {
    //                 following_editor_post_list.push(item2);
    //                 console.log(following_editor_post_list);
    //             });
    //         });
    //     });

    //     return following_editor_post_list;
    // }


    // // editor의 영상 목록을 가져오는 함수를 반복적으로 돌리는 함수 (foreach 버전)
    // loopForGetEditorPostList = async (following_editor_list) => {
    //     const url = '/api/getFollowingEditorPostList';
    //     console.log("getList: " + following_editor_list);
    //     console.log(following_editor_list);
        
    //     let following_editor_post_list = [];

    //     following_editor_list.forEach(function (item) {
    //         console.log("ssd");
            
    //         let params = {
    //             user_id : item
    //         }
    //         // 한 사용자의 결과 값을 받아옴
    //         let one_editor_post_list = this.getEditorPostList(url, params);
    //         one_editor_post_list.then((one_editor_post_list) => {
    //             // 배열에 값을 저장해준다.
    //             // if (editor_boolean == true) {
    //             //     editor_list.push(item);
    //             //     console.log(editor_list);
                    
    //             // }
    //             console.log(one_editor_post_list);
                
    //         });
    //     }.bind(this));
        
    //     return following_editor_post_list;
    // }

    // editor의 영상 목록을 가져오는 함수
    getEditorPostList = async (url, params) => {
        const response = await axios.get(url, {params});
        console.log(response.data);
        return response.data;
        
    }

    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    

    stateRefresh = () => {
        this.getPostList();
    }

    
    render() {
        const { classes } = this.props;


        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            팔로우한 사용자 영상
                        </Typography>
                    </Box>

                    {/* 수정 컴포넌트 */}
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
                                        image= {elem.youtube_post_thumbnail_url}
                                        
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
                    /* <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                        
                        <Card className={classes.root}>
                            <NavLink to="/editorPost/followEditorPost/1" style={{ textDecoration: 'none' }}>
                                <CardActionArea >
                                    <CardMedia
                                        className={classes.media}
                                        image={result}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }}>
                                            심심풀이로 만든 영상
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{ textDecoration: 'none' }}>
                                            해당 영상은 ?? 유튜버님의 유튜브에 있는 제가 편집한 영상입니다.
                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </NavLink>

                        </Card>
                    
                    <Card className={classes.root}>
                        <NavLink to="/editorPost/recommendEditorPost/2" style={{ textDecoration: 'none' }}>
                            <CardActionArea >
                                <CardMedia
                                    className={classes.media}
                                    image={result}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }}>
                                        심심풀이로 만든 영상
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{ textDecoration: 'none' }}>
                                        해당 영상은 ?? 유튜버님의 유튜브에 있는 제가 편집한 영상입니다.
                        </Typography>
                                </CardContent>
                            </CardActionArea>
                        </NavLink>
                    </Card>
                    </Grid> */
        );
    }
}

export default withStyles(styles)(FollowEditorPostList);