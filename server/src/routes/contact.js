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
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f0e8;
                color: #1c1917;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
                border: 1px solid #e7e1d5;
              }
              .header {
                background-color: #15120f;
                color: #f5f0e8;
                padding: 25px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 26px;
                font-weight: 700;
              }
              .content {
                padding: 35px;
              }
              .info-details {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e7e1d5;
                gap: 8px;
              }
              .info-details:last-child {
                border-bottom: none;
              }
              .info-details .label {
                font-weight: 600;
                color: #78716c;
              }
              .info-details .value {
                font-weight: 500;
                color: #1c1917;
              }
              .message-box {
                background-color: #fefce8;
                border: 1px solid #fde047;
                border-radius: 8px;
                padding: 25px;
                margin-top: 20px;
              }
              .message-box .label {
                color: #1c1917;
                font-weight: 700;
                font-size: 14px;
                text-transform: uppercase;
                margin-bottom: 12px;
              }
              .message-box .text {
                color: #1c1917;
                font-size: 15px;
                line-height: 1.7;
                white-space: pre-wrap;
              }
              .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #78716c;
                background-color: #f5f5f4;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nouvelle demande de contact</h1>
              </div>
              <div class="content">
                <div class="info-card">
                  <div class="info-details">
                    <span class="label">Nom: &nbsp;</span>
                    <span class="value">${name}</span>
                  </div>
                  <div class="info-details">
                    <span class="label">Téléphone: &nbsp;</span>
                    <span class="value">${phone}</span>
                  </div>
                  <div class="info-details">
                    <span class="label">Type de projet: &nbsp;</span>
                    <span class="value">${project_type}</span>
                  </div>
                </div>
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="text">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>Cet e-mail a été envoyé depuis le formulaire de contact de votre site web.</p>
              </div>
            </div>
          </body>
          </html>
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
