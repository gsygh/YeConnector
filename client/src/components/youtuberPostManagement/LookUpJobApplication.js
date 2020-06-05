import React, { Component } from 'react';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import * as LoginCheck from '../UserManagement/LoginCheck';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Table';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, useParams } from 'react-router-dom';

import axios from 'axios';
import JobApplicationList from './JobApplicationList';


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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class LookUpJobApplication extends Component {
    constructor(props) {
        super(props);

        var init_youtuber_post_id = '';
        console.log(this.props.location.pathname);
        var pathname_youtuber_post_id = ((String)(this.props.location.pathname)).split('/');
        console.log(pathname_youtuber_post_id[3]);

        init_youtuber_post_id = pathname_youtuber_post_id[3];

        this.state = {
            youtuber_post_id: init_youtuber_post_id,
            application_list: [],
            //user_name: '',
        }
    }

    getApplicationList = () => {
        let all_application_list = this.getAllApplication();
        all_application_list.then((all_application_list) => {
            if (all_application_list == undefined) {
                return;
            } else {
                let user_data_list = this.loopForGetUsername(all_application_list);
                user_data_list.then((user_data_list) => {
                    // 프로필 만든 후 장 단기 개수 얻어오기

                    // let youtuber_post_list = this.loopForGetYoutuberPost(youtuber_list);
                    // youtuber_post_list.then((youtuber_post_list) => {
                    //     let filtered_youtuber_post_list = this.filterOutOpen(youtuber_post_list);
                    //     filtered_youtuber_post_list.then((filtered_youtuber_post_list) => {
                    //         this.setState({post_list: filtered_youtuber_post_list});
                    //         console.log(this.state);
                    //     })
                    // });
                    this.setState({application_list: user_data_list});
                    //console.log(this.state.application_list[0][0]);
                    
                });
            }
        });
    }

    // 해당 게시물의 모든 구직 요청을 조회함
    getAllApplication = async () => {
        const url = '/api/getAllApplication';
        
        let params = {
            youtuber_post_id : this.state.youtuber_post_id
        }

        let response = await axios.get(url, { params });
        var body = response.data;
        console.log(body);
        
        return body;

    }

    // 각 구직 요청 별로 신청자의 데이터를 받아와서 id, 이름으로 포장
    loopForGetUsername = async (application_list) => {
        const url = '/api/getUserName';
        let user_data_list = [];
        let user_data = [];
        let count = 0;
        
        await this.asyncForEach(application_list, async (item) => {
            console.log(item.editor_id);
            user_data.editor_id = item.editor_id;
            
            let params = {
                user_id : item.editor_id
            }

            let one_editor_name = this.getEditorName(url, params);
            await one_editor_name.then( async (one_editor_name) => {
                user_data.editor_name = one_editor_name[0].Items[0].user_name;                

                // let one_youtuber_post_list = this.getYoutuberPostList(url2, params);
                // await one_youtuber_post_list.then((one_youtuber_post_list) => {
                //     one_youtuber_post_list.forEach(item2 => {
                //         item2.user_name = one_youtuber_name[0].Items[0].user_name;
                //         following_youtuber_post_list.push(item2);
                //     });
                // });
            });
            user_data_list.push(user_data);
            user_data = [];
        });
        
        return user_data_list;
    }

    // youtuber의 영상 목록을 가져오는 함수
    getYoutuberPostList = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
    }
    
    // 사용자의 name을 가지고 오는 함수
    getEditorName = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
        
    }

    stateRefresh = () => {
        this.getApplicationList();
    }

    componentDidMount() {
        let promiseResult = LoginCheck.loginCheck();

        promiseResult.then((promiseResult) => {
            if (promiseResult === true) {
                this.getApplicationList();
            }

        })
    }

    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    render() {
        const { classes } = this.props;

        const cellList = ["신청자", "단기 근무 경력", "장기 근무 경력", "승인/거절"];
        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            해당 게시물에 대한 구직 신청 목록
                        </Typography>
                    </Box>
                </Box>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c => {
                                    return <TableCell>
                                        <Typography gutterBottom variant="6" component="h3" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                            {c}
                                        </Typography>
                                    </TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.application_list.map((c) => {
                               return (
                                    <JobApplicationList
                                        editor_id={c.editor_id}
                                        editor_name={c.editor_name}
                                        short_period_contract_cnt={c.short_period_contract_cnt}
                                        long_period_contract_cnt={c.long_period_contract_cnt}
                                        // 프로필 추가한 후 단기 장기 넣기
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(LookUpJobApplication);