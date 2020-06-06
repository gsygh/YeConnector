import React, { Component } from 'react';
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

import * as LoginCheck from '../UserManagement/LoginCheck';
import Follow from '../UserManagement/Follow';
import EditorProfileContent from './EditorProfileContent';
import YoutuberProfileContent from './YoutuberProfileContent'

const styles = (theme) => ({
    hidden: {
        display: "none",
    },
    root: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
        height: "100vh",
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        height: "100vh",
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        minHeight: 300,
    },
    form: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    fixedHeightPaper: {
        height: 240,
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
});

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


class YoutuberPost extends Component {
    constructor(props) {
        super(props);

        var init_youtuber_post_id = '';
        console.log(this.props.location.pathname);
        var pathname_youtuber_post_id = ((String)(this.props.location.pathname)).split('/');
        init_youtuber_post_id = pathname_youtuber_post_id[3];

        this.state = {
            user_id: init_youtuber_post_id,
            user_name: '',
            user_gender: '',
            user_age: '',
            user_phone_number: '',
            preffered_category: [],
            following_list: [],
            user_profile_url: '',
            user_qualification: '',

            category_kor: [],
            user_gender_kor : '',
            follow_exist: true,
        };
    }

    stateRefresh = () => {
        this.getUserInfo();
        this.getUserQualification();
    }

    componentDidMount() {
        let promiseResult = LoginCheck.loginCheck();
    
        promiseResult.then((promiseResult) => {
          if(promiseResult === true) {
            this.getUserInfo();
            this.getUserQualification();
          }
        });
        
    }

    
    getUserInfo = async () => {
        const url = '/api/getCommonUserInfo';
        var category_kor_list = [];
        let params = {
          user_id : this.state.user_id
        }
        
        const response = await axios.get(url, {params});
        
        var body = response.data;
        if (body !== undefined) {
            this.setState({
                user_id: body.user_id,
                user_name: body.user_name,
                user_gender: body.user_gender,
                user_age: body.user_age,
                user_phone_number: body.user_phone_number,
                preffered_category: body.preffered_category,
                following_list: body.following_list,
                user_profile_url: body.user_profile_url,

            }); 
            console.log(this.state);
            

            for (let i = 0; i < this.state.preffered_category.length; i++) {
                for (let j = 0; j < categoryList.length; j++) {
                    if(categoryList[j].value === this.state.preffered_category[i]) {
                        category_kor_list.push(categoryList[j].name);
                        break;
                    }
                    
                }
            }
            this.setState({category_kor : category_kor_list})
            {this.state.user_gender === "man" ? this.setState({user_gender_kor : "남자"}) : this.setState({user_gender_kor : "여자"})}
            
        }

          // 팔로우 여부 체크
        this.selectFollowComponent()
            .then((response) => {
                console.log(response.data);

                if (response.data === "exist") {
                    this.setState({ follow_exist: true })
                } else {
                    this.setState({ follow_exist: false })
                }
            });
        //   // 편집자의 경우 구직 신청 여부 체크
        //   if (localStorage.getItem("qualification") === "editor") {
        //     this.selectJobApplication()
        //     .then((response) => {
        //       console.log(response.data);
              
        //       if (response.data === "exist") {
        //           this.setState({ job_application_exist: true })
        //       } else {
        //           this.setState({ job_application_exist: false })
        //       }
        //     });
        //  }
          
        //   categoryList.forEach((c) => c.value === this.state.category ? this.setState({category_kor : c.name}) : null);
        //   workFormList.forEach((c) => c.value === this.state.work_form ? this.setState({work_form_kor : c.name}) : null);
        //   workPeriodList.forEach((c) => c.value === this.state.work_period ? this.setState({work_period_kor : c.name}) : null);
          
        //   console.log(this.state);
        // } else {
        //   console.log("fail");
        //   alert("읽어오기 실패!");
        // }
    }

    // 편집자 데이터를 얻어옴
    getEditorProfile = async () => {
        const url = '/api/getEditorProfile';
        let params = {
          user_id : this.state.user_id
        }
        
        const response = await axios.get(url, {params});
        
        var body = response.data;
        if (body !== undefined) {
            this.setState({
                qualification_profile : body,
            }); 
            console.log(this.state.qualification_profile);
        }
    }

    //해당 유저의 권한을 얻어오는 함수
    getUserQualification = async () => {
        const url = '/api/qualification';
        let params = {
            user_id: this.state.user_id
        }

        const response = await axios.get(url, { params });
        var body = response.data[0].Item;
        
        this.setState({user_qualification: body.qualification});
        
    }

    // 해당 유저를 팔로우했는지 판단하는 함수
    selectFollowComponent = () => {
        const url = '/api/selectFollowComponent';
        let params = {
            user_id: localStorage.getItem("user_id"),
            the_user_id: this.state.user_id,
        }
        return axios.get(url, {params});
    }

    // 유튜버의 경우 해당 프로필에 대해 구인 요청을 했는지 판단해주는 함수
    // selectJobRequest = () => {
    //     const url = '/api/selectJobRequest';
    //     let params = {
    //         youtuber_post_id: this.state.youtuber_post_id,
    //         editor_id: localStorage.getItem("user_id"),
    //     }
    //     return axios.get(url, {params});
    // }



    render() {
        const classes = this.props;
        var current_state = '';
        var modifyUrl = "/myPage/profileModify/" + this.state.user_id;
        var lookUpJobApplicationUrl = "/youtuberPost/lookUpJobApplication/" + this.state.youtuber_post_id;
        
        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={0} mr={3}>
                    
                    <Typography gutterBottom variant="inherit" component="h1" color="textPrimary" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                        {this.state.user_name}'s 프로필
                    </Typography>
                        
                    </Box>
                    <Box p={1} flexGrow={0} mr={1}>
                        <Follow
                            user_id={this.state.user_id}
                            stateRefresh={this.stateRefresh}
                            follow_exist={this.state.follow_exist}
                        />
                    </Box>
                    { localStorage.getItem("user_id") === this.state.user_id
                    ? <Box p={1} flexGrow={0} mr={1}>
                        
                        <NavLink 
                            to={{
                                pathname : String(modifyUrl),
                                state : {
                                    user_id: this.state.user_id,
                                    user_name: this.state.user_name,
                                    user_gender: this.state.user_gender,
                                    user_age: this.state.user_age,
                                    user_phone_number: this.state.user_phone_number,
                                    preffered_category: this.state.preffered_category,
                                    following_list: this.state.following_list,
                                    user_profile_url: this.state.user_profile_url,
                                    qualification_profile: localStorage.getItem("user_data")
                                }
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <Button variant="contained" color="primary">개인 정보 변경</Button>
                            </Typography>
                        </NavLink>
                    </Box>
                    : null}
                    { localStorage.getItem("qualification") === "youtuber" && this.state.user_qualification === "editor"
                    ? <Box p={1} flexGrow={0} mr={1}>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <Button variant="contained" color="primary">구인 요청</Button>
                            </Typography>
                    </Box>
                    : null}
                </Box>
                { this.state.user_qualification === "editor"
                    ? <EditorProfileContent editor_state={this.state}/>
                    : null}
                
                { this.state.user_qualification === "youtuber"
                    ? <YoutuberProfileContent youtuber_state={this.state}/>
                    
                    : null}
                { this.state.user_qualification === "normal"
                    ? null
                    : null}
            </div>
        );
    }
}

export default withStyles(styles)(YoutuberPost);