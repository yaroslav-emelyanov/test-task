import React, {useContext} from 'react';
import {StoreContext} from "../store/storeContext";

const Search = () => {
    const {search, setSearchValue} = useContext(StoreContext);

    return (
            <div>
                <p>Поиск</p>
                <input className="form-control"
                       type="search"
                       placeholder="Введите имя или телефон"
                       defaultValue={search}
                       onInput={(e) => setSearchValue(e.target.value)}
                       aria-label="Search"/>
            </div>
    )
};


export default Search;