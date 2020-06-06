import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListSubheader from '@material-ui/core/ListSubheader';
import { BrowserRouter, HashRouter, Route, Switch, Link, NavLink, useParams } from 'react-router-dom';

import MyEditorPostList from '../EditorPostManagement/MyEditorPostList';
import RecommendEditorPostList from '../EditorPostManagement/RecommendEditorPostList';
import FollowEditorPostList from '../EditorPostManagement/FollowEditorPostList';
import EditorPost from '../EditorPostManagement/EditorPost';
import Login from '../UserManagement/Login';
import Logout from '../UserManagement/Logout';
import SignUp from '../UserManagement/SignUp';
import MyYoutuberPostList from '../youtuberPostManagement/MyYoutuberPostList';
import FollowYoutuberPostList from '../youtuberPostManagement/FollowYoutuberPostList';
import EveryYoutuberPostList from '../youtuberPostManagement/EveryYoutuberPostList';
import RecommendYoutuberPostList from '../youtuberPostManagement/RecommendYoutuberPostList';
import YoutuberPostUpload from '../youtuberPostManagement/YoutuberPostUpload';
import YoutuberPost from '../youtuberPostManagement/YoutuberPost';
import YoutuberPostModify from '../youtuberPostManagement/YoutuberPostModify';
import LookUpJobApplication from '../youtuberPostManagement/LookUpJobApplication';

import MyProfile from '../UserManagement/MyProfile';
import ProfileModify from '../UserManagement/ProfileModify';

const drawerWidth = 240;

// 스타일
const styles = theme => ({
    root: {
        display: 'flex',
    
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,

    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },


    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing(2),
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    context: {
        padding: theme.spacing(3),
        paddingTop: theme.spacing(10),
    }
});
// 여기까지 스타일

// 유튜브 이미지 값
var str = 'https://www.youtube.com/watch?v=YWwoO3_RnFM';
var str2 = str.substr(str.length - 11, 11);
var str3 = "https://img.youtube.com/vi/";
var str4 = "/0.jpg";
var result = str3.concat(str2 + str4);

// 클래스
class Context extends Component {
    state = {
        anchorEl: null,
        open: false,
        //context: <MyEditorPostList></MyEditorPostList>,
        //context: <FollowEditorPostList/>,
        context: "<" + this.props.context + " />"
    }


    handleDrawerOpen = () => {
        this.setState({
            open: true
        })
    };

    handleDrawerClose = () => {
        this.setState({
            open: false
        })
    };

