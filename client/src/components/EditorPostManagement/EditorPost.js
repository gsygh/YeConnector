import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import EditorPostDelete from './EditorPostDelete';
import EditorPostModify from './EditorPostModify';
import Follow from '../UserManagement/Follow';
import RateEditorPostSatisfaction from './RateEditorPostSatisfaction';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import * as LoginCheck from '../UserManagement/LoginCheck';
import Box from '@material-ui/core/Box';



const styles = theme => ({
  root: {
    maxWidth: 400,
    marginTop: theme.spacing(3)
  },
  pageTitle : {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
      marginTop: theme.spacing(2),
  },
  modifyButton: {
      marginTop: theme.spacing(2),
  },
  postGrid :{
      marginTop: theme.spacing(2),
  },
  gridStyle : {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  followButton : {
    marginLeft: theme.spacing(2),
  },
  recommendEditorPost : {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
});

class EditorPost extends Component {
  constructor(props) {
    super(props);
    
    // 현재 페이지의 게시물 id를 얻는 코드 (함수 사용 불가로 인해 코드로 기재)
    var init_editor_post_id = '';
    console.log(this.props.location.pathname);
    var pathname_editor_post_id = ((String)(this.props.location.pathname)).split('/');
    console.log(pathname_editor_post_id[2]);
    
    
    // if(this.props.location.state != null && this.props.location.state != JSON.parse(localStorage.getItem('editor_post_id'))) {
    //   const serializedState = JSON.stringify(this.props.location.state);
    //   localStorage.setItem('editor_post_id', serializedState);
    //   init_editor_post_id = JSON.parse(localStorage.getItem('editor_post_id')).editor_post_id;
    //   console.log(init_editor_post_id);
    // }
    // else {
    //   const serializedState = JSON.parse(localStorage.getItem('editor_post_id'));
      
    //   init_editor_post_id = serializedState.editor_post_id;
    //   console.log(init_editor_post_id);
      
    //     // JSON.parse(serializedState);
    // }
    init_editor_post_id = pathname_editor_post_id[2];


    this.state = {
      editor_post_id: (String)(init_editor_post_id),
      editor_id: '',
      user_id: localStorage.getItem('user_id'),
      editor_name: '',
      title: '',
      content: '',
      category: '',
      average_satisfaction: 0,
      upload_date: '',
      youtube_post_url: '',
      view_count: 0,
      follow_exist: true,
      is_open: true,
    }
    console.log(this.state.editor_post_id);
    
  }

  stateRefresh = async () => {
    const url = '/api/editorPost';
    let params = {
      editor_post_id : this.state.editor_post_id
    }
    
    const response = await axios.get(url, {params});
    var body = response.data[0].Item;
    
    if (body !== undefined) {
      //state의 형태로 출력
      //body = body[0].Item;
      //console.log(body);
      this.setState({
        editor_post_id: body.post_id,
        editor_id: body.editor_id,
        editor_name: body.user_name,
        user_id: localStorage.getItem('user_id'),
        title: body.title,
        content: body.content,
        category: body.category,
        average_satisfaction: body.average_satisfaction,
        upload_date: body.upload_date,
        youtube_post_url: body.youtube_post_url,
        view_count: body.view_count,
        is_open: body.is_open,
      }); 
      
      this.selectFollowComponent()
      .then((response) => {
        console.log(response.data);
        
        if (response.data === "exist") {
            this.setState({ follow_exist: true })
        } else {
            this.setState({ follow_exist: false })
        }
      });
      console.log(this.state);

    } else {
      console.log("fail");
      alert("읽어오기 실패!");
    }
  }
  
  componentDidMount() {
    // this.getPostInfo().then(res => console.log(res))
    // .catch(err => console.log(err));
    let promiseResult = LoginCheck.loginCheck();

    promiseResult.then((promiseResult) => {
      if(promiseResult === true) {
        this.getPostInfo();
      }
    })
  }

  getPostInfo = async () => {
    const url = '/api/editorPost';
    let params = {
      editor_post_id : this.state.editor_post_id
    }
    
    const response = await axios.get(url, {params});
    var body = response.data[0].Item;
    console.log(body);
    
    if (body != undefined) {
      //state의 형태로 출력
      //body = body[0].Item;
      //console.log(body);
      this.setState({
        editor_post_id: body.post_id,
        editor_id: body.editor_id,
        editor_name: body.user_name,
        title: body.title,
        content: body.content,
        category: body.category,
        average_satisfaction: body.average_satisfaction,
        upload_date: body.upload_date,
        youtube_post_url: body.youtube_post_url,
        view_count: body.view_count + 1,
        is_open: body.is_open,
      }); 
      console.log(this.state);
      this.increaseViewCount();
      this.selectFollowComponent()
      .then((response) => {
        console.log(response.data);
        
        if (response.data === "exist") {
            this.setState({ follow_exist: true })
        } else {
            this.setState({ follow_exist: false })
        }
      });

    } else {
      console.log("fail");
      alert("읽어오기 실패!")
      
    }
  }

  increaseViewCount = () => {
    const url = '/api/editorPostUpload/increaseViewCount';
    let data = {
      editor_post_id: this.state.editor_post_id,
      view_count : this.state.view_count,
    }

    axios.put(url, data);
  }

  selectFollowComponent = () => {
    const url = '/api/selectFollowComponent';
    let params = {
        user_id: localStorage.getItem("user_id"),
        the_user_id: this.state.editor_id,
    }
    return axios.get(url, {params});
}

  render() {
    const { classes } = this.props; 
    console.log(this.state);

    return (
      <div>
        <Box display="flex" p={1}>
          <Box p={1} flexGrow={1} >
            <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }}>
              {this.state.title}
            </Typography>
          </Box>
          {/* 수정 컴포넌트 */}
          <Box p={1} >
            {this.state.editor_id === localStorage.getItem('user_id') 
            ? <EditorPostModify className={classes.modifyButton} post_info={this.state} stateRefresh={this.stateRefresh} /> 
            : null}
            
          </Box>
          {/* 삭제 컴포넌트 */}
          <Box p={1} >
            {this.state.editor_id === localStorage.getItem('user_id')
              ? <EditorPostDelete className={classes.deleteButton} editor_post_id={this.state.editor_post_id} stateRefresh={this.stateRefresh}/>
              : null}
            
          </Box>
        </Box>
        
        <Divider />

        {/* 유튜브 영상 */}
        <Grid container spacing={3} container justify="center" alignItems="center" className={classes.gridStyle}>
          <ReactPlayer url={this.state.youtube_post_url} controls />
        </Grid>

        <Divider />

        <Box display="flex" p={1} alignItems="center">
          <Box p={1} order={2} >
            <Typography gutterBottom component="h3">
              {this.state.editor_name}
            </Typography>
          </Box>
          {/*  팔로우 */}
          <Box p={1} order={3}>
            <Follow 
              user_id={this.state.editor_id}
              stateRefresh={this.stateRefresh}
              post_id={this.state.editor_post_id}
              follow_exist={this.state.follow_exist}
            />
          </Box>
          <Box p={1} order={4}>
            <RateEditorPostSatisfaction editor_post_id={this.state.editor_post_id} stateRefresh={this.stateRefresh} />
          </Box>
          <Box p={1} order={5}>
            <Typography gutterBottom component="h3">
              별점 : {this.state.average_satisfaction}점
          </Typography>
          </Box>
          <Box p={1} order={6}>
            <Typography gutterBottom component="h3">
              조회수 : {this.state.view_count}회
          </Typography>
          </Box>
          <Box p={1} order={7}>
            <Typography gutterBottom component="h3">
              업로드 일자 : {this.state.upload_date}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" p={1}>
        <Typography gutterBottom component="h3">
              {this.state.content}
        </Typography>
        </Box>

        <Divider />

        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.pageTitle}>
              댓글
        </Typography>

        <Divider />

        <Typography gutterBottom variant="h5" component="h2" style={{ textDecoration: 'none' }} className={classes.recommendEditorPost}>
              추천 영상
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(EditorPost);