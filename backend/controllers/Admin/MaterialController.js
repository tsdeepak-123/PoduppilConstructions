const Material=require('../../models/MaterialModel')
const Purchase=require('../../models/PurchaseModel')



//handle material adding here
const handleMaterialAdding=async(req,res)=>{

    try {
        console.log(req.body,"iam bodyyyyyyyyy");
       const {MaterialName,MaterialRate}=req.body
    //    const alreadyExist=await Material.find({ name: MaterialName,
    //     rate: MaterialRate})
    //     if(alreadyExist){
    //         res.json({success:false, messege:"Material already exists"})
    //     }
       const newMaterial=new Material({
          name:MaterialName,
          rate:MaterialRate
        })

        await newMaterial.save()
        res.json({success:true, messege:"Material added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({messege:"internal server error"})
    }
}


//get full material list

const handleMaterialList=async(req,res)=>{
    try {

        const allMaterials=await Material.find()
        if(!allMaterials){
            res.json({success:false, messege:"No materials found"})
        }

        res.json({success:true, messege:"materials finded",allMaterials})
        console.log(allMaterials,"alllllllllllllllllllllllll");
    } catch (error) {
        console.log(error);
        res.status(500).json({messege:"internal server error"})
    }
}


//here purchase the materials

const handleMaterialPurchase=async(req,res)=>{
try {
    console.log(req.body,"bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
} catch (error) {
    console.log(error);
}
}


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