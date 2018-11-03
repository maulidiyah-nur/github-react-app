import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import GitHub from "github-api";

class Store {
    @observable error = false;
    @observable errorMessage = "";

    @observable username = "";
    @observable password = "";
    @observable profile = null;

    @observable keyword = "facebook/react-native";
    @observable repository = null;
    @observable commits = [];

    @action
    async login() {
        const gh = new GitHub({
            username: this.username,
            password: this.password
        });
        const user = gh.getUser(this.username);
        await user.getProfile(async(err, res) => {
            if (err === null && res) {
                await AsyncStorage.setItem("username", this.username);
                await AsyncStorage.setItem("password", this.password);
                await AsyncStorage.setItem("profile", JSON.stringify(res));
                this.error = false;
                this.profile = res;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = "username or password is invalid";
            }
        });
    }

    @action
    async logout() {
        this.error = false;
        this.errorMessage = "";

        this.username = "";
        this.password = "";
        this.profile = null;

        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("profile");

        this.keyword = "facebook/react-native";
        this.repository = null;
        this.commits = [];
    }

    @action
    async search(){
        const words = this.keyword.split("/");
        if (words.length !== 2) {
            this.error = true;
            this.errorMessage = "Repository name is invalid";
        } else {
            const gh = new GitHub({
                username: this.username,
                password: this.password
            });
            const repo = gh.getRepo(words[0], words[1]);
            await repo.getDetails(async (err, res) => {
                if (err === null && res) {
                    this.error = false;
                    this.repository = res;
                    this.errorMessage = "";
                    await repo.listCommits({}, (_err, _res) => {
                        if (_err === null && _res) {
                            this.commits = _res;
                        }
                    });
                } else {
                    this.error = true;
                    this.errorMessage = "Repository not found";
                }
            });
        }
    }
}

export default Store;
