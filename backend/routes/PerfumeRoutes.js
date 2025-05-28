const express = require ("express")
const router = express.Router();


const {
perfumeModel,
summerCollectionModel
} = require ("../models/PerfumeModel")

router.get('/perfume', async( req , res )=>{
    const perfumes = await perfumeModel.find();
    console.log(perfumes)
    res.json(perfumes)
} )



router.get('/summercollection', async( req, res)=>{
    const summerCollections = await summerCollectionModel.find();
    res.json( summerCollections)
})


module.exports = router;


