const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    console.log('\n========== AUTH MIDDLEWARE ==========');
    console.log('Auth: Checking authorization for:', req.path);
    
    // Check both header formats
    const authHeader = req.header('Authorization') || req.headers.authorization;
    console.log('Auth: Header received:', authHeader ? authHeader.substring(0, 30) + '...' : 'NOT FOUND');
    
    const token = authHeader?.replace('Bearer ', '') || authHeader?.split(' ')[1];
    
    if (!token) {
      console.log('Auth: ❌ No token found');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('Auth: Token extracted:', token.substring(0, 20) + '...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    console.log('Auth: Token decoded:', { userId: decoded.userId, id: decoded.id });
    
    const userId = decoded.userId || decoded.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      console.log('Auth: ❌ User not found with ID:', userId);
      return res.status(401).json({ message: 'Token is not valid' });
    }

    console.log('Auth: ✅ User found:', { id: user._id.toString(), email: user.email, name: user.name });
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth: ❌ Error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = { auth, adminAuth };

