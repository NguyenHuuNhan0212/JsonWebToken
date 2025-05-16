const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader)
        return res.status(403).json({ error: 'Không có token'})
    
    const token = authHeader.split(' ')[1]; // lấy phần sau "Bearer"
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err){
        res.status(401).json({ error: 'Token không hợp lệ'})
    }
}

module.exports = verifyToken