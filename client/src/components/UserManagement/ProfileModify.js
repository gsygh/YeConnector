import React, { Component } from 'react';
import EditorProfileModify from './EditorProfileModify';
import YoutuberProfileModify from './YoutuberProfileModify';
import CommonUserProfileModify from './CommonUserProfileModify';


class ProfileModify extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        
    }

    render() {
        return (
            <div>
                {this.props.location.state.user_qualification === "editor"
                ? <EditorProfileModify user_info={this.props.location.state}></EditorProfileModify>
                : null
                }
                {this.props.location.state.user_qualification === "youtuber"
                ? <YoutuberProfileModify user_info={this.props.location.state}></YoutuberProfileModify>
                : null
                }
                {/* {this.props.location.state.user_qualification === "normal"
                ? <EditorProfileModify user_info={this.props.location.state}></EditorProfileModify>
                : null
                } */}
                
                
            </div>
        );
    }
}

export default ProfileModify;