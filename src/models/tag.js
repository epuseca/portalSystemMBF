const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const tagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String }
    },
    { timestamps: true }
);

// Override all methods
tagSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;

