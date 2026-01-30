const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    mainImage: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    authorName: {
      type: String,
      default: 'Admin',
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title if not provided
blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    }).substring(0, 160);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);

