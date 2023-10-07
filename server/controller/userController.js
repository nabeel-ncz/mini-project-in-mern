const userCollection = require('../models/User');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let filename = "";
    if (req?.file?.filename) {
        filename = req.file.filename;
    }
    try {
        const hash = await bcyrpt.hash(password, 10);
        const data = await userCollection.create({
            name,
            email,
            password: hash,
            profile: filename,
        });
        if (!data) {
            res.json({ status: 'error', message: 'database error' });
            return;
        }
        const token = jwt.sign({ name: name, id: data._id }, "userjwtsecret", { expiresIn: 60 * 60 * 24 });
        res.cookie("userjwt", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.json({ status: 'ok', data: { name, userId: data._id } });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
            res.json({ status: "error", message: "email doesn't exist" });
            return;
        }
        const match = await bcyrpt.compare(password, user.password);
        if (!match) {
            res.json({ status: "error", message: "email or password is incorrect" });
            return;
        }
        const token = jwt.sign({ name: user.name, id: user._id }, "userjwtsecret", { expiresIn: 60 * 60 * 24 });
        res.cookie("userjwt", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.json({
            status: "ok", data: {
                name: user.name,
                userId: user._id,
            }
        });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
}

const checkUserAuth = (req, res) => {
    const token = req?.cookies?.userjwt;
    console.log('check_user_auth');
    if (token) {
        jwt.verify(token, "userjwtsecret", (err, decoded) => {
            if (err) {
                res.json({ status: "error", message: err });
            } else {
                res.json({ status: 'ok', data: decoded });
            }
        })
    } else {
        res.json({status:"error", message: "token doesn't exist"});
    }
}
const logoutUser = (req, res) => {
    res.cookie("userjwt", "", { maxAge: 1});
    res.json({status:'ok'});
}

module.exports = {
    registerUser,
    loginUser,
    checkUserAuth,
    logoutUser
}