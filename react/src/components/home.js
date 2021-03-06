import React from 'react';
import {withRouter} from 'react-router';


const Home = withRouter(({ history }) => {


    return (
        <div>
           <h3>Welcome!</h3>
                <p>This is Ethan's Sample Social Media Website built with Java and Angular/React.</p>
                <p>The features on this website include:</p>
                <ul>
                    <li>A Java backend built with Spring Tools:
                        <ul>
                        <li>Handles communication with a local SQL database</li>
                        <li>Handles REST requests from frontend to serve up data</li>
                        <li>Stores passwords as encrypted data</li>
                        <li>Produces a JWT token in response to a successful login</li>
                        </ul>
                    </li>
                    <li>An Angular and React frontend website:
                        <ul>
                        <li>Produces this home page you are viewing</li>
                        <li>Allows users to register and login</li>
                        <li>Allows logged in users to view and edit their profile</li>
                        <li>Allows logged in users to view posts</li>
                        <li>Allows logged in users to create new posts</li>
                        <li>Allows users to edit their posts</li>
                        </ul>
                    </li>
                </ul>
        </div>
    )
})

export default Home;