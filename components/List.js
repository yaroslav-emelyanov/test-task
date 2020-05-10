import React, {useContext} from 'react';
import ListItem from "./ListItem";
import {StoreContext} from "../store/storeContext";

const List = () => {
    const {records, search} = useContext(StoreContext);

    if (!records) return <p>Загрузка...</p>;
    if (!records.length) return <p>У вас пока нет номеров в списке</p>;

    let allRecords = [...records];

    if (search) {
        allRecords = records.filter(user => {
            return user.name.indexOf(search) > -1 || user.phone.indexOf(search) > -1
        });

        if (!allRecords.length) return <p>По запросу "{search}" <br/> ничего не найденно</p>;
    }

    const listUsers = allRecords.map(record => <ListItem info={record} key={record.id}/>);

    return (
        <div>
            <p>Список номеров</p>
            <ul className="list-group">
                {listUsers}
            </ul>
        </div>
    )
};

export default List;