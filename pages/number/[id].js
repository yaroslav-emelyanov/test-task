import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import useSWR from 'swr'
import React, {useContext, useState, Fragment} from "react";
import {StoreContext} from "../../store/storeContext";
import Tooltip from '../../components/Tooltip';

const fetcher = url => fetch(url).then(res => res.json());

const Number = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { removeRecord, updateRecord } = useContext(StoreContext);
    const { query, push } = useRouter();
     
    const { data } = useSWR(
        () => query.id && `/api/number?id=${query.id}`,
        fetcher
    );

    const { register, handleSubmit, errors, setValue } = useForm();

    const Submit = async (record) => {
        if (record.name === data. name || record.phone === data.phone) return;
        await updateRecord({id : +query.id, ...record});
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 3000)
    };

    const errorMessage = message => (
        <span className="text-danger position-absolute"
              style={{top: '110%'}}
        >{ message }</span>
    );

    const removeCurrentRecord = async () => {
        await removeRecord(+query.id);
        push('/');
    };

    return (
        <Fragment>
            <Tooltip isVisible={showTooltip} title="Обновлено" hiddenTooltip={() => setShowTooltip(false)}/>
            <div className="container d-flex align-items-center w-50 vh-100">
                <form className="w-100 h-25" onSubmit={handleSubmit(Submit)}>
                    <div className="pb-2">Редактировать данные:</div>
                    <div className="form-row">
                        <div className="col">
                            <input type="text"
                                   name="name"
                                   className="form-control"
                                   placeholder="Имя"
                                   onInput={e => setValue(e.target.value)}
                                   defaultValue={(data || '').name}
                                   disabled={!data}
                                   ref={register({
                                       required: {
                                           value: true,
                                           message: 'Введите имя'
                                       }
                                   })}
                            />
                            {errors.name && errorMessage(errors.name.message)}
                        </div>
                        <div className="col position-relative">
                            <input type="text"
                                   name="phone"
                                   className="form-control"
                                   placeholder="Телефон"
                                   onInput={e => setValue(e.target.value)}
                                   defaultValue={(data || '').phone}
                                   disabled={!data}
                                   maxLength="11"
                                   ref={register({
                                       required: {
                                           value: true,
                                           message: 'Введите телефон'
                                       },
                                       pattern: {
                                           value: /^(8|7)?\d{10}$/,
                                           message: 'Введите корректный телефон'
                                       }
                                   })}
                            />
                            {errors.phoneNumber && errorMessage(errors.phoneNumber.message)}
                        </div>
                    </div>
                    <div className="form-row ml-0 mr-0">
                        <button type="submit" className="btn btn-primary mb-2 mt-5">Обновить</button>
                        <button className="btn btn-danger ml-4 mb-2 mt-5"
                                onClick={removeCurrentRecord}
                                type="button"
                        >Удалить</button>
                        <button className="btn btn-success ml-4 mb-2 mt-5"
                                onClick={() => push('/')}
                                type="button"
                        >Назад</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
};

export default Number;