// @flow
import * as React from "react";
import { Container, Icon, Header, Subtitle, Left, Button, Body, Title, Content, List, ListItem, Thumbnail, Text, Right } from "native-base";
import { observer, inject } from "mobx-react/native";
import PropTypes from "prop-types";
import Moment from "moment";
import style from "./index.style";

@inject("store")
@observer
export default class RepositoryContainer extends React.Component {
    static propTypes = {
		store: PropTypes.shape(),
		navigation: PropTypes.shape()
    }

    back = () => {
        this.props.navigation.goBack();
    }

    logout = () => {
        this.props.store.logout();
        this.props.navigation.navigate("Username");
    }

	render() {
		return (
        <Container style={style.container}>
            <Header style={style.header} iosStatusbar="light-content" androidStatusBarColor="#000000">
                <Left>
                    <Button transparent onPress={() => { this.back(); }}>
                        <Icon style={style.headerTitle} name="arrow-round-back" />
                    </Button>
                </Left>
                <Body>
                    <Title style={style.headerTitle}>List of Commits</Title>
                    <Subtitle style={style.headerTitle}>{this.props.store.repository.full_name}</Subtitle>
                </Body>
                <Right>
                    <Button transparent onPress={() => { this.logout(); }}>
                        <Icon style={style.headerTitle} name="log-out" />
                    </Button>
                </Right>
            </Header>
            <Content>
                <List>
                    {
                        this.props.store.commits.map((c) => {
                            return (
                                <ListItem thumbnail key={c.sha}>
                                    <Left>
                                        <Thumbnail r source={{ uri: (c.author && c.author.avatar_url ? c.author.avatar_url : c.committer.avatar_url) }} />
                                    </Left>
                                    <Body>
                                        <Text>{c.commit.author.name}</Text>
                                        <Text note numberOfLines={2}>{c.commit.message}</Text>
                                    </Body>
                                    <Right>
                                        <Text note numberOfLines={1}>{Moment(c.commit.committer.date).format("MMM Do YY")}</Text>
                                        <Text note numberOfLines={1}>{Moment(c.commit.committer.date).format("h:mm:ss a")}</Text>
                                    </Right>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Content>
        </Container>
        );
	}
}
