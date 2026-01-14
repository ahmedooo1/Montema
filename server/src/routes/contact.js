import express from 'express'
import db from '../config/database.js'
import transporter from '../config/email.js'

const router = express.Router()

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, phone, project, message } = req.body
    const project_type = project || req.body.project_type

    // Validate required fields
    if (!name || !phone || !project_type || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }

    // Save to database
    const [result] = await db.query(
      'INSERT INTO contacts (name, phone, project_type, message) VALUES (?, ?, ?, ?)',
      [name, phone, project_type, message]
    )

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `Nouvelle demande de devis - ${project_type}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Type de projet:</strong> ${project_type}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Continue even if email fails
    }

    res.status(201).json({ 
      success: true,
      message: 'Votre demande a été envoyée avec succès',
      id: result.insertId 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC')
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    await db.query('UPDATE contacts SET status = ? WHERE id = ?', [status, req.params.id])
    res.json({ message: 'Status updated' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
