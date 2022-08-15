import React, {useEffect} from 'react';

import {userService} from '../../services';
import {User} from '../User/User';

const Users = ({users, setUsers}) => {
    useEffect(() => {
        userService.getAll().then(({data}) => setUsers(data));
    }, [setUsers]);

    return (
        <div>
            {
                users.map(user => <User key={user['_id']} user={user}/>)
            }
        </div>
    );
};

export {
    Users
};