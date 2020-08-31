const resetScore = (req,res,db) => {
    console.log(req.body.username)
      db.select('score').from('student')
      .where('score', '>', 0)
      .update('score', 0)
      .then(data => {
        console.log(data)
        res.json('Updated Score');
      })
  
  }


  module.exports = {
    resetScore: resetScore 
}