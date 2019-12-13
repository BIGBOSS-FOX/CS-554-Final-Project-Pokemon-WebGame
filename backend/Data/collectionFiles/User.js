const { ObjectId } = require('mongodb');
// const bcrypt = require('bcrypt');
const mongoCollections = require('../collections');
const monsterData = require('./Monster');

const { User, Monster } = mongoCollections;

async function CreatUser(_userId, _eMail, _userName, _passWord) {
    const userCollections = await User();

    const newUser = {
        userId: _userId,
        eMail: _eMail,
        userName: _userName,
        passWord: _passWord,
        bestScore: 0,
        currentScore: 0,
        monster: [],
    };

    const insertInfo = await userCollections.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not add new student';

    return newUser;
}
async function UserAddMonster(_UserId, _MonsterId) {
    const userCollection = await User();
    _MonsterId = ObjectId(_MonsterId);
    let addedMonster = await monsterData.GetMonsterById(_MonsterId);
    _UserId = ObjectId(_UserId);
    await userCollection.findOneAndUpdate({ _id: _UserId }, {
        $push: {
            monster: addedMonster
        }
    });
    return await FindUserByID(_UserId);
}



async function UserClearMonster(_UserId) {
    console.log("Enter UserClearMonster")
    const userCollection = await User();
    _UserId = ObjectId(_UserId);
    // let updatedUser = await this.FindUserByID(_userId);

    await userCollection.findOneAndUpdate(
        { _id: _UserId}, {
            $set: {
                "monster": []
            }
        }
    );
    return await FindUserByID(_UserId);
}


async function UserAddMonsterName(_UserId, _MonsterName) {
    const userCollection = await User();
    let addedMonster = await monsterData.GetMonsterByName(_MonsterName);
    _UserId = ObjectId(_UserId);
    await userCollection.findOneAndUpdate({ _id: _UserId }, {
        $push: {
            monster: addedMonster
        }
    });
    return await FindUserByID(_UserId);
}

async function GetAllUsers() {
    const userCollection = await User();
    const userlist = await userCollection.find({}).toArray();
    console.log(userlist)

    return userlist;
}

async function UpdateUserMonsterHP(_userId, _monsterName, _updatedHP) {
    try {

        const userCollection = await User();

        _userId = ObjectId(_userId);
        // let updatedUser = await this.FindUserByID(_userId);
        console.log("zaizheliaaaaaaaaaaaaaa")
        await userCollection.findOneAndUpdate(
            {_id: _userId, 'monster.monsterName': _monsterName}, {
                $set: {
                    "monster.$.HP": _updatedHP
                }
            }
        );
        console.log("$$$$$$$$$$$$$$$$");
        return await FindUserByID(_userId);
    }
    catch (e) {
        throw e;
    }
}
async function UpdateUserBestScore(_userId, _bestScore){
    const userCollection = await User();
    _userId = ObjectId(_userId);
    // let updatedUser = await this.FindUserByID(_userId);

    await userCollection.findOneAndUpdate(
        { _id: _userId}, {
            $set: {
                bestScore: _bestScore
            }
        }
    );
    return await FindUserByID(_userId);
}


async function FindUserByID(_id) {
    console.log("Enter FindUserByID")
    const userCollection = await User();
    const parsedId = ObjectId(_id);

    const userFound = await userCollection.findOne({ _id: parsedId });
    console.log(userFound)
    if (userFound === null) 
    {
        // console.log(parsedId)
        // console.log('1234567890')
        throw `No player with id ${parsedId}`;
    }

    return userFound;
}


async function FindUserByEmail(_eMail) {
    console.log(_eMail);
    const userCollection = await User();
    return await userCollection.findOne({ eMail: _eMail });

}


// CreatUser("Tao","123123");
// // SetUserAttribute("5d978be22c29032e144e8178",100,[1,2,3,4,5]);
// UserAddMonster('5deaa9adfae7b432985387e4','5dea96fd41e22c41ec815819');


module.exports = {
    CreatUser,
    UserAddMonster,
    GetAllUsers,
    FindUserByID,
    UserAddMonsterName,
    UserClearMonster,
    FindUserByEmail,
    UpdateUserBestScore,
    UpdateUserMonsterHP
};