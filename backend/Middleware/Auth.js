const Admin = require('../models/AdminModel');
const jwt = require("jsonwebtoken");

const AdminAuth = async (req, res, next) => {
    try {
        console.log('request by Admin');
       

        const Header = req.headers.authorization;
        console.log(Header);
        if (!Header) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // const jwtToken = Header.replace('Bearer', '').trim();
        

        const jwtToken=Header.replace('Bearer','')
console.log(jwtToken);
const key='AdminsecretKey'
        const decodetoken = jwt.verify(jwtToken,key);
        const Id = decodetoken.id;
        const AdminData = await Admin.findById({ _id:Id });

        if (AdminData) {
            console.log('done');
            req.id = AdminData._id; 
            next(); 
        } else {
            return res.status(401).json({ error: "Unauthorized " });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={ AdminAuth}