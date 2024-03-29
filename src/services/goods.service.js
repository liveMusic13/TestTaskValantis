import { $axios } from '../api';

const uniqueIds = data => {
	return Array.from(new Set(data));
};

export const goodsService = {
	getIdItems: async (setIsLoading, setErrorState, getItems, setItems) => {
		setIsLoading(true);
		let retry = 0;
		while (retry < 3) {
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
				break;
			} catch (error) {
				if (error.response.status === 500) {
					retry++;
					if (retry === 3) {
						setErrorState({ isError: true, status: error.response.status });
					}
					console.log('ошибка номер: ', error.response.status);
				} else {
					setErrorState({ isError: true, status: error.response.status });
					break;
				}
			} finally {
				setIsLoading(false);
			}
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
		let retry = 0;
		while (retry < 3) {
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
				break;
			} catch (error) {
				console.log('ошибка номер: ', error.response.status);
				if (error.response.status === 500) {
					retry++;
					if (retry === 3) {
						console.log(error);
					}
				} else {
					console.log(error);
					break;
				}
			} finally {
				setIsLoading(false);
			}
		}
	},
	getItems: async (setIsLoading, setItems, setErrorState, data) => {
		setIsLoading(true);
		let retry = 0;
		while (retry < 3) {
			try {
				const response = await $axios.post('', {
					action: 'get_items',
					params: { ids: data },
				});

				setItems(response.data);
				break;
			} catch (error) {
				console.log('ошибка номер: ', error.response.status);
				if (error.response.status === 500) {
					retry++;
					if (retry === 3) {
						setErrorState({ isError: true, status: error.response.status });
					}
				} else {
					setErrorState({ isError: true, status: error.response.status });
					break;
				}
			} finally {
				setIsLoading(false);
			}
		}
	},
};
