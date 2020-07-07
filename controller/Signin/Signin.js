const handleSignin = (req,res,db, bcrypt) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).json('incorrect form submission');
    }
    db.select('username','password').from('student')
        .where('username', '=', username)
        .then(data => {
            console.log('the data', data[0])
            const isValid = bcrypt.compareSync(password,data[0].password);
            if(isValid){
                return db.select('*').from('student')
                    .where('username','=',username)
                    .then(user => {
                        console.log('the user', user[0])
                        res.json('Username Found')
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else{
                res.status(400).json('Wrong Credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}