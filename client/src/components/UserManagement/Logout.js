import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class Logout extends Component {
    logout = () => {
        localStorage.clear();
        alert("로그아웃 되셨습니다.")
        window.location.href = "/#/login";
    }

    render() {

        return (
            <div>
                <GoogleLogout
                    clientId="496679002793-62hpbnq8hrl68krd671usqjhfkcq0glm.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                />
            </div>
        );
    }
}

export default Logout;