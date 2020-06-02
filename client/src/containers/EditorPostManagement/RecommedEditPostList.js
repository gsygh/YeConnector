function mapReduxDispatchToReactProps(dispatch) {
    return {
        onClick: function(context){ 
            dispatch({type:'CHANEGECONTEXT', context:context});
        }
    }
}
// redux의 Dispatch를 react의 props로 연결해준다.
// wrapp한 addnumber의 props값을 전달해야 하는 이벤트 값을
// property 이름으로 줌(onClick)
// property 값으로는 함수를 줌
// 첫번째 파라메타로 store.dispatch API를 공급해줌
// -> 별도로 store.dispatch를 하지 않고 그냥 dispatch를 사용하면 됨

export default connect(
    null, mapReduxDispatchToReactProps
    )(FollowEditorPostList);