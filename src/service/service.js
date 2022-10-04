
const { infoSvModel, accountModel, infoCVHTModel, lopHocModel } = require('../config/SchemaDB.js')

let createOneSvService = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(info)
            let sv = await infoSvModel.findOne({ masv: info.masv })
            if (sv == null) {
                await infoSvModel.create(info)
                let account = {
                    username: info.masv,
                    password: '123456',
                    role: "student"
                }
                await accountModel.create(account)
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

let getAllStudentLop = async (malop) => {
    try {
        let data = await infoSvModel.find({ malop: malop });
        data.map((sv) => {
            sv.password = ''
        })
        // console.log(data)
        return data;
    } catch (err) {
        console.log("Error getAllStudent Service", err)
    }
}

let editSv = (sv) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(sv)
            let res = await infoSvModel.findByIdAndUpdate({ _id: sv._id }, sv)
            if (res) {
                // console.log(res)
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

let editCVHT = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await infoCVHTModel.findByIdAndUpdate({ _id: info._id }, info)
            console.log(res)
            if (res) {
                // console.log(res)
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
            console.log(err)
            reject({
                errCode: 2,
                mes: "Errer from Server"
            })
        }
    })
}

let deleteSv = (id) => {
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

let deleteAccount = async (masv) => {
    try {
        await accountModel.deleteOne({ username: masv })
    } catch (err) {
        console.log(err)
    }
}

let login = async (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await accountModel.findOne({ username: info.masv })
            if (account) {
                if (account.password === info.password) {
                    let dataRes
                    if (account.role == 'student') {
                        dataRes = await infoSvModel.findOne({ masv: info.masv })
                    } else if (account.role == 'teacher') {
                        dataRes = await infoCVHTModel.findOne({ macb: info.masv })
                        dataRes.password = ''
                    } else {
                        dataRes = account
                        dataRes.password = ''
                    }
                    resolve({
                        errCode: 0,
                        mes: "Đăng Nhập Thành Công",
                        data: dataRes
                    })
                } else {
                    resolve({
                        errCode: 3,
                        mes: 'Sai Mật Khẩu'
                    })
                }
            }
            resolve({
                errCode: 2,
                mes: "Tài Khoản Không Tồn Tại"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}

let createAccount = (data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            let user = await accountModel.findOne({ username: data.username })
            if (user == null) {
                await accountModel.create(data)
                let info = {
                    name: data.name,
                    macb: data.username,
                    role: "teacher"
                }
                await infoCVHTModel.create(info)
                resolve({
                    errCode: 0,
                    mes: "Tạo Tài Khoản Thành Công"
                })
            }
            resolve({
                errCode: 3,
                mes: "Tài Khoản Đã Tồn Tại"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Phía Server"
            })
        }
    })
}

let changePass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = await accountModel.findOne({ username: data.username })
            if (info) {
                if (info.password == data.passOld) {
                    info.password = data.passNew
                    await accountModel.findOneAndUpdate({ username: info.username }, info)
                    resolve({
                        errCode: 0,
                        mes: "Đổi mật khẩu thành công"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        mes: "Mật Khẩu Cũ Không Đúng"
                    })
                }
            }
            console.log(info)
        } catch (err) {
            reject(err)
        }
    })
}

let addClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = await lopHocModel.findOne({ malop: data.malop })
            if (info) {
                resolve({
                    errCode: 1,
                    mes: "Lớp Học Đã Tồn Tại"
                })
            } else {
                await lopHocModel.create(data)
                resolve({
                    errCode: 0,
                    mes: "Thêm Lớp Học Thành Công"
                })
            }
        } catch (err) {
            reject({
                errCode: 3,
                mes: "Lỗi Server"
            })
        }
    })
}

let getAllClass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await lopHocModel.find({ macb: data.macb })
            if (res) {
                resolve({
                    errCode: 0,
                    mes: "success",
                    data: res
                })
            }
        } catch (err) {
            reject({
                errCode: 3,
                mes: "Lỗi Server"
            })
        }
    })
    console.log(data)
}

module.exports = {
    createOneSvService,
    getAllStudentLop,
    editSv,
    deleteSv,
    deleteAccount,
    login,
    createAccount,
    changePass,
    editCVHT,
    addClass,
    getAllClass
}