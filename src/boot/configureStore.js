import RepositoryStore from "../store/RepositoryStore/RepositoryStore";
import UserStore from "../store/UserStore/UserStore";

export default function() {
	const repositoryStore = new RepositoryStore();
	const userForm = new UserStore();

	return {
		userForm,
		repositoryStore,
	};
}
