const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
        console.log('photo came to multer')
        cb(null, path.join(__dirname, "../public/Images"));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name); // Remove the unnecessary callbacks here
    }
});

module.exports = multer({ storage: storage });




// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log('filemaeeeeee',file);

//     cb(null, path.join(__dirname, '../public'));
//   },
//   filename: function (req, file, cb) {
    
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const extname = path.extname(file.originalname);
//     const newName = uniqueSuffix + extname;
//     cb(null, newName);
//   },
// });


// const upload = multer({ storage });

// module.exports = upload;
