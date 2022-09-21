
const { infoSvModel, accountModel } = require('../config/SchemaDB.js')

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

let getAllStudent = async () => {
    try {
        let data = await infoSvModel.find();
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

let deleteSv = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await infoSvModel.deleteOne({ _id: id })
            resolve({
                errCode: 0,
                mes: "Delete success"
            })
        } catch (err) {
            reject(err)
        }
    })
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
                    } else {
                        dataRes = account
                        dataRes.password = ''
                    }
                    resolve({
                        errCode: 0,
                        mes: "Login success",
                        data: dataRes
                    })
                } else {
                    resolve({
                        errCode: 3,
                        mes: 'Wrong password'
                    })
                }
            }
            resolve({
                errCode: 2,
                mes: "Wrong MSSV"
            })


        } catch (err) {
            reject({
                errCode: 2,
                mes: "Error Login from server"
            })
        }
    })
}

let createAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await accountModel.findOne({ username: data.username })

            if (user == null) {
                await accountModel.create(data)
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

module.exports = {
    createOneSvService,
    getAllStudent,
    editSv,
    deleteSv,
    login,
    createAccount
}