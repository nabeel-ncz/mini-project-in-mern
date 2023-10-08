const adminCollection = require('../models/Admin');
const userCollection = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminCollection.findOne({ email: email });
        if (admin) {
            if (admin.password === password) {
                const token = jwt.sign({
                    name: admin.name,
                    id: admin._id,
                }, "admintokensecret", { expiresIn: 60 * 60 * 24 });
                res.cookie('admintoken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
                res.status(200).json({
                    status: 'ok', data: {
                        name: admin.name,
                        id: admin._id,
                    }
                })
            } else {
                res.json({ status: 'error', message: 'Email or password is incorrect' });
            }
        } else {
            res.json({ status: 'error', message: 'Email or password is incorrect' });
        }
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userCollection.find();
        if (users) {
            res.status(200).json({ status: 'ok', data: { users } });
        } else {
            res.json({ status: 'error', message: '' });
        }
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const filename = req?.file?.filename;
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
            res.json({ status: 'error', message: 'Database error' });
            return;
        }
        res.status(201).json({ status: 'ok' });
    } catch (err) {
        if (err.code === 11000) {
            res.json({ status: 'error', message: "Email is already exist" });
        } else {
            res.json({ status: 'error', message: err.message });
        }
    }
}

const getEditUserData = async (req, res) => {
    const userId = req.params?.id;
    try {
        const user = await userCollection.findOne({ _id: userId });
        res.status(200).json({ status: 'ok', data: { user } });
    } catch (err) {
        res.json({ status: 'error' })
    }
}

const editUser = async (req, res) => {
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

const deleteUser = async (req, res) => {
    const userId = req.params?.id;
    try {
        const user = await userCollection.deleteOne({ _id: userId });
        console.log(user);
        res.status(204).json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error' })
    }
}

const adminLogout = (req, res) => {
    res.cookie("admintoken", "", { maxAge: 1 });
    res.status(204).json({ status: 'ok' });
}

const checkAdminAuth = async (req, res) => {
    const token = req.cookies.admintoken;
    if (token) {
        jwt.verify(token, "admintokensecret", (err, decoded) => {
            if (err) {
                res.json({ status: 'error', message: 'Admin invalid, token expired' })
            } else {
                res.status(200).json({ status: 'ok', data: decoded });
            }
        })
    } else {
        res.json({ status: 'error', message: "Token doesn't exist" });
    }
}

module.exports = {
    adminLogin,
    createUser,
    getAllUsers,
    getEditUserData,
    deleteUser,
    checkAdminAuth,
    adminLogout,
    editUser,
};