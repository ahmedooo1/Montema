-- Create database
CREATE DATABASE IF NOT EXISTS montama_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE montama_db;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  order_position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery/Portfolio table
CREATE TABLE IF NOT EXISTS gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category ENUM('Cuisines', 'Dressings', 'Meubles') NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  order_position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  project_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default services
INSERT INTO services (title, description, icon, image_url, order_position) VALUES
('Cuisines Sur Mesure', 'Conception et installation de cuisines fonctionnelles et esthétiques adaptées à votre espace.', 'Layout', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800', 1),
('Chambres & Dressings', 'Optimisation de vos espaces de repos avec des rangements intelligents et élégants.', 'Bed', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800', 2),
('Bibliothèques & Étagères', 'Créations uniques pour mettre en valeur vos livres et objets de décoration.', 'Box', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=800', 3),
('Montage de Meubles', 'Service professionnel de montage pour tous types de mobilier de commerce ou d\'habitation.', 'Hammer', 'https://images.unsplash.com/photo-1581785056127-4829c6de4622?auto=format&fit=crop&q=80&w=800', 4);

-- Insert default gallery items
INSERT INTO gallery (title, category, image_url, order_position) VALUES
('Cuisine Contemporaine', 'Cuisines', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', 1),
('Dressing Minimaliste', 'Dressings', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=600', 2),
('Bibliothèque Chêne', 'Meubles', 'https://images.unsplash.com/photo-1598425237654-4fc758e50a93?auto=format&fit=crop&q=80&w=600', 3),
('Meuble TV Intégré', 'Meubles', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=600', 4),
('Cuisine îlot central', 'Cuisines', 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&q=80&w=600', 5),
('Armoire d\'angle', 'Dressings', 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=600', 6);
