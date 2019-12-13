const dbConnection = require('./connection');

const getCollectionFn = collection => {
  let col;
  return async () => {
    if (!col) {
      const db = await dbConnection();
      col = await db.collection(collection);
    }
    return col;
  };
};

module.exports = {
  User: getCollectionFn('User'),
  Monster: getCollectionFn('Monster'),
  // courses: getCollectionFn('courses'),
};
