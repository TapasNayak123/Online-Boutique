const User = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(402).json({
                success: true,
                message: 'User not found !!!!!!!!'
            })
        }

        bcrypt.compare(password, user.password).then(user => {
            let token = jwt.sign({user:user},"tapas",{expiresIn:'24h'})
            return res.status(200).json({
                success: true,
                message: "Login Successfully !!!!!!!",
                token:token
            })
        }).catch(error => {
            console.log("Login error ", error)
        })

    }).catch(error => {
        console.log("Error ", error)
    })

}

exports.registerUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    User.findOne({
        email: email
    }).then(result => {
        if (result) {
            return res.status(200).json({
                success: true,
                message: 'Usre already present !!!!!!!'
            })
        }
        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                let user = new User({
                    email: email,
                    password: hashedPassword,
                    name: name
                })
                return user.save().then(userData => {
                    res.json({
                        success: true,
                        message: "User registered successfully !!!!!!!!"
                    })

                }).catch(error => {
                    console.log("User registration error ", error)
                })
            }).catch(error => {
                console.log("Pritn bcrypt error ", error)
            })

    }).catch(error => {
        console.log("error ", error)
    })
}


exports.getUserDetails = (req,res,next)=>{
    User.find({}).then(user=>{
        res.status(200).json({
            success:true,
            message:"User detail found",
            data:user
        })
    }).catch(error=>{
        console.log("Error ", error)
    })


}




