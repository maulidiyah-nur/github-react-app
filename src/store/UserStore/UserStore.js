import { observable, action } from "mobx";
import GitHub from "github-api";

class UserStore {
    @observable username = "";
    @observable password = "";
    @observable error = false;
    @observable errorMessage = "";
    @observable profile = {};

    @action
    async login() {
        const gh = new GitHub({
            username: this.username,
            password: this.password
        });
        const user = gh.getUser(this.username);
        await user.getProfile((err, res) => {
            if (err === null && res) {
                this.error = false;
                this.profile = res;
                this.errorMessage = "";
            } else {
                this.error = true;
                this.errorMessage = "username or password is invalid";
            }
        });
    }
}

export default UserStore;
