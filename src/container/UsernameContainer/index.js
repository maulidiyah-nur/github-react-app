// @flow
import React from "react";
import Simple from "../../components/SimpleScreen/SimpleScreen";
import { AsyncStorage } from "react-native";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";

@inject("store")
@observer
class UsernameContainer extends React.Component {
	@observable loginButton = undefined;

	static propTypes = {
		store: PropTypes.shape(),
		navigation: PropTypes.shape()
	}

	async componentWillMount() {
		const store = this.props.store;
		AsyncStorage.getItem("profile").then(async (profile) => {
			if (profile !== null){
				store.username = await AsyncStorage.getItem("username");
				store.password = await AsyncStorage.getItem("password");
				await store.login();
				if (!store.error){
					this.props.navigation.navigate("Drawer");
				}
			} 
		});     
	}

	renderForm = {
		label: "your username",
		secureTextEntry: false,
		onChange: (value) => {
			this.props.store.username = value;
			if (value.length > 0) {
				this.loginButton = this.renderButton;
			} else {
				this.loginButton = undefined;
			}
		}
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
			<Simple
				status={{
					error: this.props.store.error,
					errorMessage: this.props.store.errorMessage
				}}
				form={this.renderForm}
				button={this.loginButton}
				header={this.renderHeader}/>
        );
	}
}
export default UsernameContainer;
