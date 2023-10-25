const User = require('../Models/userModel');

const signup = async (req, res) => {
  try {
    // Create a new user in the database
    const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    }
    const user = await User.create(data);

    return res.status(201).json({ message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', user });
  } catch (error) {
    console.error('Error while creating a new user:', error);
    return res.status(400).json({ message: 'ລົງທະບຽນຜູ້ໃຊ້ງານຜິດພາດ' });
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


module.exports = {
    signup,
    getAllUsers,
    getOneUser,
    editUser
}
