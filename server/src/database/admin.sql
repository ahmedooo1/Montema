-- Create admin users table
USE montama_db;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: Admin123!)
-- In production, use bcrypt to hash passwords
INSERT INTO admin_users (username, password, email) VALUES
('admin', 'Admin123!', 'admin@montama.fr');
