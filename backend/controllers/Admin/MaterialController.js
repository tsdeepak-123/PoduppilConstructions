    const Material=require('../../models/MaterialModel')
const Project=require('../../models/ProjectModel')
const Purchase=require('../../models/PurchaseModel')



//handle material adding here
const handleMaterialAdding=async(req,res)=>{

    try {
        console.log(req.body,"iam bodyyyyyyyyy");
       const {MaterialName}=req.body
    
       const newMaterial=new Material({
          name:MaterialName,
         
        })

        await newMaterial.save()
        res.json({success:true, messege:"Material added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({messege:"internal server error"})
    }
}


//get full material list

const handleMaterialList = async (req, res) => {
    try {
      const allMaterials = await Material.find();
      // Material found
      res.status(200).json({ success: true, message: "Materials found", allMaterials });
      console.log(allMaterials, "alllllllllllllllllllllllll");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


//here purchase the materials

const handleMaterialPurchase = async (req, res) => {
    try {
    
      const { materials, projectname,date,careof } = req.body;
      console.log(careof,"careeeeeeeeeofffffffffffff");
      const projectId=await Project.findOne({name:projectname})
      if(!projectId){

        return res.json({
            success: false,
            message: "Failed find project",
          });
      }

    //   console.log(materials, projectname, "bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      const totalAmount = materials.reduce((acc, cur) => {
        return acc += cur.total;
      }, 0); 

      const newMaterial= new Purchase({
        project:projectId._id,
        TotalAmount:totalAmount,
        Material:materials,
        date:date,
        careof:careof

    });

    await newMaterial.save();
    // console.log('data added to db');
    res.status(200).json({sucess:true,messege:"Purchase bill added"})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  //.......................PurchaseData   by id ...........................

  const handlePurchaseById = async (req, res) => {
    try {
        const projectid = req.query.projectid;
        const PurchaseData = await Purchase.find({ project: projectid });
          console.log(PurchaseData);
        if (!PurchaseData || PurchaseData.length === 0) {
            return res.json({ success: false, message: "No data found" });
        }

        res.json({ success: true, message: "PurchaseData found successfully", PurchaseData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//............................handlePurchaseByDate ...........................


const handlePurchaseByDate = async (req, res) => {
    try {
        const date = req.query.date;
        const dateToFind = new Date(date + 'T00:00:00.000+00:00');
        const projectid = req.query.id;
        // console.log(req.query,dateToFind,projectid);
       
        const PurchaseData = await Purchase.find({
            project: projectid,
            date: {
                $gte: dateToFind,
                $lt: new Date(dateToFind.getTime() + 24 * 60 * 60 * 1000) 
            }
        });
        // console.log(PurchaseData);

        if (!PurchaseData || PurchaseData.length === 0) {
            return res.json({ success: false, message: "No data found" });
        }

        res.json({ success: true, message: "PurchaseData found successfully", PurchaseData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//.........................................

const handleMaterialTotal=async(req,res)=>{
    try {
        const materialData=await Purchase.find()
        if(materialData){
            res.json({sucess:true,messege:"Material data finded",materialData})
        }
        res.json({success:false,messege:"No data found"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports={handleMaterialAdding,handleMaterialList,handleMaterialPurchase,handleMaterialTotal,handlePurchaseById,handlePurchaseByDate}