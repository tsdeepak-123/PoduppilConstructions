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
      const { materials, projectname,date } = req.body;
      const projectId=await Project.findOne({name:projectname})
      if(!projectId){

        return res.json({
            success: false,
            message: "Failed find project",
          });
      }
      console.log(materials, projectname, "bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      const totalAmount = materials.reduce((acc, cur) => {
        return acc += cur.total;
      }, 0); 

      const newMaterial= new Purchase({
        project:projectId._id,
        TotalAmount:totalAmount,
        Material:materials,
        date:date

    });

    await newMaterial.save();
      console.log(totalAmount, 'totalamount');
    } catch (error) {
      console.log(error);
    }
  };
  

const handleMaterialTotal=async(req,res)=>{
    try {
        const materialData=await Purchase.find()
        if(materialData){
            res.json({sucess:true,messege:"Material data finded",materialData})
        }
        res.json({success:false,messege:"No data found"})
    } catch (error) {
        console.log(error);
    }
}



module.exports={handleMaterialAdding,handleMaterialList,handleMaterialPurchase,handleMaterialTotal}