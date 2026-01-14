import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Get all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY order_position ASC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create service
router.post('/', async (req, res) => {
  try {
    const { title, description, icon, image_url, order_position } = req.body
    const [result] = await db.query(
      'INSERT INTO services (title, description, icon, image_url, order_position) VALUES (?, ?, ?, ?, ?)',
      [title, description, icon, image_url, order_position || 0]
    )
    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update service
router.put('/:id', async (req, res) => {
  try {
    const { title, description, icon, image_url, order_position } = req.body
    await db.query(
      'UPDATE services SET title = ?, description = ?, icon = ?, image_url = ?, order_position = ? WHERE id = ?',
      [title, description, icon, image_url, order_position, req.params.id]
    )
    res.json({ id: req.params.id, ...req.body })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM services WHERE id = ?', [req.params.id])
    res.json({ message: 'Service deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
