import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema(
  {
    pageType: {
      type: String,
      required: true,
    },
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'pageType',
    },
    seoTitle: String,
    seoDescription: String,
    focusKeyphrase: [String],
    ogTitle: String,
    ogDescription: String,
    altText: String,
  },
  { timestamps: true }
);

const Seo = mongoose.model('Seo', seoSchema);

export default Seo;
