export default (state = [], action) => {
	switch (action.type){
		case 'FETCH_CREDITS':
			return [...state, action.payload];

		default:
			return state;
	}
}