const dbConnection = require('./Data/connection');
const Monster = require('./Data/collectionFiles/Monster');


async function main() {
    try {
        const db = await dbConnection();
        await db.dropDatabase();
        await Monster.CreateMonster("Bulbasaur","Grass",100,25,20,"../images/Bulbasaur.png");
        await Monster.CreateMonster("Charmander","Fire",100,25,20,"../images/Charmander.png")
        await Monster.CreateMonster("Electabuzz","Electric",100,25,20,"../images/Electabuzz.png")
        await Monster.CreateMonster("Growlithe","Fire",100,25,20,"../images/Growlithe.png")
        await Monster.CreateMonster("Meowth","Normal",120,25,null,"../images/Meowth.png")
        await Monster.CreateMonster("Oddish","Grass",100,25,20,"../images/Oddish.png")
        await Monster.CreateMonster("Pikachu","Electric",100,25,20,"../images/Pikachu.png")
        await Monster.CreateMonster("Psyduck","Water",100,25,20,"../images/Psyduck.png")
        await Monster.CreateMonster("Rattata","Normal",120,25,0,"../images/Rattata.png")
        await Monster.CreateMonster("Squirtle","Water",100,25,20,"../images/Squirtle.png")
        console.log('Done seeding database');
    }catch(e)
    {
        console.log(e);
    }
}

main();
// {
//     monsterName:Bulbasaur,
//     Type:Grass,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Bulbasaur.png'
// }

// {
//     monsterName:Charmander,
//     Type:Fire,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Charmander.png'
// }

// {
//     monsterName:Electabuzz,
//     Type:Electric,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Electabuzz.png'
// }

// {
//     monsterName:Growlithe,
//     Type:Fire,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Growlithe.png'
// }

// {
//     monsterName:Meowth,
//     Type:Nromal,
//     HP:120,
//     Attack:25,
//     SpAttack:null,
//     Picture:'../images/Meowth.png'
// }

// {
//     monsterName:Oddish,
//     Type:Grass,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Oddish.png'
// }

// {
//     monsterName:Pikachu,
//     Type:Electric,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Pikachu.png'
// }

// {
//     monsterName:Psyduck,
//     Type:Water,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Psyduck.png'
// }

// {
//     monsterName:Rattata,
//     Type:Nromal,
//     HP:120,
//     Attack:25,
//     SpAttack:null,
//     Picture:'../images/Rattata.png'
// }

// {
//     monsterName:Squirtle,
//     Type:Water,
//     HP:100,
//     Attack:25,
//     SpAttack:20,
//     Picture:'../images/Squirtle.png'
// }