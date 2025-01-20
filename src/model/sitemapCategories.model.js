import mongoose from "mongoose";

const sitemapSchema = mongoose.Schema({
  priority: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  subcategory: {
    type: String
  },
  href: {
    type: String
  }
});

const sitemapModel = mongoose.model('sitemap', sitemapSchema);

export default sitemapModel