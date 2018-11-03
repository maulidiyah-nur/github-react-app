// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";

import Username from "./container/UsernameContainer/Username";
import Password from "./container/PasswordContainer/Password";

import Search from "./container/SearchContainer";
import Repository from "./container/RepositoryContainer";

const Drawer = DrawerNavigator(
	{
		Search: { screen: Search },
		Repository: { screen: Repository }
	},
	{
		initialRouteName: "Search"
	}
);

const App = StackNavigator(
	{
		Username: { screen: Username },
		Password: { screen: Password },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "Username",
		headerMode: "none",
	}
);

export default () => (
	<Root>
		<App />
	</Root>
);
