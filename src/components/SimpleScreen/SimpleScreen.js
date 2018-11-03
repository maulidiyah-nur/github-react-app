import * as React from "react";
import PropTypes from "prop-types";
import { Container, Content, Header, Button, Text, Icon, Left, Right, View, Form, Item, Input, Label, Body } from "native-base";
import style from "./SimpleScreen.style";

class Simple extends React.Component {
    static propTypes = {
        theme: PropTypes.shape({
            backgroundColor: PropTypes.string,
            textColor: PropTypes.string
        }),
        status: PropTypes.shape({
            error: PropTypes.bool,
            errorMessage: PropTypes.string
        }),
        form: PropTypes.shape({
            label: PropTypes.string,
            placeholder: PropTypes.string,
            secureTextEntry: PropTypes.bool,
            onChange: PropTypes.func
        }),
        header: PropTypes.shape({
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
        button: PropTypes.shape({
            action: PropTypes.func,
            text: PropTypes.string,
            icon: PropTypes.string
        })
    };

	render() {
        const { form, header, button, theme, status } = this.props;
        const backgroundColor = theme && theme.backgroundColor ? theme.backgroundColor : "#000000";
        const textColor = theme && theme.textColor ? theme.textColor : "#FFFFFF";
		return (
			<Container style={[style.container, { backgroundColor: backgroundColor }]}>
                {
                    header && <Header style={style.header} iosStatusbar="light-content" androidStatusBarColor={backgroundColor}>
                        { header.leftButton && <Left>
                                <Button transparent onPress={() => header.leftButton.action && header.leftButton.action()}>
                                    { header.leftButton.icon && <Icon style={{color: textColor }} name={ header.leftButton.icon } /> }
                                    { header.leftButton.text && <Text style={{color: textColor }}>{ header.leftButton.text }</Text> }
                                </Button>
                            </Left>
                        }
                        <Body/>
                        { header.rightButton && <Right>
                                <Button transparent onPress={() => header.rightButton.action && header.rightButton.action()}>
                                    { header.rightButton.icon && <Icon style={{color: textColor }} name={ header.rightButton.icon } /> }
                                    { header.rightButton.text && <Text style={{color: textColor }}>{ header.rightButton.text }</Text> }
                                </Button>
                            </Right>
                        }
                    </Header>
                }
				<Content style={style.content} contentContainerStyle={style.contentContainer}>
                    { header && header.title && <Text style={[style.headerTitle, {color: textColor}]}>{header.title}</Text> }
                    { header && header.subtitle && <Text style={[style.headerSubTitle, {color: textColor}]}>{header.subtitle}</Text> }
                    {
                        form && <Form>
                            <Item style={[style.input, {borderBottomColor: textColor}]} error={ status && status.error }>
                                { form.label && <Label style={{color: textColor}}>{ form.label }</Label> }
                                <Input
                                    autoFocus={true}
                                    placeholder={form.placeholder && form.placeholder}
                                    style={{color: textColor}}
                                    secureTextEntry={form.secureTextEntry}
                                    onChangeText={(value) => { form.onChange(value); }}
                                />
                            </Item>
                            { status && status.error && <Text style={style.errorMessage}>{status.errorMessage}</Text> }
                        </Form>
                    }
                    {
                        button && <View style={style.button}>
                            <Button rounded style={{backgroundColor: textColor}} onPress={() => button.action && button.action()}>
                            { button.text && <Text style={{color: backgroundColor}}>{ button.text }</Text> }
                            { button.icon && <Icon style={{color: backgroundColor}} name={ button.icon } /> }
                            </Button>
                        </View>
                    }
				</Content>
			</Container>
		);
	}
}

export default Simple;
