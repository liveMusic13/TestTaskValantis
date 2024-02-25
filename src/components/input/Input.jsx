import styles from './Input.module.scss';

const Input = ({ id, dataFields, setDataFields }) => {
	const value =
		id === 'Название'
			? dataFields.product
			: id === 'Цена'
			? dataFields.price
			: dataFields.brand;

	const handleChange = event => {
		const fieldToUpdate =
			id === 'Название' ? 'product' : id === 'Цена' ? 'price' : 'brand';

		setDataFields({
			...dataFields,
			[fieldToUpdate]: event.target.value,
		});
	};

	return (
		<label htmlFor={id}>
			{id}{' '}
			<input
				type='text'
				className={styles.input}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</label>
	);
};

export default Input;
