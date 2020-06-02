import {createStore} from 'redux';

export default createStore(function(state, action){
    // state는 redux의 state, action은 react의 요청
    if(state === undefined) {
        return {context: "FollowEditorPostList"}
    }
    if(action.type === 'CHANEGECONTEXT') {
        return {...state, context: action.context}
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 