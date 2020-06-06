import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { post } from 'axios';


const styles = (theme) => ({
    hidden: {
        display: 'none'
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        height: '100vh',
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
        height: '100vh',
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
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
});
//https://placeimg.com/64/64/any
class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id : localStorage.getItem('user_id'),
            user_qualification : 'editor',
            user_name : '',
            user_age : '',
            user_phone_number : '',
            user_gender : 'man',
            preffered_category1: 'movie/animation',
            preffered_category2: 'movie/animation',
            user_profile_url : "https://placeimg.com/64/64/any"
        }
    }

    handleFormSubmit = (e) => {
       if (this.state.user_name == '' || this.state.user_age == '' || this.state.user_phone_number == '') {
           alert("정보를 입력하세요!");
           return;
       }
       localStorage.setItem("qualification", this.state.user_qualification);
        this.userDataUpload()
            .then((response) => {
                if (response.data === "success") {
                    
                    alert('환영합니다! 편집자나 유튜버라면 마이 페이지에서 개인 정보를 변경해주세요!');
                    window.location.href = "/#/editorPost/followEditorPost";
                } else {
                    alert('업로드 실패');
                }
                console.log(response.data);
                //this.props.stateRefresh();
            });
        this.setState({
            user_id : localStorage.getItem('user_id'),
            user_qualification : 'editor',
            user_name : '',
            user_age : '',
            user_phone_number : '',
            user_gender : 'man',
            preffered_category1: 'movie/animation',
            preffered_category2: 'car/traffic',
            user_profile_url : "https://placeimg.com/64/64/any"
        });
    }

    userDataUpload = () => {
        const url = '/api/commonSignUp';
        // const formData = new FormData();
        // formData.append('title', this.state.title);
        // formData.append('content', this.state.content);
        // formData.append('category', this.state.category);
        // formData.append('average_satisfaction', this.state.average_satisfaction);
        // formData.append('youtube_post_url', this.state.youtube_post_url);
        // formData.append('view_count', this.state.view_count);
        // formData.append('is_open', this.state.is_open);
        let data = {
            user_id : this.state.user_id,
            user_name : this.state.user_name,
            user_qualification : this.state.user_qualification,
            user_age : this.state.user_age,
            user_phone_number : this.state.user_phone_number,
            user_gender : this.state.user_gender,
            preffered_category1 : this.state.preffered_category1,
            preffered_category2 : this.state.preffered_category2,
            user_profile_url : this.state.user_profile_url
        }
        
        console.log(data);
        
        // axios의 post를 사용. 해당 url에 formdata를 config에 맞게
        // return post(url, formData, config);
        return post(url, data);
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state);
    }

    render() {
        const classes = this.props;
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
        const genderList = [
            { name: "남자", value: "man" },
            { name: "여자", value: "woman" },
        ];
        const qualificationList = [
            { name: "편집자", value: "editor" },
            { name: "유튜버", value: "youtuber" },
            { name: "일반 사용자", value: "normal" },
        ];
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <div className={classes.layout}>
                        <Typography component="h1" variant="h4" align="center">
                            회원가입
                        </Typography>
                        <Grid container spacing={3} className={classes.form}>
                            <Grid item xs={12} sm={4} >
                                <TextField
                                    required
                                    id="user_name"
                                    name="user_name"
                                    label="닉네임"
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="user_age"
                                    name="user_age"
                                    label="나이"
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    id="user_phone_number"
                                    name="user_phone_number"
                                    label="전화번호(010-0000-0000)"
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label1">성별</InputLabel>
                                    <Select defaultValue={genderList[0].value}
                                        labelId="category-select-label1"
                                        id="user_gender"
                                        value={this.genderList}
                                        name="user_gender"
                                        onChange={this.handleValueChange}

                                    >
                                        {genderList.map(elem => (
                                            <MenuItem key={genderList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label1">계정 권한</InputLabel>
                                    <Select defaultValue={qualificationList[0].value}
                                        labelId="category-select-label1"
                                        id="user_qualification"
                                        value={this.qualificationList}
                                        name="user_qualification"
                                        onChange={this.handleValueChange}

                                    >
                                        {qualificationList.map(elem => (
                                            <MenuItem key={qualificationList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label2">관심사 1</InputLabel>
                                    <Select defaultValue={categoryList[0].value}
                                        labelId="category-select-label2"
                                        id="preffered_category1"
                                        value={this.preffered_category1}
                                        name="preffered_category1"
                                        onChange={this.handleValueChange}
                                    >
                                        {categoryList.map(elem => (
                                            <MenuItem key={categoryList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label3">관심사 2</InputLabel>
                                    <Select defaultValue={categoryList[1].value}
                                        labelId="category-select-label3"
                                        id="preffered_category2"
                                        value={this.preffered_category2}
                                        name="preffered_category2"
                                        onChange={this.handleValueChange}
                                    >
                                        {categoryList.map(elem => (
                                            <MenuItem key={categoryList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* 추후 프로필 사진 추가할 것 */}
                            {/* <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="billing country"
                            />
                        </Grid>
                         */}
                        </Grid>

                        <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>회원가입</Button>
                        </Box>
                    </div>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(SignUp);