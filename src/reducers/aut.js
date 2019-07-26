export default (state = {}, action) => {
	switch (action.type) {
		case 'INCREMENT_REQUESTED':
			return {
				...state,
				isIncrementing: true
			};
		default:
			return state;
	}		   
}