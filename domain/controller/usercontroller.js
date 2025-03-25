const { Collection } = require("mongoose")
const Users=require("../config/userModel")
const insertuser=async (req,res)=>{
    return new Promise((resolve,reject)=>{

        try{

            console.log(req.body.Name)
            const name=(req.body.Name)
            console.log(name)
            //console.log(name1)
            const user=new Users({Name:req.body.Name,Password:req.body.Password})
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
    module.exports=insertuser


//     })
//     try{
//         const users= new Users({
//             name:req.body.username,
//             password:req.body.password
//         })
//         const result=await users.save();
//         console.log("login is successfull")
//         res.send("login is successfull"+result)




//     }catch(error){
//         console.log(error)
//     }
    
//     const userdata=await Collection.insertMany(data)
//     console.log(userdata)
// }
// module.exports=insertuser