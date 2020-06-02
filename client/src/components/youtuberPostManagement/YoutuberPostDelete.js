import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Link  } from 'react-router-dom';

class YoutuberPostDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleFormSubmit = (youtuber_post_id) => {
        this.youtuberPostDelete(youtuber_post_id).then((response) => {
            if (response.data === "success") {
                alert('삭제 성공');
            } else {
                alert('삭제 실패');
            }
            console.log(response.data);
            window.location.href= "/#/youtuberPost/followYoutuberPost";
        });
        
    }

    youtuberPostDelete = (youtuber_post_id) => {
        const url = '/api/youtuberPostDelete';
        
        let data = {
            youtuber_post_id: youtuber_post_id
        }
        console.log(data);
        
        // axios.delete(url, {data: { editor_post_id: id }}).then(this.setState({open: false}));
        return axios.delete(url, {data}).then(this.setState({open: false}));
        


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
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>공고 삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle onClose={this.handleClickClose}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 구인공고가 삭제됩니다.
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button> */}
                        <Button variant="contained" color="primary" onClick={(e) => { this.handleFormSubmit(this.props.youtuber_post_id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default YoutuberPostDelete;