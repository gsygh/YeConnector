import FollowEditorPostList from "../../components/EditorPostManagement/FollowEditorPostList";
import {connect} from 'react-redux';


// addnumber는 event props만 전달하고 상태를 전달하지는 않기 때문에
// 첫번째 인자는 null 이다.

function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function(context){ 
            dispatch({type:'CHANEGECONTEXT', context:context});
            console.log(context);
            
        }
    }
}
// redux의 Dispatch를 react의 props로 연결해준다.
// wrapp한 addnumber의 props값을 전달해야 하는 이벤트 값을
// property 이름으로 줌(onClick)
// property 값으로는 함수를 줌
// 첫번째 파라메타로 store.dispatch API를 공급해줌
// -> 별도로 store.dispatch를 하지 않고 그냥 dispatch를 사용하면 됨

function mapReduxStateToReactProps(state) {
    console.log(state.context);
    return {
        context: state.context
        
        
    } // 객체를 반환
}
// redux의 state를 react의 props로 매핑
// redux에서 store의 값이 변경될 때마다 함수가 호출
// 호출될 때 redux의 state 값을 인자로 받음
// 전달하고자 하는 값을 넣으면 됨
// 해당 state는 redux store의 state임
// State 선언, store.subscribe(), 컴포넌트에 number 전달 역할을 모두 함
export default connect(
    mapReduxStateToReactProps, mapReduxDispatchToReactProps
    )(FollowEditorPostList);


