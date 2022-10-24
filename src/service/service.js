
const { infoSvModel, accountModel, infoCVHTModel, lopHocModel, hocPhanModel, announceModel, diemRLModel } = require('../config/SchemaDB.js')

let createOneSvService = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
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
        return data;
    } catch (err) {
        console.log("Error getAllStudent Service", err)
    }
}

let editSv = (sv) => {
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

let editCVHT = (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await infoCVHTModel.findByIdAndUpdate({ _id: info._id }, info)
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
                        let infoLop = await lopHocModel.findOne({ malop: dataRes.malop })
                        dataRes = {
                            ...dataRes._doc,
                            khoahoc: infoLop.khoahoc,
                            namhoc: infoLop.namhoc
                        }
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
}

let getFullInfoSV = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataRes = await infoSvModel.findOne({ masv: data.masv })
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

let themhp = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hocphan = await hocPhanModel.findOne({
                masv: data.masv,
                namhoc: data.namhoc,
                hocki: data.hocki,
                mahp: data.mahp
            })
            if (hocphan) {
                let hocki = data.hocki
                if (hocki == 3) {
                    hocki = "Hè"
                }
                resolve({
                    errCode: 2,
                    mes: `Học phần đã tồn tại ở học kì ${hocki} của năm học ${data.namhoc} - ${data.namhoc + 1}`
                })
            } else {
                await hocPhanModel.create(data)
                resolve({
                    errCode: 0,
                    mes: "Thêm học phần thành công"
                })
            }

        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}
let getDiemHP = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listHP = await hocPhanModel.find(data)
            if (listHP) {
                resolve({
                    errCode: 0,
                    mes: "success",
                    data: listHP
                })
            }
            resolve({
                errCode: 1,
                mes: "fail"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}

let deleteDiemHP = (hp) => {
    return new Promise(async (resolve, reject) => {
        try {
            await hocPhanModel.deleteOne(hp)
            resolve({
                errCode: 0,
                mes: "success"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}

let updateDiemHP = async (masv) => { // update lai diem trong infoSvModel
    try {
        let listHP = await hocPhanModel.find({ masv: masv })
        let tongdiem = 0
        let tongtctl = 0
        let tongtc = 0
        for (let hp of listHP) {
            let diem4
            if (hp.diemchu == 'A') {
                diem4 = 4.0
            } else if (hp.diemchu == "B+") {
                diem4 = 3.5
            } else if (hp.diemchu == "B") {
                diem4 = 3.0
            } else if (hp.diemchu == "C+") {
                diem4 = 2.5
            } else if (hp.diemchu == "C") {
                diem4 = 2.0
            } else if (hp.diemchu == "D+") {
                diem4 = 1.5
            } else if (hp.diemchu == "D") {
                diem4 = 1
            }
            tongtc = tongtc + hp.sotc
            if (hp.diemchu != "F" && hp.dieukien == false) {
                tongtctl = tongtctl + hp.sotc
                tongdiem = tongdiem + diem4 * hp.sotc
            }
        }
        let diemtb = (tongdiem / tongtctl).toFixed(2)
        let infosv = await infoSvModel.findOne({ masv: masv })
        infosv.diemtb = diemtb
        infosv.tinchi = tongtc
        await infoSvModel.updateOne(infosv)
    } catch (err) {
        console.log(err, "updateDiemHP")
    }
}

let getFullHP = (masv) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listHP = await hocPhanModel.find(masv)
            if (listHP) {
                resolve({
                    errCode: 0,
                    mes: "success",
                    data: listHP
                })
            }
            resolve({
                errCode: 1,
                mes: "fail"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}

let editLop = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let info = {
                malop: data.malop,
                macb: data.macb
            }
            let lop = await lopHocModel.findOneAndUpdate(info, data)
            if (lop) {
                resolve({
                    errCode: 0,
                    mes: "success",
                })
            }
            resolve({
                errCode: 1,
                mes: "fail"
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}

let createAnnounce = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await announceModel.create(data)
            resolve({
                errCode: 0,
                mes: ''
            })
        } catch (err) {
            reject({
                errCode: 2,
                mes: "Lỗi Server"
            })
        }
    })
}
let getAllAnnounce = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await announceModel.find(data)
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
}
let getInfoCVHTFromMaLop = (malop) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoLop = await lopHocModel.findOne(malop)
            let macb = infoLop.macb
            let infoCV = await infoCVHTModel.findOne({ macb: macb })
            if (infoCV) {
                resolve({
                    errCode: 0,
                    mes: "success",
                    data: infoCV
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
let themDRL = (diemRL) => {
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
let getDRL = (data) => {
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
    getAllClass,
    getFullInfoSV,
    themhp,
    getDiemHP,
    deleteDiemHP,
    updateDiemHP,
    getFullHP,
    editLop,
    createAnnounce,
    getAllAnnounce,
    getInfoCVHTFromMaLop,
    themDRL,
    getDRL
}