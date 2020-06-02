import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Link  } from 'react-router-dom';

class EditorPostDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleFormSubmit = (editor_post_id) => {
        this.editorPostDelete(editor_post_id).then((response) => {
            if (response.data === "success") {
                alert('삭제 성공');
            } else {
                alert('삭제 실패');
            }
            console.log(response.data);
            window.location.href= "/#/editorPost/followEditorPost";
        });
        
    }

    editorPostDelete = (editor_post_id) => {
        //const url = '/api/editorPostDelete/' + id;
        const url = '/api/editorPostDelete';
        // Rest api는 고객 데이터를 특정한 아이디로 삭제할 때 경로로 접근해서 삭제 가능
        
        // fetch(url, {
        //     method: 'DELETE'
        // }).then(this.setState({open: false}));
        // //this.props.history.push('/editorPost/followEditorPost');
        let data = {
            //editor_post_id : this.state.editor_post_id
            //editor_id : this.state.editor_id
            editor_post_id: editor_post_id
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
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    {/* this.state.open의 값이 open이면 열리고 아니면 안열리는 조건문 */}
                    <DialogTitle onClose={this.handleClickClose}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 영상 게시물이 삭제됩니다.
                    </Typography>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button variant="contained" color="primary" onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</Button> */}
                        <Button variant="contained" color="primary" onClick={(e) => { this.handleFormSubmit(this.props.editor_post_id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditorPostDelete;