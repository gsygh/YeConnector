export async function loginCheck() {
    let result = await localStorage.getItem('user_id');
    if (result === null) {
        alert("잘못된 접근입니다.");
        window.location.href = '/#/login';
        return false;
    }
    else {
        console.log(result);
        return true;
    }
}

export async function isYoutuberCheck() {
    let qualification = await localStorage.getItem('qualification');
    if (qualification === null || qualification !== "youtuber") {
        alert("잘못된 접근입니다.");
        if(localStorage.getItem('user_id') === null) {
            window.location.href = '/#/login';
        }
        else {
            window.location.href = '/#/editorPost/followEditorPost';
        }
        return false;
    }
    else {
        console.log(qualification);
        return true;
    }
}
// export async function loginCheck() {
//     const loggedInfo = await localStorage.getItem('auth');
//     if (loggedInfo === null) {
//         alert("잘못된 접근입니다.");
//         window.location.href = '/#/login';
//         return false;
//     }
//     else {
//         console.log(loggedInfo);
//         return true;
//     }
// }