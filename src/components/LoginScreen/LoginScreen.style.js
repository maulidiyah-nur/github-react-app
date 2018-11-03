import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
        backgroundColor: "#000000"
    },
    contentContainer: {
        justifyContent: "center",
        flex: 1
    },
    content: {
        padding: 30,
        flexWrap: "wrap"
    },
    header: {
        backgroundColor: "transparent"
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 40,
        marginRight: 50
    },
    headerSubTitle: {
        color: "#FFFFFF",
        fontSize: 13,
        marginRight: 50
    },
    input: {
        marginVertical: 30,
        marginLeft: 0,
        paddingRight: 0
    },
    inputChild: {
        color: "#FFFFFF"
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    errorMessage: {
        color: "red",
        fontSize: 10
    }
});
export default styles;
