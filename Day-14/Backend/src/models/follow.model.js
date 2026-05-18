const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
    },
    followee: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: [ "pending", "accepted", "rejected" ],
            message: "status can be only pending or rejected"
        }
    }
},{
    timestamps: true /*ye object batata hai ki ye document kab create hua tha aapke database mein aur last time kab update hua tha */
})

followSchema.index({ follower:1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel