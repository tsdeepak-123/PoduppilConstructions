const Project = require("../../models/ProjectModel");

const Labour = require("../../models/LabourModal");

// This function handles Project Adding to database, taking in a request (req) and a response (res) as parameters.

const handleProjectAdding = async (req, res) => {
  try {
  
    const { projectnumber,
      name,
      date,
      status,
      upnext,
      pending,
      notes,
      supervisorname } =
      req.body;

    if (
      projectnumber&&
      name&&
      date&&
      status&&
      upnext&&
      pending&&
      notes&&
      supervisorname
    ) {
      const ProjectExist = await Project.findOne({ projectnumber });
      if (ProjectExist) {
        res.json({
          success: false,
          messege: "project already exist.Please check project List",
        });
      } else {
        const newProject = new Project({
          projectnumber,
          name,
          date,
          status,
          upnext,
          pending,
          notes,
          supervisorname
        });
       
        await newProject.save();
        res
          .status(200)
          .json({ success: true, messege: "Project added successfully" });
      }
    } else {
      res.json({ success: false, messege: "All fields must be field " });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// ................................... Project Editing ..................................

const handleProjectEditing = async (req, res) => {
  try {

    const id=req.params.id

    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.status ||
      !req.body.upnext ||
      !req.body.pending ||
      !req.body.notes ||
      !req.body.supervisorname ||
      !req.body.projectnumber
    ) {
      console.log("cccccccccccc");
      return res.status(400).json({ success: false, messege: "All fields must be field " });
    }
    
  
    const updatedProject=await Project.findByIdAndUpdate(
      id,{ $set:req.body},{new:true}
    )  

    if(!updatedProject){
      return res.status(404).json({error:"Project not found"})
    }

    res.status(200).json({ success: true, messege: "Project Updated successfully" })
   
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" });
  }
};




//   ................................... listing all projects details..................................

const ProjectList =async(req,res)=>{
  try {
      const FindProject = await Project.find()
      console.log(FindProject);
      if(!FindProject){
          res.json({ success: false, messege: "cant find Project details " });
      }
      res.status(200).json({FindProject, success: true });
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }
}

//...................project single view based on id ........................

const ProjectListById =async(req,res)=>{
  try {
      const id=req.query.id
      const FindProject = await Project.find({_id:id})
      console.log(FindProject);
      if(!FindProject){
          res.json({ success: false, messege: "cant find Project details " });
      }
      res.status(200).json({FindProject, success: true });
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }
}






module.exports={
  handleProjectAdding,handleProjectEditing,ProjectList,ProjectListById
}