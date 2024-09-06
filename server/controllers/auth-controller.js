const User = require('../schema/User');
const Blog = require('../schema/Blog'); // Added Blog import


const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required or at least 6 char"
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already exists"
      });
    }

    const user = await User.create({
      name, email, password
    });

    return res.json(user);

  } catch (error) {
    console.log(error);
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "no user found"
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        error: "Password is incorrect"
      });
    }
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        // Avoid sending sensitive info
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const blogCreate = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title) {
      return res.json({
        error: "title is required",
      });
    }
    if (!content) {
      return res.json({
        error: "content is required",
      });
    }
    if (!tags) {
      return res.json({
        error: "tags are required",
      });
    }

    // Correct Blog schema usage
    const blog = await Blog.create({
      title, content, tags
    });

    return res.json(blog);
  } catch (err) {
    console.log(err);
  }
}


const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blog posts
    return res.json(blogs);
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const { id } = req.params; // Get the blog ID from the request parameters

    // Attempt to find and delete the blog post
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

     return res.status(200).json({ message: 'Blog deleted successfully' });
   } catch (err) {
    console.error('Error deleting blog:', err);
    return res.status(500).json({ error: 'Failed to delete blog' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params; // Get the blog ID from the request parameters
    const { title, content, tags } = req.body; // Get updated fields from the request body

    // Find and update the blog post
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true } // Return the updated document
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    return res.status(500).json({ error: 'Failed to update blog' });
  }
};
module.exports = {
  userRegister, userLogin, blogCreate, getBlogs,deleteBlogs,updateBlog
};
