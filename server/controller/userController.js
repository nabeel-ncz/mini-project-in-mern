const userCollection = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let filename = "";
    if (req?.file?.filename) {
        filename = req.file.filename;
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        const data = await userCollection.create({
            name,
            email,
            password: hash,
            profile: filename,
            createdAt: new Date().toLocaleString(),
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
        res.status(201).json({ status: 'ok', data: { name, userId: data._id } });
    } catch (err) {
        if (err.code === 11000) {
            res.json({ status: 'error', message: "Email is already exist" });
        } else {
            res.json({ status: 'error', message: err.message });
        }
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userCollection.findOne({ email: email });
        if (!user) {
            res.json({ status: "error", message: "Email doesn't exist" });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ status: "error", message: "Email or password is incorrect" });
            return;
        }
        const token = jwt.sign({ name: user.name, id: user._id }, "userjwtsecret", { expiresIn: 60 * 60 * 24 });
        res.cookie("userjwt", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.status(200).json({
            status: "ok", data: {
                name: user.name,
                userId: user._id,
            }
        });
    } catch (err) {
        if (err.code === 11000) {
            res.json({ status: 'error', message: "Email is already exist" });
        } else {
            res.json({ status: 'error', message: err.message });
        }
    }
}

const updateUser = async (req, res) => {
    const userId = req.params?.id;
    const { name, email, password } = req.body;
    const filename = req?.file?.filename;
    try {
        const hash = await bcrypt.hash(password, 10);
        const data = await userCollection.updateOne({ _id: userId }, {
            name,
            email,
            password: hash,
            profile: filename,
        })
        if (!data) {
            res.json({ status: 'error', message: 'Database error' });
            return;
        }
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        if (err.code === 11000) {
            res.json({ status: 'error', message: "Email is already exist" });
        } else {
            res.json({ status: 'error', message: err.message });
        }
    }
}

const getUser = async (req, res) => {
    const id = req.params?.id;
    try {
        const user = await userCollection.findOne({_id: id});
        if(!user) {
            res.json({status:'error', message:'User not found'});
            return;
        }
        res.status(200).json({status:'ok', data : {user}});
    } catch (error) {
        res.json({ status:'error', message : error.message });
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
                res.status(200).json({ status: 'ok', data: decoded });
            }
        })
    } else {
        res.json({status:"error", message: "token doesn't exist"});
    }
}
const logoutUser = (req, res) => {
    res.cookie("userjwt", "", { maxAge: 1});
    res.status(200).json({status:'ok'});
}

module.exports = {
    registerUser,
    loginUser,
    checkUserAuth,
    logoutUser,
    getUser,
    updateUser,
}
