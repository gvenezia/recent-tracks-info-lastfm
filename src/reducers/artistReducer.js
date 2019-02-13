export default (state = [], action) => {
	switch (action.type){
		case 'FETCH_ARTIST':
			return action.payload;

		default:
			return state;
	}
}