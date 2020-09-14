import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'



const Post = withRouter(({ history }) => {
    const [message, setMessage] = useState("");

    const url = "http://localhost:8080/post"

    const handleSubmit = async (e) => {
        e.preventDefault();
        let myHeaders = {
            authorization: `Bearer ${localStorage.getItem('coolbeans')}`,
            message: message,
            author: `${localStorage.getItem('user')}`
        }
        axios.post(`${url}/add`, "", {headers: myHeaders});
        history.push('/feed');
        window.location.reload(false);
    };

    return (
        <div>
                        <h3>Let's Post Something Amazing!</h3>
            <form onSubmit={handleSubmit}>
                <input type="textarea" name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Craft your message!" />
                <button className="btn" >Post</button>
            </form>
        </div>
    )
})

export default Post;