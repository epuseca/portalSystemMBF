const Tag = require('../models/tag.js')

module.exports = {
    getListTag: async (req, res) => {
        try {
            let results = await Tag.find({});
            console.log("Danh sách Tag:", results); // In ra toàn bộ thông tin của System
            // res.render('system/createSystem.ejs', { systems: results });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    postTag: async (req, res) => {
        const newData = req.body;
        try {
            const createdData = await Tag.create(newData);
            res.status(201).json(createdData); // Trả về dữ liệu mới đã được thêm vào
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    putTag: async (req, res) => {
        const TagID = req.params.idTag;
        const newData = req.body;
        try {
            const updatedData = await Tag.findByIdAndUpdate(TagID, newData, { new: true });
            res.status(200).json(updatedData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deteteTag: async (req, res) => {
        const TagID = req.params.idTag;

        try {
            // Xóa dữ liệu từ cơ sở dữ liệu dựa trên _id
            await Tag.findByIdAndDelete(TagID);
            res.status(204).end(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}