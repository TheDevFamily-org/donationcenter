// controllers/recipients.controller.js

import User from '../models/user.model.js';

export const getRecentRecipients = async (req, res, next) => {
  try {
    // Retrieve recent recipients based on userType and creation date
    const recentRecipients = await User.find({
      userType: 'Recipient'
    })
    .sort({ createdAt: -1 })  // Sort by creation date in descending order
    .limit(10);  // Limit the results to 10, adjust as needed

    res.status(200).json(recentRecipients);
  } catch (error) {
    next(error);
  }
};
