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
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff;
                padding: 30px 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                padding: 30px;
              }
              .info-card {
                background-color: #f8f9fa;
                border-left: 4px solid #667eea;
                padding: 15px 20px;
                margin-bottom: 20px;
                border-radius: 5px;
              }
              .info-card .label {
                color: #667eea;
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 5px;
              }
              .info-card .value {
                color: #333333;
                font-size: 16px;
                line-height: 1.5;
              }
              .message-box {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin-top: 20px;
              }
              .message-box .label {
                color: #667eea;
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 10px;
              }
              .message-box .text {
                color: #333333;
                font-size: 15px;
                line-height: 1.6;
                white-space: pre-wrap;
              }
              .footer {
                background-color: #f8f9fa;
                color: #888888;
                text-align: center;
                padding: 20px;
                font-size: 12px;
              }
              .badge {
                display: inline-block;
                background-color: #667eea;
                color: #ffffff;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nouvelle Demande de Contact</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Vous avez reçu une nouvelle demande de devis</p>
              </div>
              
              <div class="content">
                <div class="info-card">
                  <div class="label">👤 Nom du client</div>
                  <div class="value">${name}</div>
                </div>
                
                <div class="info-card">
                  <div class="label">📱 Téléphone</div>
                  <div class="value">${phone}</div>
                </div>
                
                <div class="info-card">
                  <div class="label">🏗️ Type de projet</div>
                  <div class="value">
                    <span class="badge">${project_type}</span>
                  </div>
                </div>
                
                <div class="message-box">
                  <div class="label">💬 Message du client</div>
                  <div class="text">${message}</div>
                </div>
              </div>
              
              <div class="footer">
                <p style="margin: 0;">Ce message a été envoyé automatiquement depuis le formulaire de contact</p>
                <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Montema</p>
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
