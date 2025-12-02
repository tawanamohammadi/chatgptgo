/**
 * Admin authentication middleware
 * Uses simple password-based authentication for admin panel
 */
function adminAuth(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Check password from header
  const providedPassword = req.headers['x-admin-password'];
  
  if (!providedPassword) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (providedPassword !== adminPassword) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  next();
}

module.exports = { adminAuth };
