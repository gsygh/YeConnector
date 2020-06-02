import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Link  } from 'react-router-dom';

class JobApplicationCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleFormSubmit = () => {
        this.jobApplicationCancel().then((response) => {
            if (response.data === "success") {
                alert('취소 완료!');
            } else {
                alert('취소 실패');
            }
            this.props.stateRefresh();
        });
        this.setState({
            open: false,
        });
    }

    jobApplicationCancel = () => {
        const url = '/api/jopApplicationCancel';
        
        let data = {
            youtuber_post_id: this.props.youtuber_post_id,
            editor_id: localStorage.getItem("user_id"),
        }

        // axios.delete(url, {data: { editor_post_id: id }}).then(this.setState({open: false}));
        return axios.delete(url, {data})
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            open: false
        });
    }


    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>신청 취소</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle onClose={this.handleClickClose}>구직 신청 취소</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            해당 게시물에 대한 구직 신청을 취소하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button> */}
                        <Button variant="contained" color="primary" onClick={(e) => { this.handleFormSubmit()}}>신청</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default JobApplicationCancel;