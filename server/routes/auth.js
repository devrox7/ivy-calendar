const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

//REGISTER
router.post('/register', async(req, res) => {
    //Validate user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });


    try {
        console.log('1');
        const savedUser = await user.save();
        console.log('2');

        res.send({ user: user._id });
        console.log('3');

    } catch (err) {
        console.log('4');

        res.status(400).send(err);
        console.log('5');

    }


});

//LOGIN
router.post('/login', async(req, res) => {
    //Validate user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged in');
});

module.exports = router;