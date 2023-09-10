import Campaign from "../models/campaign.model.js";
import createError from "../utils/createError.js";

export const getAll = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ closeCampaign: false });
    res.status(200).json(campaigns);
  } catch (err) {
    next(createError(500, err.message));
  }
};

export const getAllByAdminId = async (req, res, next) => {
  try {
    const campaign = await Campaign.find({ admin: req.userId }).populate(
      "admin",
      "userName email"
    );
    if (!campaign) {
      return next(createError(404, "Campaign not found"));
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createcampaign = async (req, res, next) => {
  try {
    const newCampaign = new Campaign({
      ...req.body,
      admin: req.userId,
    });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    next(err);
  }
};

export const closecampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({ _id: req.params.id });
    if (campaign.admin.toString() == req.userId) {
      campaign.closeCampaign = true;
      await campaign.save();
      return res.status(200).send({message:"the campaign is closed"});
    }
    return res
      .status(403)
      .json({ error: "Access forbidden. Requires admin privileges." });
  } catch (err) {
    next(err);
  }
};
