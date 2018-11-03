import React from "react";
import Login from "./LoginScreen";
import renderer from "react-test-renderer";

const loginForm = jest.fn();
const button = {
    action: jest.fn(),
    text: "button",
    icon: "add"
};
const loginHeader = {
    title: "Login Header",
    leftButton: button,
    rightButton: button
};
const loginButton = button;

it("renders correctly", () => {
	const tree = renderer.create(<Login loginForm={loginForm} loginHeader={loginHeader} loginButton={loginButton} />).toJSON();
	expect(tree).toMatchSnapshot();
});
