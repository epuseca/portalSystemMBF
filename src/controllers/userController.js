const User = require('../models/user')


module.exports = {
    getListUser: async (req, res) => {
        try {
            let results = await User.find({});
            console.log("Danh sách User:", results); // In ra toàn bộ thông tin của System
            res.render('system/createSystem.ejs', { systems: results });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    postUser: async (req, res) => {
        const newData = req.body;
        try {
            const createdData = await User.create(newData);
            res.status(201).json(createdData); // Trả về dữ liệu mới đã được thêm vào
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    putUser: async (req, res) => {
        const UserID = req.params.idUser;
        const newData = req.body;
        try {
            const updatedData = await User.findByIdAndUpdate(UserID, newData, { new: true });
            res.status(200).json(updatedData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deteteUser: async (req, res) => {
        const UserID = req.params.idUser;

        try {
            // Xóa dữ liệu từ cơ sở dữ liệu dựa trên _id
            await User.findByIdAndDelete(UserID);
            res.status(204).end(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

