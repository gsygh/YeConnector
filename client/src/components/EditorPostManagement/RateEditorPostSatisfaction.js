import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import GradeIcon from '@material-ui/icons/Grade';
import IconButton from '@material-ui/core/IconButton';
import { post } from 'axios';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
})

class RateEditorPostSatisfaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor_post_id: this.props.editor_post_id,
            user_id: localStorage.getItem('user_id'),
            satisfaction: 3,
            open: false,
        }
    }

    handleFormSubmit = (e) => {
        this.satisfactionUpload()
            .then((response) => {
                if (response.data === "success") {
                    alert('평가 성공');
                } else {
                    alert('평가 실패');
                }
                this.props.stateRefresh();
                //this.props.stateRefresh();
            });
        this.setState({
            editor_post_id: this.props.editor_post_id,
            user_id: localStorage.getItem('user_id'),
            satisfaction: 3,
            open: false,
        });
        console.log(this.state);
        
    }

    satisfactionUpload = () => {
        const url = '/api/satisfactionUpload';
        let data = {
            editor_post_id: this.state.editor_post_id,
            user_id: localStorage.getItem('user_id'),
            satisfaction: this.state.satisfaction,
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
        
    }

    handleClickOpen = () => {
        this.setState({
            editor_post_id: this.props.editor_post_id,
            open: true
        });
        
    }

    handleClickClose = () => {
        this.setState({
            editor_post_id: this.props.editor_post_id,
            user_id: localStorage.getItem('user_id'),
            satisfaction: 3,
            open: false,
        });
    }

    render() {
        const classes = this.props;
        return (
            <div className={classes.root}>
                <IconButton onClick={this.handleClickOpen}>
                    <GradeIcon color="primary" fontSize="default"></GradeIcon>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle>만족도 평가(최대 5점)</DialogTitle>
                    <DialogContent>
                        <Rating name="half-rating" defaultValue={2.5} precision={0.5} name="satisfaction" onChange={this.handleValueChange} />
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

export default withStyles(styles)(RateEditorPostSatisfaction);