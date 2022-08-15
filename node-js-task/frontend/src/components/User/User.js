import React from 'react';

const User = ({user: {colorID: {name: colorName}, name}}) => {
    return (
        <div>
            <br/>
            name --- {name} <br/>
            color --- {colorName} <br/>
        </div>
    );
};

export {
    User
};