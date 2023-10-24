const User = require('../Models/userModel');

const signup = async (req, res) => {
//   const { fullname, email, password } = req.body;

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

module.exports = {
    signup,
}
