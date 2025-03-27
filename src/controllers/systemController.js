const System = require('../models/system.js')
const Tag = require('../models/tag.js')
const path = require("path");


const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images/imageUpload");
    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = path.join(uploadPath, finalName);

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (err) {
        console.log(">>> check error: ", err);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        }
    }
};
module.exports = {
    getListSystem: async (req, res) => {
        try {
            let page = parseInt(req.query.page) || 1;
            let limit = 7; // mỗi trang 6 dòng
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
            let limit = 7; // mỗi trang 6 dòng
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
        try {
            // Lấy dữ liệu text từ req.body
            let newData = req.body;

            // Nếu có file ảnh được upload
            if (req.files && req.files.image) {
                let result = await uploadSingleFile(req.files.image);
                if (result.status === 'success') {
                    // Lưu đường dẫn ảnh, ví dụ: "/images/imageUpload/tenfile-123456.jpg"
                    newData.image = "/images/imageUpload/" + result.path;
                } else {
                    return res.status(500).json({ message: "Lỗi upload file", error: result.error });
                }
            }

            // Tạo hệ thống mới
            const createdData = await System.create(newData);
            res.status(201).json(createdData);
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
    },
    postUploadSingleFileApi: async (req, res) => {
        // Kiểm tra nếu không có file upload
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // Lấy đối tượng file, giả sử tên file field là "image"
        const fileObject = req.files.image;
        const uploadPath = path.resolve(__dirname, "../public/images/imageUpload");

        // Lấy phần mở rộng và tên gốc của file
        const extName = path.extname(fileObject.name);
        const baseName = path.basename(fileObject.name, extName);

        // Tạo tên file mới bằng cách thêm timestamp
        const finalName = `${baseName}-${Date.now()}${extName}`;
        const finalPath = path.join(uploadPath, finalName);

        try {
            // Di chuyển file đến thư mục upload
            await fileObject.mv(finalPath);
            // Trả về JSON với thông tin file đã upload
            return res.status(200).json({
                EC: 0,
                data: finalName
            });
        } catch (err) {
            console.error("Lỗi upload file:", err);
            return res.status(500).json({
                EC: 1,
                error: JSON.stringify(err)
            });
        }
    }
}