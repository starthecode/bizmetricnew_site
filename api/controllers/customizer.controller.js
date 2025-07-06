import Customizer from '../models/customizer.model.js';
import { errorhandler } from '../utils/error.js';

export const updateCustomizer = async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(errorhandler(403, 'You are not allowed to create the post'));
  }

  const { content, slug } = req.body;
  const userId = req.user.id; // get userId from authenticated user

  try {
    const updatedCustomizer = await Customizer.findOneAndUpdate(
      { slug }, // Find based on slug (or add userId if needed for multi-user)
      { $set: { content, slug, userId } }, // Update content, slug, userId
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      customizer: updatedCustomizer,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCustomizer = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const customizers = await Customizer.findOne({ slug }); // rename local var
    res.status(200).json({ customizers });
  } catch (error) {
    next(error);
  }
};
