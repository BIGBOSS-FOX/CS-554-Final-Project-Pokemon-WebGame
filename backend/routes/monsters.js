const router = require('express').Router();
const { ObjectId } = require('mongodb');
let Monster = require('../Data/collectionFiles/Monster');

router.post('/add',async (req,res)=>{
    try{
        const {monsterName,Type,HP,Attack,SpAttack,Picture}=req.body;
        const NewMonster = await Monster.CreateMonster(monsterName,Type,HP,Attack,SpAttack,Picture)
        res.json(NewMonster)
    }catch (e)
    {
        throw e
    }
});
router.get('/:id',async (req,res)=>{

    try {
        const foundMonster = await Monster.GetMonsterById(req.params.id);
        res.json(foundMonster);
    }catch (e) {
        throw e;
    }
});
router.get('/name/:name',async (req,res)=>{

    try {
        const foundMonster = await Monster.GetMonsterByName(req.params.name);
        res.send(foundMonster);
        // res.json(foundMonster);
    }catch (e) {
        throw e;
    }
});


module.exports = router;