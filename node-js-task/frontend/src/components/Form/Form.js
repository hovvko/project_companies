import React from 'react';
import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';

import {userService} from '../../services';
import {userValidator} from '../../validators';

const Form = ({setUsers, users}) => {
    const {handleSubmit, reset, register, formState: {errors}} = useForm({
        resolver: joiResolver(userValidator),
        mode: "onTouched"
    });

    const submit = async (info) => {
        const {data} =  await userService.createUser(info);

        setUsers([...users, data]);

        reset();
    };

    return (
        <form>
            <label>Name: <input type='text' placeholder={'Alex'} {...register('name')}/></label>
            <label>Color: <input type='text' placeholder={'blue'} {...register('color')}/></label>
            <button onClick={handleSubmit(submit)}>Save</button>
            {errors.name && <div style={{color: "red"}}>{errors.name['message']}</div>}
            {errors.color && <div style={{color: "red"}}>{errors.color['message']}</div>}
        </form>
    );
};

export {
    Form
};