const admin = require("../../models/AdminModel");
const jwt = require("jsonwebtoken");

const handleSignUp = async (req, res) => {
  try {
    console.log('came',req.body);
    const { email, password } = req.body;
    const adminData = new admin({
     
      email,
      password,
    });
    await adminData.save();

    if (!adminData) {
      return res.status(500).json({ message: "unable to add admin" });
    }
    return res.status(201).json({ adminData });
  } catch (error) {
    res.status(500).json({ error: error.messege });
  }
};

// This function handles admin sign-in, taking in a request (req) and a response (res) as parameters.

const handleSignIn = async (req, res) => {
  try {
    let adminSignin = {
      Status: false,
      message: null,
      token: null,
     
    };
    const { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      const AdminData = await admin.findOne({ email: email });
      console.log(AdminData,'dataofadmin');
      if (!AdminData) {
        res.status(404).json({ success: false, messege: "Invalid email" });
      } else {
        if (password === AdminData.password) {


          // console.log(AdminData,'dataofadmin');
          const payload = { id: AdminData._id }
          const expiresIn = '24h';
          let AdminToken = jwt.sign(payload,'AdminsecretKey',{expiresIn });
          // console.log(AdminToken,'token...');


          adminSignin.token = AdminToken;
          adminSignin.Status = true;
          adminSignin.message= "Authenticated"
         
          res.status(200).json({adminSignin, success: true, messege: "Authenticated" });
        } else {
          res.status(401).json({ success: false, messege: "Incorrect Password" });
        }
      }
    } else {
      res.status(400).json({ success: false, messege: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.messege });
  }
};







module.exports = { handleSignIn,handleSignUp};
