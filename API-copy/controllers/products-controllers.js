
const User = require('../models/users')

//get
exports.getUsers = async (req, res) => {
    try {
        const users = await Products.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
//get





// پست 
const postNewUser = async (req, res) => {  
    const { userName } = req.body;  

    const newUser = new User({  
       userName : userName
    });  

    try {  
        await newUser.save(); // Save the new product to DB  
        res.status(201).json({ message: 'User created-manafgrocery', user: newUser });  
    } catch (error) {  
        res.status(500).json({ message: 'Creating User failed', error });  
    }  
};
// پست 



exports.postNewUser = postNewUser
