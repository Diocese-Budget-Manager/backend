const ActivityLog = require('../models/ActivityLog');
const createActivityLog = async (data) => {
    try {
        const activityLog = new ActivityLog(data);
        await activityLog.save();
    } catch (err) {
        res.status(500).json(err);
    }
}; 

const getAllActivityLogs = async (req, res) => {
    try {
        const activityLogs = await ActivityLog.find();
        res.status(200).json(activityLogs);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getActivityLogById = async (req, res) => {
    try {
        const activityLog = await ActivityLog.findById(req.params.id);
        res.status(200).json(activityLog);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUserActivityLogs = async (req, res) => {
    try {
        const activityLogs = await ActivityLog.find({ userId: req.params.userId });
        res.status(200).json(activityLogs);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteActivityLog = async (req, res) => {
    try {
        const activityLog = await ActivityLog.findByIdAndDelete(req.params.id);
        res.status(200).json(activityLog);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createActivityLog,
    getAllActivityLogs,
    getActivityLogById,
    getUserActivityLogs,
    deleteActivityLog,
};