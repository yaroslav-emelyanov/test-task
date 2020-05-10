import React, {useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import {StoreContext} from '../store/storeContext';

const Form = () => {
    const {addRecord} = useContext(StoreContext);

    const { register, handleSubmit, errors, setValue } = useForm();

    const Submit = (data, e) => {
        addRecord(data);
        e.target.reset();
    };

    const errorMessage = message => (
        <span className="text-danger position-absolute"
              style={{top: '110%'}}
        >{ message }</span>
    );

    return (
        <form className="pt-4" onSubmit={handleSubmit(Submit)}>
            <div className="pb-2">Записать номер:</div>
            <div className="row">
                <div className="col">
                    <input type="text"
                           name="name"
                           className="form-control"
                           placeholder="Имя"
                           onInput={e => setValue(e.target.value)}
                           defaultValue=""
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
                           defaultValue=""
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
            <button type="submit" className="btn btn-primary mb-2 mt-5">Записать</button>
        </form>
    )
};

export default Form;