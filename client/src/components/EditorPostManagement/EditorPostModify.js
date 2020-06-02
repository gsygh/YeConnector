import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
})

class EditorPostModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor_post_id: '',
            editor_id: '',
            title: '',
            content: '',
            category: 'movie/animation',
            average_satisfaction: 3,
            youtube_post_url: '',
            upload_date: '',
            view_count: 0,
            is_open: true,
            open: false,
        }
    }

    handleFormSubmit = (e) => {
        this.editorPostmodify()
            .then((response) => {
                if (response.data === "success") {
                    alert('업로드 성공');
                } else {
                    alert('업로드 실패');
                }
                this.props.stateRefresh();
                //this.props.stateRefresh();
            });
        this.setState({
            open: false,
        });
    }

    editorPostmodify = () => {
        const url = '/api/editorPostModify';
        let data = {
            editor_post_id : this.state.editor_post_id,
            editor_id : this.state.editor_id,
            title : this.state.title,
            content : this.state.content,
            category : this.state.category,
            average_satisfaction : this.state.average_satisfaction,
            youtube_post_url : this.state.youtube_post_url,
            upload_date: this.state.upload_date,
            view_count : this.state.view_count,
            is_open : this.state.is_open
        }
        
        console.log(data);
        
        // axios의 post를 사용. 해당 url에 formdata를 config에 맞게
        // return post(url, formData, config);
        return axios.post(url, data);
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
        console.log(this.state);
        
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
        this.refreshState();
    }

    handleClickClose = () => {
        this.setState({
            editor_post_id: '',
            title: '',
            content: '',
            category: 'movie/animation',
            average_satisfaction: 3,
            youtube_post_url: '',
            upload_date: '',
            view_count: 0,
            is_open: true,
            open: false
        });
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

    refreshState = () => {
        this.setState({
            editor_post_id: this.props.post_info.editor_post_id,
            editor_id: this.props.post_info.editor_id,
            title: this.props.post_info.title,
            content: this.props.post_info.content,
            category: this.props.post_info.category,
            average_satisfaction: this.props.post_info.average_satisfaction,
            youtube_post_url: this.props.post_info.youtube_post_url,
            upload_date: this.props.post_info.upload_date,
            view_count: this.props.post_info.view_count,
            is_open: this.props.post_info.is_open,
        });
        console.log(this.state);
        
    }

    render() {
        const classes = this.props;
        console.log(classes.post_info);
        
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
            
        ]
        return (
            <div className={classes.root}>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    수정
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle>영상 수정</DialogTitle>
                    <DialogContent>
                        <TextField label="제목" type="text" name="title" value={this.state.title} onChange={this.handleValueChange} /><br />
                        <TextField label="내용" type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br />
                        <TextField label="영상 링크" type="text" name="youtube_post_url" value={this.state.youtube_post_url} onChange={this.handleValueChange} /><br />
                        <FormControl className={classes.formControl}>
                        
                            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                            <Select defaultValue={this.state.category}
                                labelId="category-select-label"
                                id="category-select"
                                value={this.state.category}
                                name="category"
                                onChange={this.handleValueChange}
                            >
                                {categoryList.map(elem => (
                                <MenuItem key={categoryList.indexOf(elem)} value={elem.value}>{elem.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <RadioGroup row aria-label="position" name="position" defaultValue="true" value={this.state.is_open} onChange={this.handleRadioChange}>
                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="공개"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="primary" />}
                                label="비공개"
                                labelPlacement="top"
                            />
                            {/* {console.log(this.state)} */}
                        </RadioGroup>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>


        );
    }
}

export default withStyles(styles)(EditorPostModify);