const mongoose = require('mongoose');
const Room = require('./room').schema;
const autoIncrementModelID = require('./counter');


var schema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        min: 1
    },
    totalCost: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rooms: [{
        type: Room,
        default: {}
    }],
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

schema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelId('orders', this, next);
});

module.exports = mongoose.model("Order", schema, "Order");