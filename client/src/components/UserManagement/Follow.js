import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Link  } from 'react-router-dom';

class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow_exist: true,
        };
    }

    handleAddFollow = () => {
        if(localStorage.getItem("user_id") === this.props.user_id) {
            alert("본인은 팔로우할 수 없습니다!");
            return;
        }
        else {
            this.addFollow()
            .then((response) => {
            if (response.data === "success") {
                
            } else {
                alert('팔로우 실패');
            }
            this.props.stateRefresh();
        });
        }
        
    }

    addFollow = () => {
        const url = '/api/addFollow';
        let data = {
            user_id: localStorage.getItem("user_id"),
            // 팔로우 대상 아이디
            the_user_id: this.props.user_id,
        }
        
        return axios.put(url, {data});
    }

    handleDeleteFollow = () => {
        if(localStorage.getItem("user_id") === this.props.user_id) {
            alert("본인은 팔로우 취소할 수 없습니다!");
            return;
        }
        else {
            this.deleteFollow()
            .then((response) => {
            
            if (response.data === "success") {
                
            } else {
                alert('팔로우 취소 실패');
            }
            this.props.stateRefresh();
        });
        }
        
    }

    deleteFollow = () => {
        const url = '/api/deleteFollow';
        let data = {
            user_id: localStorage.getItem("user_id"),
            the_user_id: this.props.user_id,
        }
        
        return axios.delete(url, {data});
    }

    render() {
        return (
            <div>
                {this.props.follow_exist == false 
                ? <Button variant="contained" color="primary" onClick={this.handleAddFollow}>팔로우</Button>
                : <Button variant="contained" color="secondary" onClick={this.handleDeleteFollow}>팔로우 취소</Button>
                }
            </div>
        );
    }
}

export default Follow;