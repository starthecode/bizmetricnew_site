import Casestudies from '../models/casestudies.model.js';
import Post from '../models/post.model.js';
import Solutions from '../models/solutions.model.js';

export const deleteById = async (req, res, next) => {
  try {
    const { postId: pageId, type } = req.params;
    // Mapping types to corresponding models
    const modelMap = {
      solutions: Solutions,
      post: Post,
      casestudy: Casestudies,
    };

    const Model = modelMap[type?.toLowerCase()];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid type provided' });
    }

    const result = await Model.findOneAndDelete({ pageId: Number(pageId) });

    if (!result) {
      return res.status(404).json({ message: `${type} not found` });
    }

    res.status(200).json({
      success: true,
      message: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } deleted successfully`,
    });
  } catch (err) {
    next(err.message);
  }
};
