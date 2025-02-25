const System = require('../models/system.js')
const Tag = require('../models/tag.js')

module.exports = {
    getListSystem: async (req, res) => {
        try {
            let page = parseInt(req.query.page) || 1;
            let limit = 6; // mỗi trang 6 dòng
            let skip = (page - 1) * limit;
    
            let systems = await System.find({})
                .populate('tagNv')
                .skip(skip)
                .limit(limit);
            let tags = await Tag.find({});
    
            let count = await System.countDocuments();
            let totalPages = Math.ceil(count / limit);
    
            // Thêm searchQuery là chuỗi rỗng khi không có từ khóa tìm kiếm
            res.render('system/createSystem.ejs', { 
                systems: systems, 
                tags: tags, 
                currentPage: page, 
                totalPages: totalPages,
                searchQuery: ""  // Thêm biến này
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
,    
searchSystem: async (req, res) => {
    try {
        const searchQuery = req.query.name || "";
        let page = parseInt(req.query.page) || 1;
        let limit = 6; // mỗi trang 6 dòng
        let skip = (page - 1) * limit;

        // Lấy danh sách hệ thống thỏa mãn điều kiện tìm kiếm
        let systems = await System.find({ name: { $regex: searchQuery, $options: 'i' } })
                                   .populate('tagNv')
                                   .skip(skip)
                                   .limit(limit);
        let tags = await Tag.find({});

        // Đếm tổng số hệ thống thỏa mãn để tính số trang
        let count = await System.countDocuments({ name: { $regex: searchQuery, $options: 'i' } });
        let totalPages = Math.ceil(count / limit);

        res.render('system/createSystem.ejs', {
            systems: systems,
            tags: tags,
            currentPage: page,
            totalPages: totalPages,
            searchQuery: searchQuery // (nếu bạn muốn hiển thị từ khóa search)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
,
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