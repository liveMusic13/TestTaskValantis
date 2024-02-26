import { useEffect, useState } from 'react';
import { goodsService } from '../../services/goods.service';
import Input from '../input/Input';
import Pagination from '../pagination/Pagination';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorState, setErrorState] = useState({
		isError: false,
		status: 0,
	});
	const [items, setItems] = useState([]);
	const [dataFields, setDataFields] = useState({
		product: '',
		price: '',
		brand: '',
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(50);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = items?.result?.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = pageNumber => setCurrentPage(pageNumber);

	const totalPages = Math.ceil(items?.result?.length / itemsPerPage);

	const handleBackButtonClick = () => {
		if (currentPage === 1) {
			setCurrentPage(totalPages);
		} else {
			setCurrentPage(prev => prev - 1);
		}
	};

	const handleForwardButtonClick = () => {
		if (currentPage === totalPages) {
			setCurrentPage(1);
		} else {
			setCurrentPage(prev => prev + 1);
		}
	};

	useEffect(() => {
		goodsService.getIdItems(
			setIsLoading,
			setErrorState,
			goodsService.getItems,
			setItems,
			dataFields
		);
	}, []);

	return (
		<div className='wrapper_content'>
			<div className='block-title'>
				<h1 className='title'>Товары</h1>
				<div className='block-filter'>
					<h2>Фильтры:</h2>
					<div className='block-form'>
						<Input
							id='Название'
							dataFields={dataFields}
							setDataFields={setDataFields}
						/>
						<Input
							id='Цена'
							dataFields={dataFields}
							setDataFields={setDataFields}
						/>
						<Input
							id='Бренд'
							dataFields={dataFields}
							setDataFields={setDataFields}
						/>
						<button
							className='button-form'
							onClick={() =>
								goodsService.getFilters(
									setIsLoading,
									setItems,
									setErrorState,
									goodsService.getItems,
									dataFields
								)
							}
						>
							Поиск
						</button>
					</div>
				</div>
			</div>
			{isLoading ? (
				'loading...'
			) : errorState.isError ? (
				`Произошла ошибка номер ${errorState.status}. Попробуйте обновить ещё раз.`
			) : (
				<>
					<div className='block__recipes'>
						{currentItems?.map((elem, index) => {
							return (
								<div key={elem.id + Math.random()} className='block__recipe'>
									<span>{(currentPage - 1) * itemsPerPage + index + 1}. </span>
									<div className='content'>
										<p className='paragraph'>
											<span className='brand'>
												{elem.brand !== null ? elem.brand : 'бренда.нет'}
											</span>
											{elem.product}
										</p>
										<div className='block-price'>
											<p>Id товара - {elem.id}</p>
											<p>Цена - {elem.price}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className='block__pagination'>
						<button
							className='button-pagination'
							onClick={handleBackButtonClick}
						>
							back
						</button>
						<Pagination
							itemsPerPage={itemsPerPage}
							totalItems={
								items && items.result && items.result.length
									? items.result.length
									: 0
							}
							paginate={paginate}
							currentPage={currentPage}
						/>
						<button
							className='button-pagination'
							onClick={handleForwardButtonClick}
						>
							go
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default App;
