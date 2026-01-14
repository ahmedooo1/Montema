import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import servicesRoutes from './routes/services.js'
import galleryRoutes from './routes/gallery.js'
import contactRoutes from './routes/contact.js'
import authRoutes from './routes/auth.js'
import uploadRoutes from './routes/upload.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/contacts', contactRoutes) // Alias pour compatibilité

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ API available at http://localhost:${PORT}/api`)
})
