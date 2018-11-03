// @flow
import React from "react";
import Login from "../../components/LoginScreen/LoginScreen";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";

@inject("userStore")
@observer
class PasswordContainer extends React.Component {
	@observable loginButton = undefined;

	static propTypes = {
		userStore: PropTypes.shape(),
		navigation: PropTypes.shape()
	}

	renderForm = {
        label: "your password",
        secureTextEntry: true,
		onChange: (value) => {
			this.props.userStore.password = value;
			if (value.length > 0) {
				this.loginButton = this.renderButton;
			} else {
				this.loginButton = undefined;
			}
		}
	};

	renderHeader = {
        title: "Welcome to GitHub",
        subtitle: "One step ahead to to your repository",
        leftButton: {
            icon: "arrow-round-back",
            action: () => {
                this.back();
            }
        }
    };

    back = () => {
        this.props.navigation.goBack();
    };

	renderButton = {
		text : "Login",
		icon: "arrow-round-forward",
		action: () => {
			this.login();
		}
	};

	login = async () => {
        const userStore = this.props.userStore;
        await userStore.login();
        if (userStore.error){
            this.props.navigation.navigate("Username");
        } else {
            this.props.navigation.navigate("Drawer");
        }
	};

	render() {
		return (
			<Login
				loginForm={this.renderForm}
				loginButton={this.loginButton}
				loginHeader={this.renderHeader}/>
        );
	}
}
export default PasswordContainer;
