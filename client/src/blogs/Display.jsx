// Display.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './display.css';

const Display = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blog-website-slp.vercel.app/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to the update page
  };

  return (
    <div className="display-container">
      <h1>Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p><strong>Tags:</strong> {blog.tags}</p>
              <div className="blog-actions">
                <button onClick={() => handleUpdate(blog._id)}>Update</button>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Display;
