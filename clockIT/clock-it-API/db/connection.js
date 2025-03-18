import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./testDatabase.db", (err) => {
  if(err){return console.log(err)
  }
    console.log("Connection to database established")
})
process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown); 

function shutdown() {
  db.close((err) => {
    if (err) console.error(err);
    else console.log('Database connection closed.');
    process.exit(0);
  });
}

export default db;
