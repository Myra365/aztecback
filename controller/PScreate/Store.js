
const storeBcrypt = (req,res,db, bcrypt) => {
    let pass = 'bert' 
    bcrypt.genSalt(10, function(err, salt) {
      console.log('salt', salt)
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          // Store hash in your password DB.
          console.log(req.body.username)
          console.log(req.body.password)
          db.select('password').from('student')
          .where('username', '=', req.body.username)
          .update('password', hash)
          .then(data => {
            console.log(data)
            res.json('Updated Password');
          })
          console.log('pass',pass)
          console.log('hash',hash)
          
      });    
  });
  }

  module.exports = {
      storeBcrypt: storeBcrypt
  }