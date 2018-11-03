// @flow
import React from "react";
import Login from "../../components/LoginScreen/LoginScreen";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";

@inject("userStore")
@observer
class UsernameContainer extends React.Component {
	@observable loginButton = undefined;

	static propTypes = {
		userStore: PropTypes.shape(),
		navigation: PropTypes.shape()
	}

	renderForm = {
		label: "your username",
		secureTextEntry: false,
		onChange: (value) => {
			this.props.userStore.username = value;
			if (value.length > 0) {
				this.loginButton = this.renderButton;
			} else {
				this.loginButton = undefined;
			}
		},
		error: this.props.userStore.error,
		errorMessage: this.props.userStore.errorMessage
	};

	renderHeader = {
		title: "Welcome to GitHub",
		subtitle: "Secure your project with world's #1 repository"
	};

	renderButton = {
		text : "Next",
		icon: "arrow-round-forward",
		action: () => {
			this.goToDrawer();
		}
	};

	goToDrawer = () => {
		this.props.navigation.navigate("Password");
	}

	render() {
		return (
			<Login
				loginForm={this.renderForm}
				loginButton={this.loginButton}
				loginHeader={this.renderHeader}/>
        );
	}
}
export default UsernameContainer;
