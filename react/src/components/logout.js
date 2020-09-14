import React from 'react';
import {withRouter} from 'react-router';




const Logout = withRouter(({ history }) => {
    localStorage.clear();
    history.push('/');
    return (
        <div>
           <h3>Good-bye!</h3>
        </div>
    )
})

export default Logout;