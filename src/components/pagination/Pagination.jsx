const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const maxPageNumbersToShow = 5;

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	let startPage = 1;
	let endPage = totalPages;

	if (totalPages > maxPageNumbersToShow) {
		if (currentPage <= 3) {
			endPage = maxPageNumbersToShow;
		} else if (currentPage + 2 >= totalPages) {
			startPage = totalPages - 4;
		} else {
			startPage = currentPage - 2;
			endPage = currentPage + 2;
		}
	}

	const paginationItems = pageNumbers.slice(startPage - 1, endPage);

	return (
		<nav>
			<ul className='pagination-menu'>
				{currentPage > 3 && totalPages > maxPageNumbersToShow && (
					<>
						<li
							className={`pagination-menu_list ${
								currentPage === 1 ? 'active' : ''
							}`}
							onClick={() => paginate(1)}
						>
							1
						</li>
						<li>...</li>
					</>
				)}
				{paginationItems.map(number => (
					<li
						className={`pagination-menu_list ${
							currentPage === number ? 'active' : ''
						}`}
						key={number}
						onClick={() => paginate(number)}
					>
						{number}
					</li>
				))}
				{currentPage + 2 < totalPages && totalPages > maxPageNumbersToShow && (
					<>
						<li>...</li>
						<li
							className={`pagination-menu_list ${
								currentPage === totalPages ? 'active' : ''
							}`}
							onClick={() => paginate(totalPages)}
						>
							{totalPages}
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Pagination;
