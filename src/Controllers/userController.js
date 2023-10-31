const User = require('../Models/userModel');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
// const hashPassword = require('../Middleware/auth');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      fullname,
      email,
      password : hashPassword,
    };

    // check user
    let checkUser = await User.findOne( {where : {email : email}})
    if (checkUser == null) {
      const user = await User.create(data);
      return res.status(201).json({ 
        status: true,
        message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', user });
    }
    else{
      res.status(409).json({
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ນີ້ມີຄົນໃຊ້ແລ້ວ ກາລຸນາທົງທະບຽນໃໝ່"
      })
    }
   
  } catch (error) {
    console.error('Error while creating a new user:', error);
    return res.status(400).json({ message: 'ລົງທະບຽນຜູ້ໃຊ້ງານຜິດພາດ' });
  }
};

// login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({ where: { email: email } });

    //if user email is failed, compare password with bcrypt
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file
      if (isMatch) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        
        return res.status(200).json({ 
          status: true,
          message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ!!',
          user, token });
      } else {
        return res.status(401).json({
          status: false,
          message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!"
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງກະລຸນາລອງໃໝ່!"
      });
    }
  } catch (error) {
    res.status(500).json('api is not failed')
    console.log(error);
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); 
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error while fetching all users:', error);
    return res.status(500).json({ message: 'Failed to retrieve users' });
  }
};


//get user one user
const getOneUser = async (req, res) => {
  try {
    const id = req.params.id; 

    // Find the user by ID in the database
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error while fetching one user:', error);
    return res.status(500).json({ message: 'Failed to retrieve user' });
  }
};


// edit user
const editUser = async (req, res) => {
  try {
    const id = req.params.id; 

    // Find the user by ID in the database
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Update user information with the data from the request body
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error while updating user:', error);
    return res.status(400).json({ message: 'Failed to update user' });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id; 

    // Find the user by ID in the database
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user from the database
    await user.destroy();

    return res.status(204).send(); 
  } catch (error) {
    console.error('Error while deleting user:', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
};




module.exports = {
    signup,
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    login
}
