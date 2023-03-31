
const { infoSvModel, accountModel, infoCVHTModel, lopHocModel,
    hocPhanModel, announceModel, diemRLModel, hoatdongModel } = require('../config/SchemaDB.js')
class accountService {
    async deleteAccount(masv) {
        try {
            await accountModel.deleteOne({ username: masv })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new accountService()