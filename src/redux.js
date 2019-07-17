export const LOAD_MORE_ITEMS_REQUEST = "LOAD_MORE_ITEMS_REQUEST";
export const LOAD_MORE_ITEMS_SUCCESS = "LOAD_MORE_ITEMS_SUCCESS";
export const LOAD_MORE_ITEMS_FAILURE = "LOAD_MORE_ITEMS_FAILURE";

export const loadMoreItemsRequest = (page) => ({
    type: LOAD_MORE_ITEMS_REQUEST,
    payload: { page }
})

export const loadMoreItemsSuccess = (cards) => ({
    type: LOAD_MORE_ITEMS_SUCCESS,
    payload: { cards }
})

export const loadMoreItemsFailure = (error) => ({
    type: LOAD_MORE_ITEMS_FAILURE,
    payload: { error }
})

const initialState = {
    cards: [],
    loading: false,
    error: null
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_MORE_ITEMS_REQUEST: {
            return { ...state, loading: true };
        }
        case LOAD_MORE_ITEMS_SUCCESS: {
            return {
                ...state,
                loading: false,
                cards: [...state.cards, ...payload.cards]
            };
        }
        case LOAD_MORE_ITEMS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        }
        default:
            return state;
    }
}

export default reducer;