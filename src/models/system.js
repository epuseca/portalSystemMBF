const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const systemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        idSystem: { type: String, required: true },
        image: { type: String, required: false },
        description: String,
        tagNv: String,
        linkAccess: String,
        linkInstruct: String,
        managingUnit: String,
        contactPoint: String
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// Override all methods
systemSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const System = mongoose.model('system', systemSchema);

module.exports = System;

