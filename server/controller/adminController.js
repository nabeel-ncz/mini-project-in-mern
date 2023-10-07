const adminCollection = require('../models/Admin');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminCollection.findOne({ email:email });
        if (admin) {
            if (admin.password === password) {
                const token = jwt.sign({
                    name: admin.name,
                    id: admin._id,
                }, "admintokensecret", { expiresIn: 60 * 60 * 24 });
                res.cookie('admintoken', token, { maxAge: 1000*60*60*24, httpOnly: true });
                res.json({
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
    
}

const createUser = async (req, res) => {
    
}

const editUser = async (req, res) => {

}

const deleteUser = async (req, res) => {
    
}

const adminLogout = (req, res) => {
    res.cookie("admintoken", "", { maxAge: 1});
    res.json({status:'ok'});
}

const checkAdminAuth = async (req, res) => {
    const token = req.cookies.admintoken;
    if(token) {
        jwt.verify(token, "admintokensecret", (err, decoded) => {
            if(err) {
                res.json({ status: 'error' , message: 'Admin invalid, token expired' })
            } else {
                res.json({ status:'ok', data:decoded });
            }
        })
    } else {
        res.json({ status:'error', message:"Token doesn't exist"});
    }
}

module.exports = {
    adminLogin,
    createUser,
    getAllUsers,
    editUser,
    deleteUser,
    checkAdminAuth,
    adminLogout,
};