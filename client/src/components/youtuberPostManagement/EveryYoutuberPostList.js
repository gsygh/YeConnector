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
import YoutuberPostList from './YoutuberPostList';


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

class EveryYoutuberPostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post_list: [],
            //user_name: '',
        }
    }

    getPostList = () => {
        let all_user_data = this.getAllUserId();
        all_user_data.then((all_user_data) => {
            if (all_user_data == undefined) {
                return;
            } else {
                let youtuber_list = this.filterOutYoutuberId(all_user_data);
                youtuber_list.then((youtuber_list) => {
                    let youtuber_post_list = this.loopForGetYoutuberPost(youtuber_list);
                    youtuber_post_list.then((youtuber_post_list) => {
                        let filtered_youtuber_post_list = this.filterOutOpen(youtuber_post_list);
                        filtered_youtuber_post_list.then((filtered_youtuber_post_list) => {
                            this.setState({post_list: filtered_youtuber_post_list});
                            console.log(this.state);
                        })
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

    // 모든 사용자 중 youtuber를 뽑아냄
    filterOutYoutuberId = async (user_list) => {
        let youtuber_list = [];

        await this.asyncForEach(user_list, (item) => {
            if(item.qualification === "youtuber") {
                youtuber_list.push(item.user_id);
            }
        });
        
        return(youtuber_list);
    }

    // 사용자 게시물을 얻어옴
    loopForGetYoutuberPost = async (youtuber_list) => {
        const url = '/api/getUserName';
        const url2 = '/api/getYoutuberPostList';
        let following_youtuber_post_list = [];
        
        await this.asyncForEach(youtuber_list, async (item) => {
            let params = {
                user_id : item
            }

            let one_youtuber_name = this.getYoutuberName(url, params);
            await one_youtuber_name.then( async (one_youtuber_name) => {

                let one_youtuber_post_list = this.getYoutuberPostList(url2, params);
                await one_youtuber_post_list.then((one_youtuber_post_list) => {
                    one_youtuber_post_list.forEach(item2 => {
                        item2.user_name = one_youtuber_name[0].Items[0].user_name;
                        following_youtuber_post_list.push(item2);
                    });
                });
            });
        });

        return following_youtuber_post_list;
    }

    // youtuber의 영상 목록을 가져오는 함수
    getYoutuberPostList = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
    }
    
    // 사용자의 name을 가지고 오는 함수
    getYoutuberName = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
        
    }

    filterOutOpen = async (youtuber_post_list) => {
        let filtered_youtuber_post_list = [];

        await this.asyncForEach(youtuber_post_list, (item) => {
            if(item.is_open === "true") {
                filtered_youtuber_post_list.push(item);
            }
        });
        
        return(filtered_youtuber_post_list);
    }

    stateRefresh = () => {
        this.getPostList();
    }

    componentDidMount() {
        let promiseResult = LoginCheck.loginCheck();

        promiseResult.then((promiseResult) => {
            if (promiseResult === true) {
                this.getPostList();
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
        const workPeriodSelectList = [
            { name: "무관", value: "all_period" },
            { name: "단기", value: "short_period" },
            { name: "장기", value: "long_period" },
        ];
        const workPeriodList = [
            { name: "1건 (단기)", value: "short" },
            { name: "1달 미만", value: "under_a_month" },
            { name: "1달 이상", value: "more_than_a_month" },
            { name: "6개월 이상", value: "more_than_six_month" },
            { name: "1년 이상", value: "more_than_a_year" },
        ];
        const categoryList = [
            { name: "전체", value: "all"},
            { name: "영화/애니메이션", value: "movie/animation" },
            { name: "자동차/교통", value: "car/traffic" },
            { name: "음악", value: "music" },
            { name: "애완동물/동물", value: "animal" },
            { name: "스포츠", value: "sports" },
            { name: "여행/이벤트", value: "travel/event" },
            { name: "게임", value: "game" },
            { name: "인물/블로그", value: "character/blog" },
            { name: "코미디", value: "comedy" },
            { name: "엔터테인먼트", value: "entertainment" },
            { name: "뉴스/정치", value: "news/politics" },
            { name: "노하우/스타일", value: "knowhow/style" },
            { name: "교육", value: "education" },
            { name: "과학 기술", value: "science_technology" },
            { name: "비영리/사회운동", value: "nonprofit/social_movement" },

        ];
        const sortList = [
            { name: "최신 순", value: "recently" },
            { name: "조회수 순", value: "view_count" },
            { name: "근무 기간 순", value: "work_period" },
        ];
        const currentStateList = [
            { name: "전체", value: "all" },
            { name: "모집 중", value: "before_start" },
            { name: "작업 중", value: "working" },
            { name: "완료", value: "complete" },
        ];
        const cellList = ["작성자", "제목", "근무 기간", "등록일"];
        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            모든 유튜버의 구인 게시물
                        </Typography>
                    </Box>
                    <Box p={1} ml={3}>
                        <FormControl className={classes.formControl} >

                            <InputLabel id="demo-simple-select-label1">근무 기간</InputLabel>
                            <Select defaultValue={workPeriodSelectList[0].value}
                                labelId="category-select-label1"
                                id="work_period"
                                value={this.state.workPeriodSelectList}
                                name="work_period"
                                //onChange={this.handleValueChange}

                            >
                                {workPeriodSelectList.map(elem => (
                                    <MenuItem key={workPeriodSelectList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box p={1} ml={3}>
                        <FormControl className={classes.formControl} >

                            <InputLabel id="demo-simple-select-label1">카테고리</InputLabel>
                            <Select defaultValue={categoryList[0].value}
                                labelId="category-select-label1"
                                id="category"
                                value={this.categoryList}
                                name="category"
                                // onChange={this.handleValueChange}

                            >
                                {categoryList.map(elem => (
                                    <MenuItem key={categoryList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box p={1} ml={3}>
                        <FormControl className={classes.formControl} >

                            <InputLabel id="demo-simple-select-label1">구인 상태</InputLabel>
                            <Select defaultValue={currentStateList[0].value}
                                labelId="category-select-label1"
                                id="current_state"
                                value={this.state.current_state}
                                name="current_state"
                                // onChange={this.handleValueChange}

                            >
                                {currentStateList.map(elem => (
                                    <MenuItem key={currentStateList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box p={1} ml={3} >
                    <FormControl className={classes.formControl} >

                            <InputLabel id="demo-simple-select-label1">정렬</InputLabel>
                            <Select defaultValue={sortList[0].value}
                                labelId="category-select-label1"
                                id="sort"
                                value={this.sortList}
                                name="sort"
                            // onChange={this.handleValueChange}

                            >
                                {sortList.map(elem => (
                                    <MenuItem key={sortList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    {/* 등록 컴포넌트 */}
                    {localStorage.getItem("qualification") === "youtuber"
                        ? <Box p={1} ml={23} mr={5}>
                            <NavLink exact to="/youtuberPost/youtuberPostUpload" style={{ textDecoration: 'none' }} >
                                <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                    <Button variant="contained" color="primary">공고 등록</Button>
                                </Typography>
                            </NavLink>
                        </Box>
                        : null
                    }

                </Box>


                <Divider />

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c => {
                                    return <TableCell>{c}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.post_list.map((c) => {
                                return (
                                    <YoutuberPostList
                                        post_id={c.post_id}
                                        post_user_name={c.user_name}
                                        title={c.title}
                                        name={c.name}
                                        work_period={c.work_period}
                                        upload_date={c.upload_date}
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                {/* <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h7" component="h7" >
                            작성자
                        </Typography>
                    </Box>
                    <Box p={1} flexGrow={5} >
                        <Typography gutterBottom variant="h7" component="h7" >
                            모집 제목
                        </Typography>
                    </Box>
                    <Box p={1} >
                        <Typography gutterBottom variant="h7" component="h7" >
                            경력
                        </Typography>
                    </Box>
                    <Box p={1} ml={10}>
                        <Typography gutterBottom variant="h7" component="h7" >
                            등록일
                        </Typography>
                    </Box>
                    <Box p={1} ml={10} mr={3}>
                        <Typography gutterBottom variant="h7" component="h7" >
                            근무 기간
                        </Typography>
                    </Box>
                </Box> */}
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(EveryYoutuberPostList);