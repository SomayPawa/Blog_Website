const express = require('express');
const { userRegister ,userLogin ,blogCreate, getBlogs, deleteBlogs, updateBlog} = require('../controllers/auth-controller');


const router = express.Router();
const cors = require("cors");

// middleware
router.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173', 'https://deploy-mern-1whq.vercel.app'];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

router.post("/register",userRegister);
router.post("/login",userLogin);
router.post("/blog",blogCreate);
router.get('/blogs', getBlogs); // New route for fetching blogs
router.delete('/blogs/:id',deleteBlogs);
router.put('/blogs/:id', updateBlog); // Route for updating blogs

module.exports = router;
