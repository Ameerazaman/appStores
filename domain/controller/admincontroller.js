const { Collection } = require("mongoose")
const Admin =require("../config/adminmodel")
const insertadmin=async (req,res)=>{
    return new Promise((resolve,reject)=>{

        try{

            console.log(req.body.Name)
            const name=(req.body.Name)
            console.log(name)
            //console.log(name1)
            const admin=new Admin({Name:req.body.Name,Password:req.body.Password})
             user.save()
            .then(function (savedData){
                //console.log(savedData._id)
                resolve(savedData._id)
            
            })
            .catch(function(err){
                console.log(err)
            })
            console.log("success")
            
    
        }
        catch(error)
        {
            console.log(error.message)
        }
    })
    }
    module.exports=insertadmin

