
const { infoSvModel } = require('../config/SchemaDB.js')

let createOneSvService = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sv = await infoSvModel.findOne({ masv: info.masv })
            if (sv == null) {
                await infoSvModel.create(info);
                resolve({
                    errCode: 0,
                    mes: 'Thêm Sinh Viên Thành Công'
                })
            }
            resolve({
                errCode: 1,
                mes: "Mã Sinh Viên Đã Tồn Tại"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server",
                error: err
            })
        }
    })
}

let getAllStudent = async () => {
    try {
        let data = await infoSvModel.find();
        data.map((sv) => {
            sv.password = ''
        })
        console.log(data)
        return data;
    } catch (err) {
        console.log("Error getAllStudent Service", err)
    }
}

module.exports = {
    createOneSvService,
    getAllStudent
}