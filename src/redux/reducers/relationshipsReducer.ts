import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_MENTEES,
    GET_MENTORS,
    GET_PENDING,
    GET_REL_ERROR,
} from '../types';

type Action = {
    type: string;
    payload: object;
};

const initialState = {
    followers: {
        payload: [],
        loading: true,
    },
    following: {
        payload: [],
        loading: true,
    },
    mentors: {
        payload: [],
        loading: true,
    },
    mentees: {
        payload: [],
        loading: true,
    },
    pending: {
        mentors: [],
        mentees: [],
        loading: true,
    },
    errors: [],
};

const relationshipsReducer = (state = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: {
                    payload,
                    loading: false,
                },
            };
        case GET_FOLLOWING:
            return {
                ...state,
                following: {
                    payload,
                    loading: false,
                },
            };
        case GET_MENTEES:
            return {
                ...state,
                mentees: {
                    payload,
                    loading: false,
                },
            };
        case GET_MENTORS:
            return {
                ...state,
                mentors: {
                    payload,
                    loading: false,
                },
            };
        case GET_PENDING:
            return {
                ...state,
                pending: {
                    ...payload,
                    loading: false,
                },
            };
        case GET_REL_ERROR:
            return {
                ...state,
                errors: payload,
            };
        default:
            return state;
    }
};

export default relationshipsReducer;
