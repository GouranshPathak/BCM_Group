const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({  // Fixed: removed 'er'
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, location, interestedIn, budget, message, projectName } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and phone number are required'
      });
    }

    // Create new enquiry
    const enquiry = new Enquiry({
      fullName,
      email,
      phone,
      location,
      interestedIn,
      budget,
      message,
      projectName
    });

    await enquiry.save();

    // Budget display mapping
    const budgetMap = {
      'under-50l': 'Under ₹50 Lakhs',
      '50l-1cr': '₹50 Lakhs - ₹1 Crore',
      '1cr-2cr': '₹1 - ₹2 Crores',
      '2cr-5cr': '₹2 - ₹5 Crores',
      'above-5cr': 'Above ₹5 Crores'
    };

    const budgetDisplay = budgetMap[budget] || budget;

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Project Enquiry Received - Thank You',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for your project enquiry!</h2>
            <p style="color: #666; line-height: 1.6;">Dear ${fullName},</p>
            <p style="color: #666; line-height: 1.6;">
              We have received your project enquiry and our team will review it shortly. 
              We'll contact you within 24-48 hours to discuss your requirements in detail.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">Your Enquiry Details:</h3>
              <ul style="color: #666; line-height: 1.8; list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                ${location ? `<li><strong>Location:</strong> ${location}</li>` : ''}
                ${interestedIn ? `<li><strong>Interested In:</strong> ${interestedIn}</li>` : ''}
                ${budget ? `<li><strong>Budget Range:</strong> ${budgetDisplay}</li>` : ''}
                ${projectName ? `<li><strong>Project:</strong> ${projectName}</li>` : ''}
                ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any immediate questions, please don't hesitate to contact us directly.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>BCM Group Team</strong><br>
                Email: info@bcmgroup.com<br>
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Project Enquiry Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #d32f2f; margin-bottom: 20px;">🔔 New Project Enquiry</h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">Enquiry Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${fullName}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${phone}</td></tr>
                ${location ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${location}</td></tr>` : ''}
                ${interestedIn ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Interested In:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${interestedIn}</td></tr>` : ''}
                ${budget ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Budget:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${budgetDisplay}</td></tr>` : ''}
                ${projectName ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Project:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${projectName}</td></tr>` : ''}
              </table>
              
              ${message ? `
                <div style="margin-top: 15px;">
                  <strong>Message:</strong>
                  <p style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0;">${message}</p>
                </div>
              ` : ''}
            </div>
            
            <p style="color: #666; font-size: 14px;">
              <strong>Received at:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} IST
            </p>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(201).json({
      success: true,
      message: 'Project enquiry submitted successfully',
      data: {
        id: enquiry._id,
        fullName: enquiry.fullName,
        email: enquiry.email,
        interestedIn: enquiry.interestedIn,
        createdAt: enquiry.createdAt
      }
    });

  } catch (error) {
    console.error('Enquiry creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Enquiry.countDocuments();

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message
    });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries
};
