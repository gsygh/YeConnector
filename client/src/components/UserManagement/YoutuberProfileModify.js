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

class YoutuberProfileModify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business_address: '',
            youtube_name: '',
        }
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
                                    value={this.props.location.state.user_name}
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
                                    value={this.props.location.state.user_age}
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
                                    value={this.props.location.state.user_phone_number}
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="youtube_name"
                                    name="youtube_name"
                                    label="유튜브 명"
                                    value=""
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    id="business_address"
                                    name="business_address"
                                    label="회사 주소(필요 시 기재)"
                                    value=""
                                    fullWidth
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="youtube_link"
                                    name="youtube_link"
                                    label="유튜브 링크"
                                    fullWidth
                                    value=""
                                    onChange={this.handleValueChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl} fullWidth>

                                    <InputLabel id="demo-simple-select-label2">관심사 1</InputLabel>
                                    <Select defaultValue={categoryList[0].value}
                                        labelId="category-select-label2"
                                        id="preffered_category1"
                                        value={this.props.location.state.preffered_category[0]}
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
                                    value={this.props.location.state.preffered_category[1]}
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
                                value=""
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

export default withStyles(styles)(YoutuberProfileModify);