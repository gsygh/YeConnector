import React, { Component } from 'react';
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { NavLink } from 'react-router-dom';

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

class YoutuberProfileContent extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const classes = this.props;
        
        
        return (
            <div>
                <Grid container spacing={6} className={classes.form} justify="center">
                    <Grid item xs={12} sm={2}>
                        <Paper className={classes.fixedHeightPaper} minHeight="30vW">
                            <Typography component="h1" variant="h6" align="center">
                                사진 부분
                            </Typography>
                            <Typography component="h1" variant="h6" align="center">
                                {this.props.youtuber_state.user_name}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            성별 : {this.props.youtuber_state.user_gender_kor} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            나이 : {this.props.youtuber_state.user_age} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            연락처 : {this.props.youtuber_state.user_phone_number} 
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            이메일 : {this.props.youtuber_state.user_id} 
                        </Typography>
                    </Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            {/* 앞에 도구 그림 */}
                            유튜브 명
                        </Typography>

                            {/* {this.state.edit_tools.length == 1 && <br />}
                            
                            {this.state.edit_tools.map(c => {
                                return <li>{c} </li>
                            })}
                            {this.state.edit_tools.length == 1 && <br />}
                            {this.state.edit_tools.length == 2 && <br /> } */}
                            <Typography component="h1" variant="h6" align="center">
                                <br />
                                Account
                            </Typography>
                            <a href="https://youtube.com" style={{ textDecoration: 'none' }} target="_blank">
                                <Typography component="h1" variant="h6" align="center">
                                    <Button variant="text">
                                        <Typography component="h1" variant="body1" color="primary">
                                        유튜브 링크로 이동
                                        </Typography>
                                    </Button>
                                </Typography>
                            </a>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    <Paper className={classes.fixedHeightPaper}>
                        <Typography component="h1" variant="h6" align="center">
                            계약 건수
                        </Typography>
                        <Typography component="h1" variant="h6" align="center">
                            <li>단기: ?회</li>
                            <li>장기: ?회</li><br />
                        </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <br />
                <hr width="100%" />
                <Grid container spacing={6} className={classes.form}>
                    <Grid item xs={12} sm={5}>
                        <Box m={1} p={1}>
                            <Typography component="h1" variant="h5">
                                선호 카테고리<br/><br/>
                            </Typography>
                            <Typography component="h1" variant="body1">
                                <li>{this.props.youtuber_state.category_kor[0]}</li>
                                <li>{this.props.youtuber_state.category_kor[1]}</li>
                            </Typography>
                            <br /><br /><br />
                            <Typography component="h1" variant="h5">
                                현재 함께 작업하는 편집자
                            </Typography>
                            <br />
                            <Typography component="h1" variant="body1">
                                <li>??</li>
                            </Typography>
                            
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Box m={1} p={1}>
                            
                            <Typography component="h1" variant="h5">
                                본인 소개
                            </Typography>
                            <br/>
                            <Typography component="h1" variant="body1">
                                정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애정신나갈거같애
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(YoutuberProfileContent);