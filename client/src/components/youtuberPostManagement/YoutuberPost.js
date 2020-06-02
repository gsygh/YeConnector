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
import YoutuberPostDelete from './YoutuberPostDelete';
import JobApplication from './JobApplication';
import JobApplicationCancel from './JobApplicationCancel';

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
const workFormList = [
    { name: "출퇴근", value: "office" },
    { name: "재택 근무", value: "telecommuting" },
];
const workPeriodList = [
    { name: "1건 (단기)", value: "short" },
    { name: "1달 미만", value: "under_a_month" },
    { name: "1달 이상", value: "more_than_a_month" },
    { name: "6개월 이상", value: "more_than_six_month" },
    { name: "1년 이상", value: "more_than_a_year" },
];


class YoutuberPost extends Component {
    constructor(props) {
        super(props);
        
        // 현재 페이지의 게시물 id를 얻는 코드 (함수 사용 불가로 인해 코드로 기재)
        var init_youtuber_post_id = '';
        console.log(this.props.location.pathname);
        var pathname_youtuber_post_id = ((String)(this.props.location.pathname)).split('/');
        console.log(pathname_youtuber_post_id[2]);

        init_youtuber_post_id = pathname_youtuber_post_id[2];

        this.state = {
            youtuber_post_id: init_youtuber_post_id,
            youtuber_id: '',
            youtuber_name: '',
            user_id: localStorage.getItem('user_id'),
            title: '',
            content: '',
            category: '',
            category_kor: '',
            youtube_link: '',
            business_address: '',
            short_period_contract_cnt: '',
            long_period_contract_cnt: '',
            pay_per_case: '',
            edit_tools: [],
            task: [],
            work_form: '',
            work_form_kor: '',
            work_period: '',
            work_period_kor: '',
            current_state: '',
            require_experience: [],
            
            upload_date: '',
            view_count: '',
            follow_exist: true,
            job_application_exist: true,
        };
    }

    stateRefresh = async () => {
        const url = '/api/youtuberPost';
        console.log(this.state.youtuber_post_id);
        
        let params = {
          post_id : this.state.youtuber_post_id
        }
        const response = await axios.get(url, {params});
        
        var body = response.data[0].Item;
        
        if (body !== undefined) {
          //state의 형태로 출력
          //body = body[0].Item;
          //console.log(body);
          this.setState({
            youtuber_id: body.youtuber_id,
            youtuber_name: body.youtuber_name,
            user_id: localStorage.getItem('user_id'),
            title: body.title,
            content: body.content,
            category: body.category,
            youtube_link: body.youtube_link,
            business_address: body.business_address,
            short_period_contract_cnt: body.short_period_contract_cnt,
            long_period_contract_cnt: body.long_period_contract_cnt,
            pay_per_case: body.pay_per_case,
            edit_tools: body.edit_tool,
            task: body.task,
            work_form: body.work_form,
            work_period: body.work_period,
            current_state: body.current_state,
            require_experience: body.require_experience,
            
            upload_date: body.upload_date,
            view_count: body.view_count,
            
          }); 
          console.log("동작2");
          this.selectFollowComponent()
          .then((response) => {
            console.log(response.data);
            
            if (response.data === "exist") {
                this.setState({ follow_exist: true })
            } else {
                this.setState({ follow_exist: false })
            }
          });

          // 편집자의 경우 구직 신청 여부 체크
          if (localStorage.getItem("qualification") === "editor") {
            this.selectJobApplication()
            .then((response) => {
              console.log(response.data);
              
              if (response.data === "exist") {
                  this.setState({ job_application_exist: true })
              } else {
                  this.setState({ job_application_exist: false })
              }
            });
          }
          console.log(this.state);
    
        } else {
          console.log("fail");
          alert("읽어오기 실패!");
        }
    }

    componentDidMount() {
        // this.getPostInfo().then(res => console.log(res))
        // .catch(err => console.log(err));
        let promiseResult = LoginCheck.loginCheck();
    
        promiseResult.then((promiseResult) => {
          if(promiseResult === true) {
            this.getPostInfo();
          }
        })
    }

