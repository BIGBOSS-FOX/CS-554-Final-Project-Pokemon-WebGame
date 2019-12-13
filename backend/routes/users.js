const router = require('express').Router();
// const { ObjectId } = require('mongodb');
let User = require('../Data/collectionFiles/User');

router.post('/add', async(req, res) => {
    try {
        const { userId, eMail, userName, passWord, bestScore, currentScore, monster } = req.body;
        const NewUser = await User.CreatUser(userId, eMail, userName, passWord, bestScore, currentScore, monster);
        res.send(NewUser)
    }catch (e)
    {
        console.log(e)
    }
});

router.put('/:userId/:monsterId', async(req, res) => {
    try {
        const updatedUser = await User.UserAddMonster(req.params.userId, req.params.monsterId);
        res.json(updatedUser);
    } catch (e) {
        throw e;
    }

});
router.put('/:userId/add/:monsterName', async(req, res) => {
    try {
        const updatedUser = await User.UserAddMonsterName(req.params.userId, req.params.monsterName);
        res.json(updatedUser);
    } catch (e) {
        throw e;
    }

});

router.put('/monster/user/clearmonster/:userId', async(req, res) => {
    try {
        console.log(1234567)
        const updatedUser2 = await User.UserClearMonster(req.params.userId);
        res.json(updatedUser2);
    } catch (e) {
        throw e;
    }

});

// router.put('/user/monster/clearmonster/:userId', async(req, res) => {
//     try {
//         console.log("1234567890")
//         let updatedUser = await User.UserClearMonster(req.params.userId);
//         console.log(updatedUser)
//         res.json(updatedUser);
//     } catch (e) {
//         console.log('123456')
//         throw e;
//     }
// });

router.get('/',async(req,res)=>{
    try{
        console.log(123456)
        const foundAllUser = await User.GetAllUsers();
        res.send(foundAllUser);
    }catch(e){
        console.log(654321)
        res.sendStatus(500);
    }
    
}
);

router.get('/email/:userEmail',async(req,res)=>{
    try{
        const foundUser = await User.FindUserByEmail(req.params.userEmail);
        console.log(foundUser);
        res.send(foundUser);
    }catch(e){
        throw e;
    }
});

router.get('/:userId', async(req, res) => {
    try {
        const foundUser = await User.FindUserByID(req.params.userId);
        res.json(foundUser);
    } catch (e) {
        throw e;
    }
});
router.put('/:userId', async(req, res) => {
    try {
        const { monsterName, newHP,bestScore } = req.body;
        if(monsterName && newHP){
            console.log("@@@@@@@@@@@#######");
            const updatedUser = await User.UpdateUserMonsterHP(req.params.userId,monsterName,newHP);
            // const updatedUser = await User.UpdateUserMonsterHP(req.params.userId, monsterName, newHP);
            console.log(updatedUser);
            res.json(updatedUser);
        }else if(bestScore){
            const updatedUser = await User.UpdateUserBestScore(req.params.userId, bestScore);
            res.json(updatedUser);
        }

    } catch (e) {
        throw e;
    }
});

// router.get('/:id',async (req,res)=>{
//
//     try {
//         const {monsterId} = req.params.id;
//         console.log("id:   "+monsterId);
//         const foundMonster = await Monster.GetMonsterById(monsterId);
//         console.log(foundMonster);
//         res.json(foundMonster);
//     }catch (e) {
//         throw e;
//     }
// })




module.exports = router;