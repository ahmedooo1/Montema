import express from 'express'
import db from '../config/database.js'

const router = express.Router()

// Get all gallery items (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    let query = 'SELECT * FROM gallery'
    const params = []
    
    if (category && category !== 'Tous') {
      query += ' WHERE category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY order_position ASC'
    const [rows] = await db.query(query, params)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single gallery item
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery WHERE id = ?', [req.params.id])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create gallery item
router.post('/', async (req, res) => {
  try {
    const { title, category, image_url, media_type, order_position } = req.body
    const [result] = await db.query(
      'INSERT INTO gallery (title, category, image_url, media_type, order_position) VALUES (?, ?, ?, ?, ?)',
      [title, category, image_url, media_type || 'image', order_position || 0]
    )
    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const { title, category, image_url, media_type, order_position } = req.body
    await db.query(
      'UPDATE gallery SET title = ?, category = ?, image_url = ?, media_type = ?, order_position = ? WHERE id = ?',
      [title, category, image_url, media_type || 'image', order_position, req.params.id]
    )
    res.json({ id: req.params.id, ...req.body })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id])
    res.json({ message: 'Gallery item deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