    getPostInfo = async () => {
        const url = '/api/youtuberPost';
        
        let params = {
          post_id : this.state.youtuber_post_id
        }
        
        const response = await axios.get(url, {params});
        var body = response.data[0].Item;
        console.log(body);
        if (body !== undefined) {
          //state의 형태로 출력
          //body = body[0].Item;
          //console.log(body);
          this.setState({
            youtuber_id: body.youtuber_id,
            youtuber_name: body.youtuber_name,
            user_id: localStorage.getItem('user_id'),
            title: body.title,
            content: body.content,
            category: body.category,
            youtube_link: body.youtube_link,
            business_address: body.business_address,
            short_period_contract_cnt: body.short_period_contract_cnt,
            long_period_contract_cnt: body.long_period_contract_cnt,
            pay_per_case: body.pay_per_case,
            edit_tools: body.edit_tool,
            task: body.task,
            work_form: body.work_form,
            work_period: body.work_period,
            current_state: body.current_state,
            require_experience: body.require_experience,
            
            upload_date: body.upload_date,
            view_count: body.view_count + 1,
            
          }); 
          // 조회수 증가
          this.increaseViewCount();

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
          // 편집자의 경우 구직 신청 여부 체크
          if (localStorage.getItem("qualification") === "editor") {
            this.selectJobApplication()
            .then((response) => {
              console.log(response.data);
              
              if (response.data === "exist") {
                  this.setState({ job_application_exist: true })
              } else {
                  this.setState({ job_application_exist: false })
              }
            });
          }
          
          categoryList.forEach((c) => c.value === this.state.category ? this.setState({category_kor : c.name}) : null);
          workFormList.forEach((c) => c.value === this.state.work_form ? this.setState({work_form_kor : c.name}) : null);
          workPeriodList.forEach((c) => c.value === this.state.work_period ? this.setState({work_period_kor : c.name}) : null);
          
          console.log(this.state);
        } else {
          console.log("fail");
          alert("읽어오기 실패!");
        }
    }

    increaseViewCount = () => {
        const url = '/api/youtuberPostUpload/increaseViewCount';
        let data = {
          post_id: this.state.youtuber_post_id,
          view_count : this.state.view_count,
        }
    
        axios.put(url, data);
    }

    // 해당 유저를 팔로우했는지 판단하는 함수
    selectFollowComponent = () => {
        const url = '/api/selectFollowComponent';
        let params = {
            user_id: localStorage.getItem("user_id"),
            the_user_id: this.state.youtuber_id,
        }
        return axios.get(url, {params});
    }

    // 편집자의 경우 해당 게시물에 대해 구직 신청을 했는지 판단해주는 함수
    selectJobApplication = () => {
        const url = '/api/selectJobApplication';
        let params = {
            youtuber_post_id: this.state.youtuber_post_id,
            editor_id: localStorage.getItem("user_id"),
        }
        return axios.get(url, {params});
    }



