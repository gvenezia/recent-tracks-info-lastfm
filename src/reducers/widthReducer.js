export default (state = [], action) => {
	switch (action.type){
		case 'SET_WIDTH':
			return action.payload;

		default:
			return state;
	}
}