const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')
const mysql = require('mysql');
const d = new Date();
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'arjun1',
  password: '8699603125@',
  database: 'notes'
});


/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)
  var sql = 'SELECT * FROM summary';
  connection.query(sql, function (err, notes) {
     if (err){ throw err;}
     console.log("row is inserted");
     
     res.send({notes});
        });
  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */

  /*

    // Your code here...

    const notes = [] // this is the response object, make sure to replace with actual value



    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNoteArray(notes)) {
      res.status(500).send('Invalid data type')
    }
    res.send({ notes })
    // --- end of succ flow ---



    // Upon fail, run the following line to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to query')
    // --- end of fail flow ---
    
  */

})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching the notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
        const searchKey = req.params.searchKey
        var sql = "SELECT * FROM summary WHERE text like"+"\'"+"%"+searchKey+"%"+"\'";
               connection.query(sql, function (err, notes) {
                  if (err){ throw err;}
                  console.log("row searches");
                  res.send({notes});
              });
        
  console.log(searchKey)
 
  /*

    // Your code here...

    const notes = [] // this is the response object, make sure to replace with actual value


    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNoteArray(notes)) {
      res.status(500).send('Invalid data type')
    }
    res.send({ notes })
    // --- end of succ flow ---



    // Upon fail, run the following line to response with error

    // --- begin of fail flow ---
    res.status(500).send('Fail to query')
    // --- end of fail flow ---
    
  */



  // TODO-7.1: Remove this line once you start working on TODO-7
  
})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */var sql = "DELETE FROM summary";
  connection.query(sql, function (err, notes) {
    if (err){ throw err;}
    console.log("deleted data");
    res.send();
            });

  /*

    // Your code here...



    // Upon succ, run the following lines to validate the response object and reponse to client

    // --- begin of succ flow ---
    res.send()
    // --- end of succ flow ---



    // Upon fail, run the following line to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to delete')
    // --- end of fail flow ---

  */



  res.send()
})
/* -------------------------------------------------------------------------- */

module.exports = router