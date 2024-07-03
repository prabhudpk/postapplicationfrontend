import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreateEdit from './CreateEdit';
import '../styles/home.css';
import axios from 'axios';

const samplePosts = [
  {
    id: 1,
    title: 'Sample Post 1',
    content: 'This is the content of sample post 1.',
    postedBy: 'User1',
    postedOn: '2024-07-01',
  },
  {
    id: 2,
    title: 'Sample Post 2',
    content: 'This is the content of sample post 2.',
    postedBy: 'User2',
    postedOn: '2024-07-02',
  },
];

const Homepage = () => {
    const [ user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showActions, setShowActions] = useState(null);

  const handleSavePost = (post) => {
    if (post.id) {
      setPosts(posts.map(p => (p.id === post.id ? { ...p, ...post } : p)));
    } else {
      setPosts([...posts, { ...post, id: posts.length + 1, postedBy: 'User', postedOn: new Date() }]);
    }
    setEditingPost(null);
    setIsCreating(false);
  };

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  },[])

  const handleEditPost = (postId) => {
    // const post = posts.find(p => p.id === postId);
    axios.get(`http://localhost:5001/api/post/get-post/${postId}`).then(res=>{
        setEditingPost(res.data);
        // setIsCreating(true);
    })
    // setEditingPost(post);
    // setIsCreating(true);
  };

  const handleDeletePost = (postId) => {
    axios.delete(`http://localhost:5001/api/post/delete-post/${postId}`).then(res=>{
        setPosts(posts.filter(p=>p._id!== postId));
    })
    // setPosts(posts.filter(p => p.id!== postId));
  };

  const handleCancel = () => {
    window.location.href="/"
  };

  const toggleActions = (postId) => {
    console.log('postId: ', postId);
    setShowActions(showActions === postId ? null : postId);
  };
useEffect(()=>{
    axios.get('http://localhost:5001/api/post/get-posts').then(res=>{
        setPosts(res.data);
    })
    // setPosts(samplePosts);  // for testing purposes only, remove this line in production code  // fetch posts from the server here using axios or any other method.  // You can replace samplePosts with your actual data.  // For fetching data from a server, you need to make sure your server is running and has the required API endpoints.  // For example, if your server is running on port 5001 and has an API endpoint to get all posts, you would make a GET request to http://localhost:5001/api/get-all-posts.  // Once you get the data, you can set it to the posts state.  // You can also add error handling to the axios request in case of any failures.  // Also, you should
},[])
  return (
    <div className="homepage">
      <div className="header">
        <button className="create-button" onClick={() => {window.location.href="/create-post"}}>Create New Post</button>
      </div>
      {/* {isCreating && <CreateEdit post={editingPost} onSave={handleSavePost} onCancel={handleCancel} />} */}
      <div className="post-list">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onEdit={handleEditPost} 
            onDelete={handleDeletePost} 
            showActions={showActions} 
            toggleActions={toggleActions} 
            user={user}  // pass user to the PostCard component to display the user's name  // You can add more props to the PostCard component depending on your requirements.  // For example, you could add a prop called "showEditButton" to display an edit button only for the current user or add a prop called "showDeleteButton" to display a delete button only for the current user.  // In the PostCard component, you can conditionally render the edit and delete
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
