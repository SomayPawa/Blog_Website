import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const { id } = useParams(); // Get blog ID from URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    // Fetch the blog details to populate the form
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blog-website-slp.vercel.app/blogs/${id}`);
        const blog = response.data;
        setFormData({
          title: blog.title,
          content: blog.content,
          tags: blog.tags
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to the backend
      await axios.put(`https://blog-website-slp.vercel.app/blogs/${id}`, {
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
      });
      navigate('/Display'); // Redirect to the home page after updating
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div>
      <h1>Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
