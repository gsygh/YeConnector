import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { NavLink } from 'react-router-dom';

const workPeriodList = [
    { name: "1건 (단기)", value: "short" },
    { name: "1달 미만", value: "under_a_month" },
    { name: "1달 이상", value: "more_than_a_month" },
    { name: "6개월 이상", value: "more_than_six_month" },
    { name: "1년 이상", value: "more_than_a_year" },
];

class YoutuberPostList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            post_url: "/youtuberPost/" + this.props.post_id,
            work_period_kor: "",
        }
    }
    componentDidMount() {
        workPeriodList.forEach((c) => c.value === this.props.work_period ? this.setState({work_period_kor : c.name}) : null);
    }

    render() {
        

        
        return (
            <TableRow>
                <TableCell>{this.props.post_user_name}</TableCell>
                <TableCell>
                    <NavLink exact to={this.state.post_url} style={{ textDecoration: 'none' }} >
                        {this.props.title}
                    </NavLink>
                </TableCell>
                <TableCell>{this.props.upload_date}</TableCell>
                <TableCell>{this.state.work_period_kor}</TableCell>
                
            </TableRow>
        );
    }
} export default YoutuberPostList;
