import React, { Component } from 'react';
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
import axios from 'axios';

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

class EditorProfileModify extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        
        let parse_qualification_profile = JSON.parse(this.props.user_info.qualification_profile);
        if (parse_qualification_profile === "") {
            this.state = {
                user_id : this.props.user_info.user_id,
                user_name : this.props.user_info.user_name,
                user_age :  this.props.user_info.user_age,
                user_profile_url : this.props.user_info.user_profile_url,
                user_phone_number :  this.props.user_info.user_phone_number,
                preffered_category1 : this.props.user_info.preffered_category[0],
                preffered_category2 : this.props.user_info.preffered_category[1],
                hope_pay_per_case: "",
                career: "",
                self_introduction : "",
                edit_tools : "",
                
            }
        }
        else {
            this.state = {
                user_id : this.props.user_info.user_id,
                user_name : this.props.user_info.user_name,
                user_age :  this.props.user_info.user_age,
                user_profile_url : this.props.user_info.user_profile_url,
                user_phone_number :  this.props.user_info.user_phone_number,
                preffered_category1 : this.props.user_info.preffered_category[0],
                preffered_category2 : this.props.user_info.preffered_category[1],
                hope_pay_per_case: parse_qualification_profile.hope_pay_per_case,
                career: parse_qualification_profile.career,
                self_introduction :  parse_qualification_profile.self_introduction,
                edit_tools : parse_qualification_profile.edit_tools,
                
            }
        }
        
        
        
    }

    handleValueChange = async (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        await this.setState(nextState);
        console.log(this.state);
        
    }

    handleFormSubmit = (e) => {
        if (this.state.user_name == '' || this.state.user_age == '' || this.state.user_phone_number == '' 
        || this.state.hope_pay_per_case == '' || this.state.edit_tools == '' || this.state.self_introduction == '') {
            alert("정보를 입력하세요!");
            return;
        }
        this.commonDataModify()
            .then((response) => {
                if (response.data === "success") {
                    this.editorDataUpload().then((response) => {
                        if (response.data === "success") {
                            
                            this.setState({
                                user_id: localStorage.getItem('user_id'),
                                user_name: '',
                                user_age: '',
                                user_phone_number: '',
                                preffered_category1: 'movie/animation',
                                preffered_category2: 'car/traffic',
                                user_profile_url: "https://placeimg.com/64/64/any",
                                hope_pay_per_case: "",
                                career: "",
                                self_introduction: "",
                                edit_tools : "",
                            });
                            const pageUrlForComplete = "/#/myPage/profile/" + this.state.user_id;
                            alert('정보 수정 완료!');
                            window.location.href = pageUrlForComplete;
                        }
                    });
                } else {
                    alert('등록 실패! 정보를 확인해주세요.');
                }
            });
    }

    commonDataModify = () => {
        const url = '/api/commonDataModify';
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
            user_age : this.state.user_age,
            user_phone_number : this.state.user_phone_number,
            preffered_category1 : this.state.preffered_category1,
            preffered_category2 : this.state.preffered_category2,
            user_profile_url : this.state.user_profile_url
        }
        
        // axios의 post를 사용. 해당 url에 formdata를 config에 맞게
        // return post(url, formData, config);
        return axios.post(url, data);
    }

    editorDataUpload = () => {
        const url = '/api/editorDataModify';
        let data = {
            user_id: this.state.user_id,
            hope_pay_per_case: this.state.hope_pay_per_case,
            career: String(this.state.career).split(','),
            self_introduction: this.state.self_introduction,
            edit_tools: String(this.state.edit_tools).split(','),
        }
        

        return axios.post(url, data);
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
        return (
            <main className={classes.layout}>
                    <div className={classes.layout}>
                        <Typography component="h1" variant="h4" align="center">
                            개인 정보 수정 <br /><br />
                        </Typography>
                        <Grid container spacing={3} className={classes.form}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="user_name"
                                    name="user_name"
                                    label="닉네임"
                                    value={this.state.user_name}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="user_age"
                                    name="user_age"
                                    label="나이"
                                    value={this.state.user_age}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="user_phone_number"
                                    name="user_phone_number"
                                    label="전화번호(010-0000-0000)"
                                    value={this.state.user_phone_number}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="hope_pay_per_case"
                                    name="hope_pay_per_case"
                                    label="희망 급여"
                                    value={this.state.hope_pay_per_case}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="edit_tools"
                                    name="edit_tools"
                                    label="편집 가능 툴(2개 이상 시 ,로 구분)"
                                    value={this.state.edit_tools}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="career"
                                    name="career"
                                    label="경력 사항(2개 이상 시 ,로 구분)"
                                    fullWidth
                                    value={this.state.career}
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label2">관심사 1</InputLabel>
                                    <Select defaultValue={categoryList[0].value}
                                        labelId="category-select-label2"
                                        id="preffered_category1"
                                        value={this.state.preffered_category1}
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
                                    value={this.state.preffered_category2}
                                    name="preffered_category2"
                                    onChange={this.handleValueChange}
                                >
                                    {categoryList.map(elem => (
                                        <MenuItem key={categoryList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="self_introduction"
                                name="self_introduction"
                                label="자기 소개"
                                multiline
                                fullWidth
                                value={this.state.self_introduction}
                                onChange={this.handleValueChange}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Box display="flex" justifyContent="flex-end" m={1} p={1} >
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>수정</Button>
                    </Box>
                </div>
            </main>
        );
    }
}

export default withStyles(styles)(EditorProfileModify);