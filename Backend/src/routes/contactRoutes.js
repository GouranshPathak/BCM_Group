const express = require('express');
const { createContact, getAllContacts } = require('../controllers/contactController');
const router = express.Router();

// POST /api/contact/submit - Submit new contact message
router.post('/submit', createContact);

// GET /api/contact/all - Get all contact messages (admin route)
router.get('/all', getAllContacts);

// GET /api/contact/:id - Get specific contact by ID
router.get('/:id', async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact message',
      error: error.message
    });
  }
});

// PUT /api/contact/:id/status - Update contact message status
router.put('/:id/status', async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: error.message
    });
  }
});

module.exports = router;
