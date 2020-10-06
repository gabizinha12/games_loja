const multer = require('multer')
const path = require('path')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req,file, cb) => {
        cb(null, path.join(__dirname,"..","public","img","product"))
        },

        filename: (req,file,cb) => {
            cb(null, Date.now().toString()+"-"+file.originalname)
        }
    }),

    fileFilter: (req,file,cb) => {
        const isAccepted = ['image/webp', 'image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype );
        if(isAccepted) {
            return cb(null, true)
        }
        return cb(null,false)
    }
}))