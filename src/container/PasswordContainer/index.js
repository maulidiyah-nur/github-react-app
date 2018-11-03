// @flow
import * as React from "react";
import { Container, Text } from "native-base";
import { observer } from "mobx-react/native";

@observer
export default class PasswordContainer extends React.Component {
	render() {
		return (
        <Container>
            <Text>
            PasswordContainer
            </Text>
        </Container>
        );
	}
}
