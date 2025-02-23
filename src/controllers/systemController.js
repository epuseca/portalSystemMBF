const System = require('../models/system.js')

module.exports = {
    getListSystem: async (req, res) => {
        try {
            let results = await System.find({}).populate('tagNv');
            //console.log("Danh sách System:", results); // In ra toàn bộ thông tin của System
            res.render('system/createSystem.ejs', { systems: results });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    postSystem: async (req, res) => {
        const newData = req.body;
        try {
            const createdData = await System.create(newData);
            res.status(201).json(createdData); // Trả về dữ liệu mới đã được thêm vào
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    putSystem: async (req, res) => {
        
        const SystemID = req.params.id;
        const newData = req.body;
        console.log("ID mg sysstem:", SystemID)
        console.log("new data sysstem:", newData)
        try {
            const updatedData = await System.findByIdAndUpdate(SystemID, newData, { new: true });
            res.status(200).json(updatedData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deteteSystem: async (req, res) => {
        const SystemID = req.params.idSystem;

        try {
            // Xóa dữ liệu từ cơ sở dữ liệu dựa trên _id
            await System.findByIdAndDelete(SystemID);
            res.status(204).end(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}