/*
    1DW = One value right with wrong index
    1DR = One value right with right index
    2DW = Two values right with wrong index
    ADW = All values wrong
*/

const dataOne = [
	{
		key: '1DW',
		value: [1, 4, 7],
	},
	{
		key: '1DR',
		value: [1, 8, 9],
	},
	{
		key: '2DW',
		value: [9, 6, 4],
	},
	{
		key: 'ADW',
		value: [5, 2, 3],
	},
	{
		key: '1DW',
		value: [2, 8, 6],
	},
];

const dataTwo = [
	{
		key: '1DR',
		value: [6, 8, 2],
	},
	{
		key: '1DW',
		value: [6, 1, 4],
	},
	{
		key: '2DW',
		value: [2, 0, 6],
	},
	{
		key: 'ADW',
		value: [7, 3, 8],
	},
	{
		key: '1DW',
		value: [3, 8, 0],
	},
];

const getUniqueArray = (data) => {
	const newArray = [];
	data.forEach((row) => {
		row.value.forEach((number) => {
			if (!newArray.includes(number)) {
				newArray.push(number);
			}
		});
	});
	return newArray;
};

const getValueArray = (data, key) => {
	return data.filter((row) => row.key === key).map((row) => row.value);
};

const findRightIndex = (wrongIndex, rightIndex) => {
	let indexes = [0, 1, 2];
	wrongIndex.forEach(
		(number) => (indexes = indexes.filter((n) => n !== number))
	);
	rightIndex.forEach(
		(number) => (indexes = indexes.filter((n) => n !== number))
	);
	return indexes[0];
};

const filterNumberArray = (numberArray, number) => {
	const newArray = numberArray.filter((n) => n !== number);
	return newArray;
};

const getAllNumbers = (data) => {
	const wrongArray = [];
	const rightArray = [];
	const rightIndexArray = [];
	let numberArray = getUniqueArray(data);

	const allPlaceWrong = getValueArray(data, 'ADW');
	// removing ADW values from options
	allPlaceWrong.forEach((number) => {
		numberArray = filterNumberArray(numberArray, number);
		wrongArray.push(number);
	});

	// comparing 1DR and 1DW to get first correct value
	const onePlaceWrong = getValueArray(data, '1DW');
	const onePlaceRight = data.find((row) => row.key === '1DR').value;
	onePlaceRight.forEach((rightNumber, rightIndex) => {
		onePlaceWrong.forEach((row) =>
			row.forEach((number, wrongIndex) => {
				if (number === rightNumber && rightIndex === wrongIndex) {
					numberArray = filterNumberArray(numberArray, number);
					wrongArray.push(number);
				}
			})
		);
	});

	// comparing TDW with 1DR & 1DW to get first correct value index
	const twoPlaceWrong = data.find((row) => row.key === '2DW').value;
	twoPlaceWrong.forEach((number, index) => {
		if (!wrongArray.includes(number)) {
			onePlaceRight.forEach((rightNumber, rightIndex) => {
				if (!wrongArray.includes(rightNumber)) {
					if (number === rightNumber && index !== rightIndex) {
						rightArray.push(number);
						rightIndexArray.push(rightIndex);
						numberArray = filterNumberArray(numberArray, number);
					}
				}
			});
		}
	});

	// The comparision above may leave either one or two value from TDW
	const temp = twoPlaceWrong.filter(
		(number) => !wrongArray.includes(number) && !rightArray.includes(number)
	);

	// Conditional statement when either on or two value from TDW is left
	if (temp.length === 1) {
		temp.forEach((tempNumber) => {
			twoPlaceWrong.forEach((number, index) => {
				if (tempNumber === number) {
					onePlaceWrong.forEach((row) =>
						row.forEach((wrongNumber, wrongIndex) => {
							if (tempNumber === wrongNumber) {
								const rightIndex = findRightIndex(
									[index, wrongIndex],
									rightIndexArray
								);
								if (rightIndex !== undefined) {
									rightIndexArray.push(rightIndex);
									rightArray.push(tempNumber);
									numberArray = filterNumberArray(numberArray, tempNumber);
								}
							}
						})
					);
				}
			});
		});
	} else {
		twoPlaceWrong.forEach((number, index) => {
			if (temp.includes(number)) {
				onePlaceWrong.forEach((row) =>
					row.forEach((wrongNumber, wrongIndex) => {
						if (number === wrongNumber) {
							const rightIndex = findRightIndex(
								[index, wrongIndex],
								rightIndexArray
							);
							if (rightIndex !== undefined) {
								rightIndexArray.push(rightIndex);
								rightArray.push(number);
								numberArray = filterNumberArray(numberArray, number);
							}
						}
					})
				);
			}
		});
	}

	// Find the remaining values with their index
	numberArray.forEach((number) => {
		onePlaceWrong.forEach((row) =>
			row.forEach((wrongNumber, wrongIndex) => {
				if (number === wrongNumber) {
					const rightIndex = findRightIndex([wrongIndex], rightIndexArray);
					if (rightIndex !== undefined) {
						rightIndexArray.push(rightIndex);
						rightArray.push(number);
					}
				}
			})
		);
	});

	let correctArray = [];
	rightIndexArray.forEach((index, i) => {
		correctArray[index] = rightArray[i];
	});

	return correctArray;
};

const getCorrectNumbers = (data) => {
	const correctArray = getAllNumbers(data);
	console.log(correctArray);
};

getCorrectNumbers(dataOne);
getCorrectNumbers(dataTwo);
