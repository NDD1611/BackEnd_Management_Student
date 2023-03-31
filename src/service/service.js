
const { infoSvModel, accountModel, infoCVHTModel, lopHocModel,
    hocPhanModel, announceModel, diemRLModel, hoatdongModel } = require('../config/SchemaDB.js')


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

let login = async (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await accountModel.findOne({ username: info.masv })
            let dataAc = {
                masv: account.username,
                role: account.role
            }
            if (account) {
                if (account.password === info.password) {
                    let dataRes
                    if (account.role == 'student') {
                        dataRes = await infoSvModel.findOne({ masv: info.masv })
                        if (dataRes) {
                            let infoLop = await lopHocModel.findOne({ malop: dataRes.malop })
                            dataRes = {
                                ...dataRes._doc,
                                khoahoc: infoLop.khoahoc,
                                namhoc: infoLop.namhoc
                            }
                        } else {
                            dataRes = dataAc
                        }
                    } else if (account.role == 'teacher') {
                        dataRes = await infoCVHTModel.findOne({ macb: info.masv })
                        if (dataRes) {
                            dataRes.password = ''
                        } else {
                            dataRes = dataAc
                        }
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
            console.log(err)
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
            if (!user) {
                await accountModel.create(data)
                if (data.role == 'teacher') {
                    let info = {
                        macb: data.username,
                        role: data.role
                    }
                    await infoCVHTModel.create(info)
                }
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

let getAllClass = (consultantID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await lopHocModel.find({ macb: consultantID })
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
        await infoSvModel.deleteOne(infosv)
        await infoSvModel.create(infosv)
    } catch (err) {
        console.log(err, "updateDiemHP")
    }
}

let getFullHP = (studentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listHP = await hocPhanModel.find({ masv: studentID })
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
            console.log(err)
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
let delLop = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await infoSvModel.deleteMany(data)
            await lopHocModel.deleteOne(data)
            resolve({
                errCode: 0,
                mes: "success",
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
let getAllAnnounce = (classID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await announceModel.find({ malop: classID })
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
let getInfoCVHTFromMaLop = (classID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let infoLop = await lopHocModel.findOne({ malop: classID })
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
let addHD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await hoatdongModel.create(data)
            resolve({
                errCode: 0,
                mes: "add success"
            })
        } catch (err) {
            reject({
                errCode: 3,
                mes: "Lỗi Server"
            })
        }
    })
}
let getHD = (masv) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listHD = await hoatdongModel.find({ masv: masv })
            resolve({
                errCode: 0,
                mes: "",
                data: listHD
            })
        } catch (err) {
            reject({
                errCode: 3,
                mes: "Lỗi Server"
            })
        }
    })
}
let editHD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newData = {
                masv: data.masv,
                namhoc: data.namhoc,
                hocki: data.hocki,
                tenHD: data.tenHD
            }
            await hoatdongModel.findOneAndUpdate({ _id: data._id }, newData)
            resolve({
                errCode: 0,
                mes: "",
            })
        } catch (err) {
            reject({
                errCode: 3,
                mes: "Lỗi Server"
            })
        }
    })
}
let delHD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            await hoatdongModel.findOneAndDelete({ _id: data._id })
            resolve({
                errCode: 0,
                mes: "",
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
    login,
    createAccount,
    changePass,
    editCVHT,
    addClass,
    getAllClass,
    themhp,
    getDiemHP,
    deleteDiemHP,
    updateDiemHP,
    getFullHP,
    editLop,
    delLop,
    createAnnounce,
    getAllAnnounce,
    getInfoCVHTFromMaLop,
    addHD,
    getHD,
    editHD,
    delHD
}