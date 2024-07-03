import React, { useState, useEffect } from 'react';
import '../styles/createEdit.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateEdit = ({ post }) => {

    const { post_id } = useParams();
    console.log('post_id: ', post_id);
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  

  const onSave = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
        user_id:user._id,
        title,
        description:content
      }
      let url = "http://localhost:5001/api/post"

      if(post_id){
        url+="/update-post/"+post_id;
      }else{
        url+="/add-post";

      }
    axios.post(url, data).then(res=>{
        console.log(res);
        window.location.href="/";
    }).catch(err=>{
          console.log("error: " + err);
      });
    
  }

  // const onCancel = ()=>{}
  const onCancel = () => {
    window.location.href="/"
  };


  useEffect(() => {
    
    if(post_id){
        axios.get(`http://localhost:5001/api/post/get-post/${post_id}`)
       .then((res) => {
         setTitle(res.data.title);
         setContent(res.data.description);

       })
    }
    
  }, [post_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: post ? post.id : null, title, content });
  };

  return (
    <div className="create-edit">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEdit;
