const mongoose = require('mongoose')
const products = require("../../models/admin/productModel")
const User = require("../../models/user/usermodel")
const category = require('../../models/admin/categorymodel')

/*********************************************CATOGARY************************************* */
//Get Catogary Page
const getCategory = async (req, res) => {
  const data = await category.find().lean();
 
    res.render('admin/category', { admin: true, data })
}
//get addcatogary page
const getAddcategory = async (req, res) => {
    res.render('admin/add-category',{admin:true})
}
//post catogary page
const doAddcategory = async (req, res) => {
    
    const filepath = req.file.filename
    let existcategory =  await category.findOne({
        category: { $regex: new RegExp(req.body.category, "i") },
      });
    if (existcategory) {
        let message = "Catogary is already exist"
        res.render("admin/add-category", { message ,admin:true})
    }
    else {
        const pro = await category.create(req.body)
        const productId = pro._id
        const proup = await category.findByIdAndUpdate(productId, { image: filepath })
        res.redirect('/admin/category')
    }

}
// Unlist Category

const unlistCategory= async (req, res) => {
    try {
      
      await category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isUnlist: false } }
      );
      res.status(200).json({success: true})
    } catch (error) {
      console.error(error);
    }
  }


//   list category


  const listCategory= async (req, res) => {
    try {
       
      await category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isUnlist: true } }
      );
      res.status(200).json({success: true})
    } catch (error) {
      console.error(error);
    }
  }
//Delete category//
const deleteCategory = async (req, res) => {
  
    var id = req.params.id;

    //await deleteUser(id)
    await category.findByIdAndDelete({ _id: id })
    res.status(200).json({success: true})
  
}
// Get edit data//
const getEditcategory = async (req, res) => {
    try {
        
        var id = req.params.id
        const data = await category.findOne({ _id: id }).lean()
        console.log(data)
        res.render('admin/edit-category', { data, id ,admin:true})
    }
    catch (e) {
        console.log("Edit category Error in Get")
    }
}

// post Edit product//
const postEditCategory = async (req, res) => {
    try {
        const id=req.params.id
        let existcategory = await category.findOne({ category: req.body.category });
        // if (existcategory) {
        //     let message = "Catogary is already exist"
        //     res.render("admin/edit-category", { message,id })
        // }
        
            console.log(req.params.id)
            await category.find({ _id:id }).lean()
          
            const output = await category.findByIdAndUpdate({ _id:id }, {category: req.body.category,offer:req.body.offer, description: req.body.description})
    
            res.redirect("/admin/category")
       
       
    }
    catch (e) {
        console.log("Edit category Error in post")
    }
}
///get edit category
const getEditCategoryImg = async (req, res) => {

    var id = req.params.id
    const data = await category.findOne({ _id: id }).lean()
    console.log(data)
    res.redirect("/admin/category")
}
//post edit category image 
const postEditCategoryImg = async (req, res) => {


    const catoId = req.params.id;
 
    const filepath = req.file.filename
    const categori = await category.findByIdAndUpdate(catoId, { image: filepath })
    res.redirect("/admin/category")


}

module.exports = {
    getCategory, doAddcategory, deleteCategory, getEditcategory, postEditCategory, getAddcategory,
    getEditCategoryImg, postEditCategoryImg,unlistCategory,listCategory
}