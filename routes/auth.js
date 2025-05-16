const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

require('dotenv').config()

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    try{
        const user = await User.create({username: username, password: hashedPassword})
        res.status(201).json({message: 'Đăng ký thành công.'})
    }catch(err){
        res.status(404).json({message: 'Tên người dùng đã tồn tại'})
    }
})
// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})
    if(!user) 
        return res.status(404).json({error: 'Người dùng không tồn tại'})
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
            return res.status(401).json({ error: 'Sai mật khẩu'})
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({token})
})
router.get('/profile', verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
})

module.exports = router