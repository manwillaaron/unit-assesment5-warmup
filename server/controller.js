const saltRounds = 10
const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password, email, name} = req.body
        const [user] = await db.get_username(username) 
        if(user) return res.sendStatus(400)
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        const [usernameId] = await db.add_username(username)
        const [newUser] = await db.add_hash([usernameId.username_id, hash, email, name])
        req.session.user = {
            username: newUser.username,
            id: newUser.username_id
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        // 1. add async to login function
        // 2. get the db so I can make db requests
        // 3. decstructre username and password from body
        const db = req.app.get('db'),
        {username, password} = req.body
        // 4. check if user exists
        const [user] = await db.find_user_by_username(username)
        // 5. if user doesnt exist stop function and send a failing status code
        if(!user) return res.sendStatus(404) 
        // 6. check if password is correct by hashing the plain text password 
        //    from body and the hash from step 4's user
        const passCheck = bcrypt.compareSync(password, user.hash)
        // 7. if password is incorrect send back failing status code
        if(!passCheck) return res.sendStatus(403)
        // 8. set our session user with username and id
        req.session.user = {
            username,
            id: user.username_id
        }
        // 9. respond with a valid status code and send the session object with that status
        res.status(200).send(req.session.user)
    },
    getUserInfo: async (req, res) => {
        // 1. check if there is a user on session if not send back a failing staus of not found
        if(!req.session && !req.session.user) return res.sendStatus(401)
        // 2. get and define our db so we can run queries
        const db = req.app.get('db'),
            {id} = req.session.user 
        // 3. run a query to get all needed info
        const [user] = await db.get_user_info(id)
        // 4. if found send successfull status and the user object 
        //    if not send back failing status code so we can redirect to login\
        if(!user) return res.sendStatus(404)
        res.status(200).send(user) 
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}