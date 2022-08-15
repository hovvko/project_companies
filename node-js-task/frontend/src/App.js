import React, {useState} from 'react';

import {Form, Users} from './components';

const App = () => {
    const [users, setUsers] = useState([]);

    return (
        <div>
            <Form setUsers={setUsers} users={users}/>
            <Users setUsers={setUsers} users={users}/>
        </div>
    );
};

export default App;
