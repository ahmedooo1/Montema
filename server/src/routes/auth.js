import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // In production, use bcrypt to compare hashed passwords
    const [users] = await db.query(
      'SELECT id, username, email FROM admin_users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const user = users[0];
    
    // In production, generate a JWT token here
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [servicesCount] = await db.query('SELECT COUNT(*) as count FROM services');
    const [galleryCount] = await db.query('SELECT COUNT(*) as count FROM gallery');
    const [contactsCount] = await db.query('SELECT COUNT(*) as count FROM contacts');
    const [newContactsCount] = await db.query("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'");

    res.json({
      success: true,
      stats: {
        services: servicesCount[0].count,
        gallery: galleryCount[0].count,
        totalContacts: contactsCount[0].count,
        newContacts: newContactsCount[0].count
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics' 
    });
  }
});

export default router;
