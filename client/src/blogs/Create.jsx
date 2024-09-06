import React, { useState } from 'react';
import './create.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const blog = async (e) => {
    e.preventDefault();
    const { title, content, tags } = data;
    try {
       const response = await axios.post('https://blog-website-slp.vercel.app/blog', {
        title,
        content,
        tags
      });
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setData({
          title: '',
          content: '',
          tags: '',
        });
        navigate('/display'); // Ensure this path is correctly defined in your router
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-container">
      <h1>Create a New Blog Post</h1>
      <form className="create-form" onSubmit={blog}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" placeholder="Enter blog title" onChange={change} value={data.title} required />

        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" placeholder="Enter blog content" onChange={change} value={data.content} required></textarea>

        <label htmlFor="tags">Tags:</label>
        <input type="text" id="tags" name="tags" placeholder="Enter tags (comma separated)" onChange={change} value={data.tags} />

        <button type="submit" id="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default Create;
