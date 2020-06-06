import React, { Component } from 'react';
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const styles = (theme) => ({

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

class EditorProfileContent extends Component {
    constructor(props) {
        super(props);

        
        
        this.state={
            editor_data: [],
            with_work_youtuber_id_list: [],
            with_work_youtuber_list: [],
            career : [],
            edit_tools : [],
        }
        
    }

    componentDidMount() {
        this.getEditorProfile().then((response) => {

            let short_with_work_youtuber_id1 = String(this.state.editor_data.short_with_work_youtuber_id);
            let long_with_work_youtuber_id1 = String(this.state.editor_data.long_work_with_youtuber_id);

            let short_with_work_youtuber_id2 = short_with_work_youtuber_id1.split(",");
            let long_with_work_youtuber_id2 = long_with_work_youtuber_id1.split(",");

            let with_work_youtuber_list = short_with_work_youtuber_id2.concat(long_with_work_youtuber_id2);

            this.setState({with_work_youtuber_id_list: with_work_youtuber_list});
            console.log(this.state);
            
            let youtuber_list = this.loopForGetUsername();
            youtuber_list.then((youtuber_list) => {
                this.setState({ with_work_youtuber_list: youtuber_list });
            });
        });
    }

    // 유튜버 데이터를 얻어옴
    getEditorProfile = async () => {
        const url = '/api/getEditorProfile';
        let params = {
          user_id : this.props.editor_state.user_id
        }
        
        const response = await axios.get(url, {params});
        
        var body = response.data;
        if (body !== undefined) {
            this.setState({
                editor_data : body,
                career : body.career,
                edit_tools : body.edit_tools,
            }); 
            if(this.state.career[0] === "undefined") {
                this.setState({career : [""]})
            }
        }
        localStorage.setItem("user_data", JSON.stringify(this.state.editor_data));
        return true;
    }

    loopForGetUsername = async () => {
        const url = '/api/getUserName';
        let user_data_list = [];
        let user_data = [];
        let count = 0;
        
        await this.asyncForEach(this.state.with_work_youtuber_id_list, async (item) => {
            if (item !== "") {
                user_data.youtuber_id = item;
            
            let params = {
                user_id : item
            }

            let one_youtuber_name = this.getYoutuberName(url, params);
            await one_youtuber_name.then( async (one_youtuber_name) => {
                console.log(one_youtuber_name);
                if (one_youtuber_name[0].Items[0] !== undefined) {
                    user_data.youtuber_name = one_youtuber_name[0].Items[0].user_name;
                    user_data_list.push(user_data);
                    user_data = [];
                    
                }
            });
            
            }
            
        });
        
        return user_data_list;
    }

    getYoutuberName = async (url, params) => {
        const response = await axios.get(url, {params});
        return response.data;
        
    }

    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    render() {
        const classes = this.props;
        const youtube_url = this.state.editor_data.youtube_url;
        
        return (
            <div>
                <Grid container spacing={2} className={classes.form} justify="center">
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.fixedHeightPaper} minHeight="30vW">
                            <Typography component="h1" variant="h6" align="center">
                                사진 부분
                            </Typography>
                            <Typography component="h1" variant="h6" align="center">
                                이름 : {this.props.editor_state.user_name}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            성별 : {this.props.editor_state.user_gender_kor} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            나이 : {this.props.editor_state.user_age} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            연락처 : {this.props.editor_state.user_phone_number} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            이메일 : {this.props.editor_state.user_id} 
                        </Typography>
                    </Paper>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            {/* 앞에 도구 그림 */}
                            편집 가능 툴
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
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
                                희망 급여
                            </Typography>
                            <Typography component="h1" variant="h6" align="center">
                            <br/>
                            {this.state.editor_data.hope_pay_per_case} 원<br />
                            <br />
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Paper className={classes.fixedHeightPaper}>
                            <Typography component="h1" variant="h6" align="center">
                                계약 건수
                            </Typography>
                            <Typography component="h1" variant="h6" align="center">
                                <li>단기: {this.state.editor_data.short_period_contract_cnt}회</li>
                                <li>장기: {this.state.editor_data.long_period_contract_cnt}회</li><br />
                            </Typography>
                        </Paper>
                    </Grid>
                    
                </Grid>
                <br />
                <hr width="100%" />
                <Grid container spacing={6} className={classes.form}>
                    <Grid item xs={12} sm={5}>
                        <Box m={1} p={1}>
                            {/* {this.state.career.length !== 0
                                ?  */}
                                <div><Typography component="h1" variant="h5">
                                    경력 사항
                                    </Typography>
                                    <br />
                                    <Typography component="h1" variant="body1">
                                        {this.state.career.length !== 0
                                            ? this.state.career.map((data) => {
                                                return <li>{data}</li>
                                            })
                                            : <li>없음</li>
                                        }
                                        <br /><br /><br />
                                    </Typography>
                                    <br /></div>
                                {/* : null
                            } */}
                            
                            <Typography component="h1" variant="h5">
                                
                                현재 함께 작업하는 유튜버
                            </Typography>
                            <br />
                            <Typography component="h1" variant="body1">
                                {this.state.with_work_youtuber_list.length !== 0
                                ? this.state.with_work_youtuber_list.map((data) => {
                                    return <NavLink to = {`/myPage/profile/${data.youtuber_name}`} style={{ textDecoration: 'none' }} target="_blank">
                                    <li>{data.youtuber_name}</li>
                                    </NavLink>
                                })
                                : <li>없음</li>
                                }
                            </Typography>
                            
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Box m={1} p={1}>
                            <Typography component="h1" variant="h5">
                                선호 카테고리<br/><br/>
                            </Typography>
                            <Typography component="h1" variant="body1">
                                <li>{this.props.editor_state.category_kor[0]}</li>
                                <li>{this.props.editor_state.category_kor[1]}</li>
                                <br /><br /><br />
                            </Typography>
                            
                            <Typography component="h1" variant="h5">
                                본인 소개
                            </Typography>
                            <br/>
                            <Typography component="h1" variant="body1">
                                {this.state.editor_data.self_introduction}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(EditorProfileContent);