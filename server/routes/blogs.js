const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

// Public: Get all published blogs (optionally filtered)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const query = { status: 'published' };

    if (category) {
      query.category = category;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }

    const blogs = await Blog.find(query)
      .sort({ publishDate: -1, createdAt: -1 })
      .select('title slug shortDescription mainImage category tags authorName publishDate isFeatured');

    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
});

// Public: Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: 'published',
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Failed to fetch blog', error: error.message });
  }
});

module.exports = router;

