const updateScore = (req,res,db) => {
    console.log(req.body.username)
      db.select('score').from('student')
      .where('username', '=', req.body.username)
      .update('score', req.body.score)
      .then(data => {
        console.log(data)
        res.json('Updated Score');
      })
  
  }

  const getScore = (req, res, db) =>{
    db.select('username','score').from('student')
    .orderBy('score','desc')
    .then(data => {
      let newMap = data.map(item => {
        return {name: item.username, score: item.score}
      })
      console.log('ners', newMap[0])
      console.log('new',newMap)
      res.json(newMap)
     
    })
  }

  module.exports = {
      updateScore: updateScore,
      getScore: getScore

  }