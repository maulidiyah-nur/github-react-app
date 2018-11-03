import RepositoryStore from "../store/RepositoryStore/RepositoryStore";
import UserStore from "../store/UserStore/UserStore";

export default function() {
	const repositoryStore = new RepositoryStore();
	const userStore = new UserStore();

	return {
		userStore,
		repositoryStore,
	};
}
