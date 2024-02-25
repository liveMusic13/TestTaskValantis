import { $axios } from '../api';

const uniqueIds = data => {
	return Array.from(new Set(data));
};

export const goodsService = {
	getIdItems: async (setIsLoading, setErrorState, getItems, setItems) => {
		setIsLoading(true);
		try {
			const response = await $axios.post('', {
				action: 'get_ids',
				params: { offset: 0 },
			});

			await getItems(
				setIsLoading,
				setItems,
				setErrorState,
				uniqueIds(response.data.result)
			);
		} catch (error) {
			setErrorState({ isError: true, status: error.response.status });
		} finally {
			setIsLoading(false);
		}
	},
	getFilters: async (
		setIsLoading,
		setItems,
		setErrorState,
		getItems,
		dataFields
	) => {
		setIsLoading(true);
		try {
			const params = {};
			if (dataFields.product) params.product = dataFields.product;
			if (dataFields.price) params.price = Number(dataFields.price);
			if (dataFields.brand) params.brand = dataFields.brand;

			const response = await $axios.post('', {
				action: 'filter',
				params: params,
			});
			console.log(params);
			await getItems(
				setIsLoading,
				setItems,
				setErrorState,
				uniqueIds(response.data.result)
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	},
	getItems: async (setIsLoading, setItems, setErrorState, data) => {
		setIsLoading(true);

		try {
			const response = await $axios.post('', {
				action: 'get_items',
				params: { ids: data },
			});

			setItems(response.data);
		} catch (error) {
			setErrorState({ isError: true, status: error.response.status });
		} finally {
			setIsLoading(false);
		}
	},
};
