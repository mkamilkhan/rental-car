const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Initialize Passport Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  // Smart callback URL detection - ALWAYS use Render URL if not localhost
  const getCallbackURL = () => {
    // Priority 1: Use environment variable if set
    if (process.env.GOOGLE_CALLBACK_URL) {
      console.log('Google OAuth: Using GOOGLE_CALLBACK_URL env var');
      return process.env.GOOGLE_CALLBACK_URL;
    }
    
    // Priority 2: Construct from API URL if available
    if (process.env.REACT_APP_API_URL || process.env.API_URL) {
      const apiUrl = process.env.REACT_APP_API_URL || process.env.API_URL;
      const callback = `${apiUrl}/api/auth/google/callback`;
      console.log('Google OAuth: Constructed from API URL:', callback);
      return callback;
    }
    
    // Priority 3: Check if running on Render
    // Render ALWAYS sets PORT environment variable (even if NODE_ENV is not set)
    const isRender = !!process.env.PORT;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // If PORT is set, we're definitely on Render (or similar platform)
    // NEVER use localhost if PORT is set
    if (isRender) {
      const renderUrl = 'https://offroad-rental-server.onrender.com/api/auth/google/callback';
      console.log('Google OAuth: Detected Render (PORT env var exists), using:', renderUrl);
      return renderUrl;
    }
    
    // Also check production mode
    if (isProduction) {
      const renderUrl = 'https://offroad-rental-server.onrender.com/api/auth/google/callback';
      console.log('Google OAuth: Detected production mode, using:', renderUrl);
      return renderUrl;
    }
    
    // Priority 4: Fallback to localhost ONLY if PORT is NOT set (true local development)
    const localhostUrl = 'http://localhost:5000/api/auth/google/callback';
    console.log('Google OAuth: Using localhost (development mode - no PORT env var)');
    return localhostUrl;
  };
  
  const callbackURL = getCallbackURL();
  console.log('Google OAuth: Final callback URL:', callbackURL);
  
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    // Mobile-friendly OAuth settings
    accessType: 'offline',
    prompt: 'select_account' // Force account selection instead of email input
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists with this Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with this email
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Link Google account to existing user
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }
      
      // Create new user
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        role: 'user'
      });
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));

  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});


// Google OAuth Routes
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account', // Force account selection on mobile
    accessType: 'offline'
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      // Use FRONTEND_URL on Render; localhost only when really local (no PORT or PORT=5000).
      const getFrontendUrl = () => {
        if (process.env.FRONTEND_URL) {
          const url = process.env.FRONTEND_URL.replace(/\/$/, '');
          console.log('Google OAuth: Using FRONTEND_URL:', url);
          return url;
        }
        const isLocalServer = !process.env.PORT || process.env.PORT === '5000';
        if (isLocalServer) {
          return 'http://localhost:3000';
        }
        return 'https://offroad-rental-client.onrender.com';
      };
      
      const frontendUrl = getFrontendUrl();
      console.log('Google OAuth: Redirecting to frontend:', frontendUrl);
      
      // HashRouter uses # for routes, so we need to add # before /auth/callback
      // Format: https://domain.com/#/auth/callback?token=...
      // Note: res.redirect() strips # from URL, so we need to use window.location or send HTML with script
      const tokenParam = encodeURIComponent(token);
      const emailParam = encodeURIComponent(req.user.email);
      const nameParam = encodeURIComponent(req.user.name);
      
      // Use HTML redirect with JavaScript to preserve # in URL
      const redirectHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Redirecting...</title>
          </head>
          <body>
            <script>
              window.location.href = '${frontendUrl}/#/auth/callback?token=${tokenParam}&email=${emailParam}&name=${nameParam}';
            </script>
            <p>Redirecting...</p>
          </body>
        </html>
      `;
      
      console.log('Google OAuth: Redirecting to HashRouter route:', `${frontendUrl}/#/auth/callback?token=...`);
      res.send(redirectHtml);
    } catch (error) {
      res.redirect('/login?error=authentication_failed');
    }
  }
);

module.exports = router;

