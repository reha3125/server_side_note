const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')
const mysql = require('mysql');
const d = new Date();
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'arjun1',
  password: '8699603125@',
  database: 'notes'
});
/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)
  const addnote ={
    text: req.body.text,
};   

var sql = 'INSERT INTO summary(text,dateCreated,lastModified) VALUES ("'+addnote.text+ '","'+d+'","'+d+'")';
   connection.query(sql, function (err, results) {
      if (err){ throw err;}
      console.log("row inserted");
      var sql = "select * from summary where id  = '"+results.insertId+"'";
      connection.query(sql, function (err, newNote ) {
        if (err){ 
          throw err;
        }
        res.send(newNote);
    });
  });
  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */
  const newText = req.body.text

  /*

    Your code here...

    const newNote = {} // this is the response object, make sure to replace with actual value



    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNote(newNote)) {
      res.status(500).send('Invalid data type')
    }
	  res.status(201).send({ newNote })
    // --- end of succ flow ---



    // Upon fail, run the following lines to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to insert')
    // --- end of fail flow ---
    
  */




})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/

  const noteId = req.body.id
	const newText = req.body.text
  var sql = "UPDATE summary SET text = '" +newText+"',"+"lastModified = '"+d+"'"+"WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) {
     if (err){ throw err;}
     console.log("row inserted");
     var sql = "select * from summary where id  = '"+noteId+"'";
     connection.query(sql, function (err, updatedNote ) {
      if (err){ 
        throw err;
      }
      res.send({ updatedNote })
  });
 });

	/* 

		// You code here...

		const updatedNote = {} // this is the response object, make sure to replace with actual value



    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNote(updatedNote)) {
      res.status(500).send('Invalid data type')
    }
	  res.send({ updatedNote })
    // --- end of succ flow ---



    // Upon fail, run the following lines to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to update')
    // --- end of fail flow ---

	*/



	
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id
  var sql = "DELETE FROM summary WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) {
      res.send()
 });

  /*

    // Your code here...



    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    res.send()
    // --- end of succ flow ---



    // Upon fail, run the following lines to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to delete')
    // --- end of fail flow ---

  */



 
})
/* -------------------------------------------------------------------------- */

module.exports = router
