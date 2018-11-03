// @flow
import React from "react";
import Simple from "../../components/SimpleScreen/SimpleScreen";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject("store")
@observer
class SearchContainer extends React.Component {

	static propTypes = {
		store: PropTypes.shape(),
		navigation: PropTypes.shape()
	}

	componentWillMount() {
		this.props.store.keyword = "facebook/react-native";
	}

	renderForm = {
		label: "http://github.com/",
		placeholder: "facebook/react-native",
        secureTextEntry: false,
		onChange: (value) => {
			this.props.store.keyword = value;
		}
	};

	renderHeader = {
        title: "Search Github Repositories",
		subtitle: "Find something interestinng",
		rightButton: {
			icon: "log-out",
			action: () => {
				this.logout();
			}
		}
	};

	logout = () => {
        this.props.store.logout();
        this.props.navigation.navigate("Username");
    }

	renderButton = {
		text : "Search",
		icon: "arrow-round-forward",
		action: () => {
			this.search();
		}
	};

	search = async () => {
		const store = this.props.store;
        await store.search();
        if (!store.error){
            this.props.navigation.navigate("Repository");
        }
	};

	render() {
		return (
			<Simple
                theme={{
					backgroundColor:"#FFFFFF",
					textColor:"#000000"
				}}
				status={{
					error: this.props.store.error,
					errorMessage: this.props.store.errorMessage
				}}
				form={this.renderForm}
				button={this.renderButton}
				header={this.renderHeader}/>
        );
	}
}
export default SearchContainer;
