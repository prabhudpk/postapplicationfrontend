import React from 'react';
import '../styles/postCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ post, onEdit, onDelete, showActions, toggleActions ,user}) => {
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '');
      
        return formattedDate;
      };
      
  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <div className="post-actions">
          <span className="dots" onClick={() => toggleActions(post._id)}>...</span>
          {user?._id===post.user_id?._id && showActions === post._id && (
            <div className="actions-menu">
              <a href={`/edit/${post._id}`} onClick={() => onEdit(post._id)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </a>
              <a href="/" onClick={() => onDelete(post._id)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="post-content">
        <p>{post.description}</p>
      </div>
      <div className="post-meta">
        <span>Posted by <b>{post?.user_id?.username??""}</b></span>
        <span> On {formatDate(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default PostCard;