    render() {
        const classes = this.props;
        var current_state = '';
        var modifyUrl = "/youtuberPost/youtuberPostModify/" + this.state.youtuber_post_id;
        
        return (
            <div>
                <Box display="flex" p={1}>
                    <Box p={1} flexGrow={1} >
                    
                    <Typography gutterBottom variant="inherit" component="h1" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                        구인 공고
                    </Typography>
                        
                    </Box>
                    <Box p={1} flexGrow={100}>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <Button variant="contained" color="primary">프로필 조회</Button>
                            </Typography>
                    </Box>
                    <Box p={1} flexGrow={10000}>
                        <Follow
                            user_id={this.state.youtuber_id}
                            stateRefresh={this.stateRefresh}
                            post_id={this.state.youtuber_post_id}
                            follow_exist={this.state.follow_exist}
                        />
                    </Box>
                    {this.state.youtuber_id === localStorage.getItem('user_id') && this.state.current_state === "before_start"
                    ? <Box p={1} ml={3}>
                        <NavLink to={String(modifyUrl)} style={{ textDecoration: 'none' }}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                        <Button variant="contained" color="primary">공고 수정</Button>
                                </Typography>
                        </NavLink>
                    </Box>
                    : null}

                    {/* 삭제 컴포넌트 */}
                    {this.state.youtuber_id === localStorage.getItem('user_id') && this.state.current_state === "before_start"
                        ? <Box p={1} ml={3}>
                            <YoutuberPostDelete youtuber_post_id={this.state.youtuber_post_id}/>
                        </Box>
                        : null}

                    {this.state.youtuber_id === localStorage.getItem('user_id') && this.state.current_state === "before_start"
                        ? <Box p={1} ml={3}>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <Button variant="contained" color="primary">신청 조회</Button>
                            </Typography>
                        </Box>
                        : null}
                    
                    {this.state.youtuber_id === localStorage.getItem('user_id') && this.state.current_state === "working"
                        ? <Box p={1} ml={3}>
                            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
                                <Button variant="contained" color="primary">편집자 평가</Button>
                            </Typography>
                        </Box>
                        : null}

                    {localStorage.getItem('qualification') === "editor" && this.state.current_state === "before_start" && this.state.job_application_exist === false
                        ? <Box p={1} ml={3}>
                            <JobApplication
                                youtuber_post_id={this.state.youtuber_post_id}
                                youtuber_id={this.state.youtuber_id}
                                stateRefresh={this.stateRefresh}
                            />
                        </Box>
                        : null}

                    {localStorage.getItem('qualification') === "editor" && this.state.current_state === "before_start" && this.state.job_application_exist === true
                        ? <Box p={1} ml={3}>
                            <JobApplicationCancel
                                youtuber_post_id={this.state.youtuber_post_id}
                                stateRefresh={this.stateRefresh}
                            />
                        </Box>
                        : null}
                </Box>
                
                <Grid container spacing={3} className={classes.form}>
                    <Grid item xs={12} sm={2}>
                        <Paper className={classes.fixedHeightPaper} minHeight="30vW">
                            <Typography component="h1" variant="h6" align="center">
                                유튜브 링크
                            </Typography>
                            <Divider />
                            <a href = "https://youtube.com" target="_blank">
                            <Typography component="h1" variant="h6" align="center">
                                <br />
                                {this.state.youtube_link} <br/> <br/>
                            </Typography>
                            </a>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            계약 건수 
                        </Typography>
                        <Divider />
                        <Typography component="h1" variant="h6" align="center">
                            단기: {this.state.short_period_contract_cnt} <br/>
                            장기: {this.state.long_period_contract_cnt} <br />
                            <br />
                        </Typography>
                        
                    </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            급여(건당)
                        </Typography>
                        <Divider />
                        <Typography component="h1" variant="h6" align="center">
                            <br/>
                            {this.state.pay_per_case} 원<br />
                            <br />
                        </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            요구 편집 툴
                        </Typography>
                        <Divider />
                        <Typography component="h1" variant="h6" align="center">
                            {/* 편집 툴의 개수를 얻어와서 조건문으로 그에 맞는 UI를 구축할 것 */}
                            {this.state.edit_tools.length == 1 && <br />}
                            
                            {this.state.edit_tools.map(c => {
                                return <li>{c} </li>
                            })}
                            {this.state.edit_tools.length == 1 && <br />}
                            {this.state.edit_tools.length == 2 && <br /> }
                        </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            업무 내용
                        </Typography>
                        <Divider />
                        <Typography component="h1" variant="h6" align="center">
                            {/* 업무 내용의 개수를 얻어와서 조건문으로 그에 맞는 UI를 구축할 것 */}
                            {this.state.task.length == 1 && <br />}
                            

                            {this.state.task.map(c => {
                                return <li>{c} <br/> </li>
                            })}
                            {this.state.task.length == 1 && <br />}
                            {this.state.task.length == 2 && <br /> }
                        </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={2}>
                        <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            근무 형태 및 기간
                        </Typography>
                        <Divider />
                        <Typography component="h1" variant="h6" align="center">
                            <li>{this.state.work_form_kor}</li> 
                            <li>{this.state.work_period_kor}</li> 
                            <br></br>
                        
                        </Typography>
                        </Paper>
                    </Grid>
                    

                    <hr width="100%" />

                    <Grid item xs={12} sm={12}>
                        <Box
                            display="flex"
                            justifyContent="flex-start"
                            m={1}
                            p={1}
                        >
                            {/* 제목 */}
                            <Typography component="h1" variant="h5">
                                {this.state.title}
                            </Typography>
                            {/* 현재 상태 */}
                            <Typography component="h1" variant="h5" color="error">
                                &nbsp;&nbsp;(
                                {this.state.current_state === "before_start" && "모집 중"}
                                {this.state.current_state === "working" && "작업 중"}
                                {this.state.current_state === "complete" && "완료"})
                            </Typography>
                            <Typography component="h1" variant="h6">
                                &nbsp;&nbsp; 등록 일시 : {this.state.upload_date}
                            </Typography>
                        </Box>
                    </Grid>
                    <hr width="100%" />
                    <Grid item xs={12} sm={4}>
                        <Box m={1} p={1}>
                        <Typography component="h1" variant="h6" >
                            주요 카테고리
                        </Typography>
                        <br />
                        <Typography component="h1" variant="body1">
                        <li>{this.state.category_kor}</li> 
                        </Typography>
                        <br /><br /><br />
                        <Typography component="h1" variant="h6">
                            지원 자격과 우대 사항
                        </Typography>
                        <br />
                        
                        <Typography component="h1" variant="body1">
                            {/* map이나 foreach를 써서 출력할 것 */}
                            {this.state.require_experience.length == 1 && <br />}
                            
                            {this.state.require_experience.map(c => {
                                return <li>{c} </li>
                            })}
                            {this.state.require_experience.length == 1 && <br />}
                            {this.state.require_experience.length == 2 && <br /> }
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Box m={1} p={1}>
                            <Typography component="h1" variant="h6">
                                상세 내용
                            </Typography>
                            <br />

                            <Typography component="h1" variant="body1">
                                {this.state.content}
                            </Typography>
                        </Box>
                       
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(YoutuberPost);