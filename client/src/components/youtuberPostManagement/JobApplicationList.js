import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import { NavLink } from 'react-router-dom';

class JobApplicationList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            post_url: "/userProfile/" + this.props.editor_id,
        }
        console.log(this.props.editor_id);
    }

    render() {
        

        
        
        return (
            <TableRow>
                <TableCell>
                <NavLink exact to={this.state.post_url} style={{ textDecoration: 'none' }} >
                    {this.props.editor_name}
                </NavLink>
                </TableCell>
                <TableCell>
                    sdf
                    {/* {this.props.short_period_contract_cnt} */}
                </TableCell>
                <TableCell>
                    sdf
                    {/* {this.props.long_period_contract_cnt} */}
                    </TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={(e) => { this.handleFormSubmit(this.props.editor_post_id)}}>승인</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="secondary" onClick={this.handleClickClose}>거절</Button>
                </TableCell>
                
            </TableRow>
        );
    }
} export default JobApplicationList;
