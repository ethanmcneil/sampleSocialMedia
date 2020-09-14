import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";

const Feed = withRouter(({ history }) => {
  const [postData, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const url = "http://localhost:8080/post";
  useEffect(() => {
    let myHeaders = {
      authorization: `Bearer ${localStorage.getItem("coolbeans")}`,
      username: `${localStorage.getItem("user")}`,
    };
    axios.get(`${url}/`, { headers: myHeaders }).then((response) => {
      setPosts(response.data);
    });
  }, []);
  const showUpdate = async (id) => {
    document.getElementById(id + "newText").classList.remove("noShow");
};
  const updatePost = async (id) => {
    let myHeaders = {
        authorization: `Bearer ${localStorage.getItem('coolbeans')}`,
        message: newMessage,
        author: `${localStorage.getItem('user')}`
    }
    axios.put(`${url}/${id}`, "", {headers: myHeaders});
    window.location.reload(false);
};
const deletePost = async (id) => {
    let myHeaders = {
        authorization: `Bearer ${localStorage.getItem('coolbeans')}`,
        author: `${localStorage.getItem('user')}`,
        id: id
    }
    axios.delete(`${url}/delete`, {headers: myHeaders});
    window.location.reload(false);
};




  return (
    <div id="postArea">
      {postData.slice(0).reverse().map((post) => {
        if (post.author === localStorage.getItem("user")) {
          return (
            <div key={post.id.toString()} className="messageHead">
              <div className="message">{post.message}</div>
              <div className="author">
                Written by {post.author} on {post.timeStamp}
              </div>
              <div>
                <button onClick={() => deletePost(post.id)}>Delete Your Post</button>
                <button onClick={() => showUpdate(post.id)} >Update Your Post</button>
                <span id={post.id + "newText"} className="noShow">
                  <form>
                    <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)}></textarea>
                    <button className="btn" onClick={() => updatePost(post.id)}>
                      Submit Updated Data
                    </button>
                  </form>
                </span>
              </div>
            </div>
          );
        }
        return (
          <div key={post.id.toString()} className="messageHead">
            <div className="message">{post.message}</div>
            <div className="author">
              Written by {post.author} on {post.timeStamp}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default Feed;