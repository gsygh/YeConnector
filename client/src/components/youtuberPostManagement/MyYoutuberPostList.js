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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class MyYoutuberPostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post_list: [],
            //user_name: '',
        }
    }

    handleClickOpen = () => {
        return 0;
    }
    render() {
        const { classes } = this.props;
        const workPeriodList = [
            { name: "단기", value: "short_period" },
            { name: "장기", value: "long_period" },
            { name: "무관", value: "all_period" },
        ];
        const categoryList = [
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
        ]
        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                            나의 구인 게시물
                        </Typography>
                    </Box>
                    <Box p={1} ml={3}>
                        <FormControl className={classes.formControl} >

                            <InputLabel id="demo-simple-select-label1">근무 기간</InputLabel>
                            <Select defaultValue={workPeriodList[0].value}
                                labelId="category-select-label1"
                                id="work_period"
                                value={this.workPeriodList}
                                name="work_period"
                                //onChange={this.handleValueChange}

                            >
                                {workPeriodList.map(elem => (
                                    <MenuItem key={workPeriodList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
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
                <Box display="flex" p={1}>
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
                </Box>
                <Divider />
            </div>
        );
    }
}

export default withStyles(styles)(MyYoutuberPostList);
