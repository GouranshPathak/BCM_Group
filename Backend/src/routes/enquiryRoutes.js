const express = require('express');
const { createEnquiry, getAllEnquiries } = require('../controllers/enquiryController');
const router = express.Router();

// POST /api/enquiry/submit - Submit new enquiry
router.post('/submit', createEnquiry);

// GET /api/enquiry/all - Get all enquiries (admin route)
router.get('/all', getAllEnquiries);

// GET /api/enquiry/:id - Get specific enquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const Enquiry = require('../models/Enquiry');
    const enquiry = await Enquiry.findById(req.params.id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: error.message
    });
  }
});

// PUT /api/enquiry/:id/status - Update enquiry status
router.put('/:id/status', async (req, res) => {
  try {
    const Enquiry = require('../models/Enquiry');
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status',
      error: error.message
    });
  }
});

module.exports = router;
