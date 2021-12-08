import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

export default function useAxios() {
	const apiClient = axios.create({
		baseURL: url,
	});

	return apiClient;
}
