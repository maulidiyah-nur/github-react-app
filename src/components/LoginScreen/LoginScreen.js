import * as React from "react";
import PropTypes from "prop-types";
import { Container, Content, Header, Button, Text, Icon, Left, Right, View, Form, Item, Input, Label, Body } from "native-base";
import style from "./LoginScreen.style";

class Login extends React.Component {
    static propTypes = {
        loginForm: PropTypes.shape({
            label: PropTypes.string,
            secureTextEntry: PropTypes.bool,
            onChange: PropTypes.func,
            error: PropTypes.bool,
            errorMessage: PropTypes.string
        }),
        loginHeader: PropTypes.shape({
            title: PropTypes.string,
            subtitle: PropTypes.string,
            leftButton: PropTypes.shape({
                action: PropTypes.func,
                text: PropTypes.string,
                icon: PropTypes.string
            }),
            rightButton: PropTypes.shape({
                action: PropTypes.func,
                text: PropTypes.string,
                icon: PropTypes.string
            })
        }),
        loginButton: PropTypes.shape({
            action: PropTypes.func,
            text: PropTypes.string,
            icon: PropTypes.string
        })
    };

	render() {
        const { loginForm, loginHeader, loginButton } = this.props;
		return (
			<Container style={style.container}>
                {
                    loginHeader && <Header style={style.header} iosStatusbar="light-content" androidStatusBarColor="#000000">
                        { loginHeader.leftButton && <Left>
                                <Button transparent onPress={() => loginHeader.leftButton.action && loginHeader.leftButton.action()}>
                                    { loginHeader.leftButton.icon && <Icon name={ loginHeader.leftButton.icon } /> }
                                    { loginHeader.leftButton.text && <Text>{ loginHeader.leftButton.text }</Text> }
                                </Button>
                            </Left>
                        }
                        <Body/>
                        { loginHeader.rightButton && <Right>
                                <Button transparent onPress={() => loginHeader.rightButton.action && loginHeader.rightButton.action()}>
                                    { loginHeader.rightButton.icon && <Icon name={ loginHeader.rightButton.icon } /> }
                                    { loginHeader.rightButton.text && <Text>{ loginHeader.rightButton.text }</Text> }
                                </Button>
                            </Right>
                        }
                    </Header>
                }
				<Content style={style.content} contentContainerStyle={style.contentContainer}>
                    { loginHeader && loginHeader.title && <Text style={style.headerTitle}>{loginHeader.title}</Text> }
                    { loginHeader && loginHeader.subtitle && <Text style={style.headerSubTitle}>{loginHeader.subtitle}</Text> }
                    {
                        loginForm && <Form>
                            <Item style={style.input} error={ loginForm.error }>
                                { loginForm.label && <Label style={style.inputChild}>{ loginForm.label }</Label> }
                                <Input
                                    autoFocus={true}
                                    style={style.inputChild}
                                    secureTextEntry={loginForm.secureTextEntry}
                                    onChangeText={(value) => { loginForm.onChange(value); }}
                                />
                            </Item>
                            { loginForm.error && <Text style={style.errorMessage}>{loginForm.errorMessage}</Text> }
                        </Form>
                    }
                    {
                        loginButton && <View style={style.button}>
                            <Button rounded light onPress={() => loginButton.action && loginButton.action()}>
                            { loginButton.text && <Text>{ loginButton.text }</Text> }
                            { loginButton.icon && <Icon name={ loginButton.icon } /> }
                            </Button>
                        </View>
                    }
				</Content>
			</Container>
		);
	}
}

export default Login;
