const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const systemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        idSystem: { type: String, required: true },
        image: { type: String, required: false },
        description: String,
        tagNv: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tag'
            }],
            default: [],
            set: function(v) {
                if (typeof v === 'string') {
                    // Loại bỏ dấu ngoặc vuông và dấu nháy, sau đó tách theo dấu phẩy
                    v = v.replace(/[\[\]']+/g, ""); // Loại bỏ [ , ] và '
                    const arr = v.split(",").map(item => item.trim()).filter(item => item !== "");
                    return arr;
                }
                return v;
            }
        }
        ,
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

