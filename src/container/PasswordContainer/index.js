// @flow
import React from "react";
import Simple from "../../components/SimpleScreen/SimpleScreen";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import PropTypes from "prop-types";

@inject("store")
@observer
class PasswordContainer extends React.Component {
	@observable loginButton = undefined;

	static propTypes = {
		store: PropTypes.shape(),
		navigation: PropTypes.shape()
	}

	renderForm = {
        label: "your password",
        secureTextEntry: true,
		onChange: (value) => {
			this.props.store.password = value;
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
        const store = this.props.store;
        await store.login();
        if (store.error){
            this.props.navigation.navigate("Username");
        } else {
            this.props.navigation.navigate("Drawer");
        }
	};

	render() {
		return (
			<Simple
				form={this.renderForm}
				button={this.loginButton}
				header={this.renderHeader}/>
        );
	}
}
export default PasswordContainer;
