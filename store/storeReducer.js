import {SET_RECORDS, SET_SEARCH_VALUE} from "./Types";

const handlers = {
    [SET_RECORDS]: (state, {payload}) => ({...state, records: payload}),
    [SET_SEARCH_VALUE]: (state, {payload}) => ({...state, search: payload}),
    DEFAULT: state => state
};

export default (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}

