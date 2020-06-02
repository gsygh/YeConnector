import React, { Component } from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import * as LoginCheck from '../UserManagement/LoginCheck';
import { post } from "axios";
import { FormControlLabel, Radio, RadioGroup, Divider } from "@material-ui/core";

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
    radioGroup: {
        marginRight: theme.spacing(2),
    },
    spaceTo: {
        marginTop: theme.spacing(3),
    }
});

class YoutuberPostUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem("user_id"),
            title: "",
            pay_per_case: "", // 건당 급여
            category: "movie/animation",
            task: "", // 업무 내용
            edit_tool: "",   // 영상 편집 도구
            work_form: "office", // 근무 형태
            require_experience: "", // 요구 경력과 우대사항
            work_period: "short",
            content: "",
            is_open: "true"
        };
    }

    handleFormSubmit = (e) => {
        if (
            this.state.title == "" ||
            this.state.pay_per_case == "" ||
            this.state.edit_tool == "" ||
            this.state.task == "" ||
            this.state.require_experience == "" ||
            this.state.content == ""

        ) {
            alert("정보를 입력하세요!");
            return;
        }
        this.youtuberPostUpload().then((response) => {
            if (response.data === "success") {
                alert('업로드 성공');
                //this.props.stateRefresh();
            } else {
                alert("업로드 실패");
            }
            console.log(response.data);
            //this.props.stateRefresh();
        });
        this.setState({
            user_id: localStorage.getItem("user_id"),
            title: "",
            pay_per_case: "", // 건당 급여
            category: "movie/animation",
            task: "", // 업무 내용
            edit_tool: "",   // 영상 편집 도구
            work_form: "office", // 근무 형태
            require_experience: "", // 요구 경력과 우대사항
            work_period: "short",
            content: "",
            is_open: "true"
        });
    };

    youtuberPostUpload = () => {
        const url = "/api/youtuberPostUpload";
        let data = {
            user_id: this.state.user_id,
            title: this.state.title,
            pay_per_case: this.state.pay_per_case,
            category: this.state.category,
            task: this.state.task.split(","),
            edit_tool: this.state.edit_tool.split(","),
            work_form: this.state.work_form,
            require_experience: this.state.require_experience.split(","),
            work_period: this.state.work_period,
            content: this.state.content,
            is_open: this.state.is_open
        };

        console.log(data);

        // axios의 post를 사용. 해당 url에 formdata를 config에 맞게
        // return post(url, formData, config);
        return post(url, data);
    };

    handleValueChange = async (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        await this.setState(nextState);
        console.log(this.state);
    }

    handleRadioChange = (event) => {
        {
            event.target.value === "true" ?
            this.setState({
                is_open: true
            })
            : this.setState({
                is_open: false
            })
        }
    }

    componentDidMount() {
        LoginCheck.isYoutuberCheck();
        
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
        return (
            <main className={classes.layout}>
                <Grid container spacing={3} className={classes.form}>
                    <Grid item xs={12} sm={12}>
                        <Typography component="h1" variant="h4" align="center">
                            구인 공고
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.form}>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="제목"
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="pay_per_case"
                            name="pay_per_case"
                            label="건당 급여(원 단위 숫자만 기입)"
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label2">
                                카테고리
                            </InputLabel>
                            <Select
                                defaultValue={categoryList[0].value}
                                labelId="category-select-label2"
                                id="category"
                                value={this.category}
                                name="category"
                                onChange={this.handleValueChange}
                            >
                                {categoryList.map((elem) => (
                                    <MenuItem
                                        key={categoryList.indexOf(elem)}
                                        value={elem.value}
                                    >
                                        {elem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="task"
                            name="task"
                            label="업무 내용(2종류 이상일 경우 ,로 구분)"
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="edit_tool"
                            name="edit_tool"
                            label="선호하는 편집 툴(2종류 이상일 경우 ,로 구분)"
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label1">
                                근무 형태
                            </InputLabel>
                            <Select
                                defaultValue={workFormList[0].value}
                                labelId="category-select-label1"
                                id="work_form"
                                value={this.work_form}
                                name="work_form"
                                onChange={this.handleValueChange}
                            >
                                {workFormList.map((elem) => (
                                    <MenuItem
                                        key={workFormList.indexOf(elem)}
                                        value={elem.value}
                                    >
                                        {elem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="require_experience"
                            name="require_experience"
                            label="지원 자격 및 우대 사항(2종류 이상일 경우 ,로 구분)"
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label1">
                                최소 근무 기간
                            </InputLabel>
                            <Select
                                defaultValue={workPeriodList[0].value}
                                labelId="category-select-label1"
                                id="work_period"
                                value={this.work_period}
                                name="work_period"
                                onChange={this.handleValueChange}
                            >
                                {workPeriodList.map((elem) => (
                                    <MenuItem
                                        key={workPeriodList.indexOf(elem)}
                                        value={elem.value}
                                    >
                                        {elem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="content"
                            name="content"
                            label="내용"
                            multiline
                            fullWidth
                            onChange={this.handleValueChange}
                        />
                    </Grid>

                </Grid>

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    m={1}
                    p={1}
                >
                    <Box display="flex" mr={2}>
                        <RadioGroup row aria-label="position" name="is_open" defaultValue="true" onChange={this.handleRadioChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="공개"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="primary" />}
                                label="비공개"
                                labelPlacement="start"
                                className={classes.radioGroup}
                            />
                        </RadioGroup>
                    </Box>
                    <Box display="flex">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleFormSubmit}
                        >
                            등록
                        </Button>
                    </Box>
                </Box>
            </main>
        );
    }
}

export default withStyles(styles)(YoutuberPostUpload);