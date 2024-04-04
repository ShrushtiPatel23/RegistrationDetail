const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


module.exports = {

    createUser: async (req, res) => {

        try {
            // Check whether the user with this email exists already
            let admin = await User.findOne({ email: req.body.email });
            if (admin) {
                return res.status(201).json({
                    message: "Email already Exist"
                });
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            const secPass = await bcrypt.hash(req.body.password, salt)

           
            // Create a new admin
             admin = await User.create({
                name: req.body.name,
                dateofBirth: req.body.dateofBirth,
                email: req.body.email,
                password: secPass
            });
           
            return res.status(200).json({
                data: admin,
                message: "Registratiion Succesfull"
            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }

    },

    loginUser: async (req, res) => {

         try {
            let admin = await User.findOne({ email: req.body.email });
            if (!admin) {
                return res.status(201).json({
                    message: "Please try to login with correct email"
                });
            }
            
            const passwordCompare = await bcrypt.compare(req.body.password, admin.password);
            if (!passwordCompare) {
                return res.status(201).json({
                    message: "Password Is Incorrect"
                });
            }

            const data = {
                admin: {
                    id: admin._id
                }
            }
            console.log(data)
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return res.status(200).json({
                authtoken: token,
                data,
                message: "Login Succesfully"

            });

        } catch (error) {
            console.error(error.message);
            return res.status(500).json({
                message: "Internal Server Error"
            });

        }
    
    },

    getUser: async (req, res) => {

            try {
                const result = await User.find({});
    
    
                return res.status(200).json({
                    data: result,
                });
    
            }
            catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
    
        },

        deleteUser: async (req, res) => {

            const id = req.params.id
    
            try {
                const result = await User.findByIdAndDelete(id);
                return res.status(200).json({
                    data: result,
                    message: "Deleted data Succesfully"
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
    
        },
    
        updateUser: async (req, res) => {
    
            const id = req.params.id
            const { name, dateofBirth, email } = req.body;
            try {
                const result = await User.findByIdAndUpdate(id, {
                    $set:
                    {
                        name: name, dateofBirth: dateofBirth, email: email, userId: req.admin.id
                    },
    
                },
                    { new: true }
                );
                return res.status(200).json({
                    data: result,
                    message: "Updated data Succesfully"
                });
            }
            catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
    
        }
   

}

