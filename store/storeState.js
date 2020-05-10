import React, {useReducer, useEffect} from 'react';
import {StoreContext} from "./storeContext";
import StoreReducer from "./storeReducer";
import {SET_RECORDS, SET_SEARCH_VALUE} from "./Types";
import useSWR from "swr";
import fetcher from '../helpers/fetcher'

const initialState = {
    search: '',
    records: null,
};

export default ({children}) => {

    const { data } = useSWR('/api/numbers', fetcher.get);

    const [state, dispatch] = useReducer(StoreReducer, initialState);

    const setRecords = records => dispatch({type: SET_RECORDS, payload: records});

    useEffect(() => {
        setRecords(data);
    }, [data]);

    const addRecord = async record => {
        const records = [...state.records];
        const newRecord = {id: Date.now(), ...record}
        records.push(newRecord);
        setRecords(records);
        fetcher.post('/api/number', newRecord);
    };

    const removeRecord = (id) => {
        const filtered = state.records.filter(record => record.id !== id);
        setRecords(filtered);
        return fetcher.delete('/api/number', {id})
    };

    const updateRecord = (record) => {
        const records = [...state.records];
        const index = records.findIndex(r => r.id === record.id);
        records[index] = record;
        setRecords(records);
        return fetcher.put('/api/number', record);
    };

    const setSearchValue = value => dispatch({type: SET_SEARCH_VALUE, payload: value});

    return (
        <StoreContext.Provider value={{
            ...state, addRecord, setSearchValue, removeRecord, updateRecord
        }}>
            {children}
        </StoreContext.Provider>
    )
}