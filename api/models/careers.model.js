import mongoose from 'mongoose';

const careersSchema = new mongoose.Schema(
  {
    postType: {
      type: String,
      default: 'careers',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    embedcontent: {
      type: String,
      required: false,
    },

    extraInputFields: {
      type: Map,
      of: String,
      default: {},
    },

    excerpts: {
      type: String,
      required: false,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    parentPage: {
      type: String,
    },

    pageId: {
      type: Number, // 🛠️ changed: you are sending pageId as number like 1598
      required: true,
      unique: true,
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },

    metaFields: {
      categories: {
        type: [String],
        default: [],
      },
      tags: {
        type: [String],
        default: [],
      },
      featuredImage: {
        type: String,
        default: '',
      },
    },

    categories: {
      type: Map,
      of: [String], // value type is array of strings
      default: {},
    },

    seoFields: {
      focusKeyphrase: { type: String },
      seoTitle: { type: String },
      seoDescription: { type: String },
    },
  },
  { timestamps: true }
);

const Careers = mongoose.model('Careers', careersSchema);

export default Careers;