    //프로필 메뉴 open
    handleProfileMenuOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    // menu 닫기
    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };


    render() {
        //const classes = styles;
        const isMenuOpen = Boolean(this.state.anchorEl);
        const { classes } = this.props;
        const myPageUrl = "/myPage/profile/" + localStorage.getItem("user_id");

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={this.menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose} alignItems="center">내 프로필</MenuItem>
                <MenuItem onClick={this.handleMenuClose}><Logout /></MenuItem>
                
            </Menu>
        );
        
        
        
        
        return (

            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <Typography component="h7" variant="h8" color="inherit" noWrap className={classes.title}>
                        for Editor and Youtuber
                    </Typography> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
                            YE-Connector
                    </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="사용자/영상 검색"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            ><AccountCircle />
                            
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}

                //open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {/* <List>{MainListItems}</List> */}
                    {/* 영상 게시물, 유튜버 게시물, 마이 페이지 선택 메뉴 */}
                    <List>
                        <NavLink exact to="/editorPost/followEditorPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="영상 게시물" />
                            </ListItem>
                        </NavLink>
                        <NavLink to="/YoutuberPost/followYoutuberPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowYoutuberPostList");
                        }.bind(this)}>
                            <ListItem button>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="구인 공고" />
                            </ListItem>
                        </NavLink>
                        <NavLink to={myPageUrl} style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("MyProfile");
                        }.bind(this)}>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="마이 페이지" />
                            </ListItem>
                        </NavLink>
                    </List>
                    <Divider />
                    {/* 하위 선택 메뉴 */}
                    <List>
                        <Switch>
                            <Route path="/editorPost">
                                <ListSubheader inset>영상 게시물</ListSubheader>
                                {localStorage.getItem("qualification") === "editor"
                                    ? <NavLink to="/editorPost/myEditorPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                                        this.props.onClick("MyEditorPostList");
                                    }.bind(this)}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AssignmentIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="나의 게시물" />
                                        </ListItem>
                                    </NavLink>
                                    : null
                                }
                                
                                <NavLink to="/editorPost/recommendEditorPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("RecommendEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="추천된 영상 게시물" />
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/editorPost/followEditorPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="팔로우한 편집자" />
                                    </ListItem>
                                </NavLink>
                            </Route>

                            <Route path="/youtuberPost">
                                <ListSubheader inset>구인 공고</ListSubheader>
                                {localStorage.getItem("qualification") === "youtuber"
                                    ? <NavLink to="/youtuberPost/myYoutuberPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                                        this.props.onClick("FollowEditorPostList");
                                    }.bind(this)}>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <AssignmentIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="나의 구인 공고" />
                                        </ListItem>
                                    </NavLink>
                                    : null
                                }
                                <NavLink to="/youtuberPost/followYoutuberPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="팔로우한 유튜버" />
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/youtuberPost/recommendYoutuberPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="추천된 구인 공고" />
                                    </ListItem>
                                </NavLink>
                                <NavLink to="/youtuberPost/everyYoutuberPost" style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="전체 구인 공고" />
                                    </ListItem>
                                </NavLink>
                            </Route>

                            <Route path="/myPage">
                                <ListSubheader inset>마이 페이지</ListSubheader>
                                <NavLink to={myPageUrl} style={{ textDecoration: 'none' }} onClick={function (e) {
                            this.props.onClick("FollowEditorPostList");
                        }.bind(this)}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AssignmentIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="프로필" />
                                    </ListItem>
                                </NavLink>
                            </Route>

                        </Switch>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.context}>
                        
                        <Switch>
                            <Route exact path="/editorPost/followEditorPost"><FollowEditorPostList /></Route>
                            <Route exact path="/editorPost/myEditorPost"><MyEditorPostList /></Route>
                            <Route exact path="/editorPost/recommendEditorPost"><RecommendEditorPostList /></Route>
                            <Route exact path="/youtuberPost/myYoutuberPost"><MyYoutuberPostList /></Route>
                            <Route exact path="/youtuberPost/followYoutuberPost"><FollowYoutuberPostList /></Route>
                            <Route exact path="/youtuberPost/everyYoutuberPost"><EveryYoutuberPostList /></Route>
                            <Route exact path="/youtuberPost/recommendYoutuberPost"><RecommendYoutuberPostList /></Route>
                            <Route exact path="/youtuberPost/youtuberPostUpload"><YoutuberPostUpload /></Route>
                            <Route exact path="/login"><Login /></Route>
                            {/* <Route path="/editorPost/:editor_post_id"><EditorPost/></Route> */}
                            <Route path="/editorPost/:editor_post_id" component={EditorPost}></Route>
                            <Route exact path="/signUp"><SignUp /></Route>

                            <Route exact path="/youtuberPost/:youtuber_post_id" component={YoutuberPost}></Route>
                            <Route exact path="/youtuberPost/youtuberPostModify/:youtuber_post_id" component={YoutuberPostModify}></Route>
                            <Route exact path="/youtuberPost/lookUpJobApplication/:youtuber_post_id" component={LookUpJobApplication}></Route>

                            <Route exact path="/mypage/profile/:user_id" component={MyProfile}></Route>
                            <Route exact path="/myPage/profileModify/:user_id" component={ProfileModify}></Route>
                            
                            
                            {console.log(window.location.href)}
                            {window.location.href === "http://localhost:3000/#/" ? localStorage.getItem('user_id') == null 
                            ? window.location.href = "/#/login" 
                            : window.location.href = "/#/editorPost/followEditorPost"
                            
                            : null
                            
                            }
                            
                        </Switch>
                    </div>
                </main>
            </div>
        );
    }
} export default withStyles(styles)(Context);
