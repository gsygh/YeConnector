import MyEditorPostList from "../../components/EditorPostManagement/MyEditorPostList";
import {connect} from 'react-redux';


// addnumber는 event props만 전달하고 상태를 전달하지는 않기 때문에
// 첫번째 인자는 null 이다.

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
    )(MyEditorPostList);





// AddNumber.js의 재사용성을 위해 속임수와 같은 개념으로
// 이 곳에 AddNumber를 불러와 사용
// 즉, store와 Addnumber의 분리를 위함
// export default class extends Component {
//     render() {
//         return (
//             <AddNumber onClick={function(size){
//                 store.dispatch({type:'INCREMENT', size:size});
//             }.bind(this)}/>
//         );
//     }
// }