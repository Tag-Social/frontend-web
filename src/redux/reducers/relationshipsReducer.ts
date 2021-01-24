import {
    LOADING_RELATIONSHIPS,
    GET_RELATIONSHIPS,
    RELATIONSHIPS_ERROR,
} from '../types';

type Action = {
    type: string;
    payload: object;
};

const initialState = {
    followers: [],
    following: [],
    mentors: [],
    mentees: [],
    pending: {
        mentors: [],
        mentees: [],
    },
    errors: [],
    loading: false,
};

const relationshipsReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case LOADING_RELATIONSHIPS:
            return {
                ...state,
                loading: true,
            };
        case GET_RELATIONSHIPS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case RELATIONSHIPS_ERROR:
            return {
                ...state,
                errors: payload,
            };
        default:
            return state;
    }
};

export default relationshipsReducer;
