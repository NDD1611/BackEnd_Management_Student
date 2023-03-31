

const { infoSvModel, accountModel, infoCVHTModel, lopHocModel,
    hocPhanModel, announceModel, diemRLModel, hoatdongModel } = require('../config/SchemaDB.js')

class studentService {

    createOneSvService(info) {
        return new Promise(async (resolve, reject) => {
            try {
                let sv = await infoSvModel.findOne({ masv: info.masv })
                if (!sv) {
                    await infoSvModel.create(info)
                    let account = {
                        username: info.masv,
                        password: '123456',
                        role: "student"
                    }
                    // await accountModel.create(account)
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

    editSv(sv) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await infoSvModel.findByIdAndUpdate({ _id: sv._id }, sv)
                if (res) {
                    resolve({
                        errCode: 0,
                        mes: "Update Success"
                    })
                } else {
                    resolve({
                        errCode: 1,
                        mes: "Update Failed"
                    })
                }
            } catch (err) {
                reject({
                    errCode: 2,
                    mes: "Errer from Server"
                })
            }
        })
    }

    async getFullInfoSV(studentID) {
        return new Promise(async (resolve, reject) => {
            try {
                let dataRes = await infoSvModel.findOne({ masv: studentID })
                let infoLop = await lopHocModel.findOne({ malop: dataRes.malop })
                dataRes = {
                    ...dataRes._doc,
                    khoahoc: infoLop.khoahoc,
                    namhoc: infoLop.namhoc
                }
                resolve({
                    errCode: 0,
                    data: dataRes
                })
            } catch (err) {
                reject({
                    errCode: 2,
                    mes: "Lỗi Server"
                })
            }
        })
    }
    async getAllStudentLop(malop) {
        try {
            let data = await infoSvModel.find({ malop: malop });
            data.map((sv) => {
                sv.password = ''
            })
            return data;
        } catch (err) {
            console.log("Error getAllStudent Service", err)
        }
    }
    deleteSv(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await infoSvModel.deleteOne({ _id: id })
                resolve({
                    errCode: 0,
                    mes: "Xóa Sinh Viên Thành Công"
                })
            } catch (err) {
                reject(err)
            }
        })
    }


    themDRL(diemRL) {
        return new Promise(async (resolve, reject) => {
            try {
                let info = {
                    masv: diemRL.masv,
                    hocki: diemRL.hocki,
                    namhoc: diemRL.namhoc
                }
                let data = await diemRLModel.findOne(info)
                if (data) {
                    await diemRLModel.findOneAndUpdate(info, diemRL)
                } else {
                    await diemRLModel.create(diemRL)
                }
                resolve({
                    errCode: 0,
                    mes: 'success'
                })
            } catch (err) {
                reject({
                    errCode: 3,
                    mes: "Lỗi Server"
                })
            }
        })
    }

    getDRL(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let DRL = await diemRLModel.findOne(data)
                resolve({
                    errCode: 0,
                    data: DRL
                })
            } catch (err) {
                reject({
                    errCode: 3,
                    mes: "Lỗi Server"
                })
            }
        })
    }
}

module.exports = new studentService()