import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Link  } from 'react-router-dom';

class JobApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleFormSubmit = () => {
        this.jobApplication().then((response) => {
            if (response.data === "success") {
                alert('신청 완료!');
            } else {
                alert('신청 실패');
            }
            this.props.stateRefresh();
        });
        this.setState({
            open: false,
        });
        
    }

    jobApplication = () => {
        const url = '/api/jopApplication';
        
        let data = {
            youtuber_post_id: this.props.youtuber_post_id,
            youtuber_id: this.props.youtuber_id,
            editor_id: localStorage.getItem("user_id"),
        }
        console.log(data);
        
        // axios.delete(url, {data: { editor_post_id: id }}).then(this.setState({open: false}));
        return axios.post(url, data);
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
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>구직 신청</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle onClose={this.handleClickClose}>구직 신청</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            해당 게시물에 대해 구직 신청을 하시겠습니까?
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

export default JobApplication;