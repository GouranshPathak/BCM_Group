const Contact = require('../models/Contact');
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

const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, service type, and message are required'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });

    await contact.save();

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - Thank You for Contacting Us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for contacting us!</h2>
            <p style="color: #666; line-height: 1.6;">Dear ${name},</p>
            <p style="color: #666; line-height: 1.6;">
              We have received your message and appreciate you taking the time to contact us. 
              Our team will review your inquiry and get back to you within 24 hours.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">Your Message Details:</h3>
              <ul style="color: #666; line-height: 1.8; list-style: none; padding: 0;">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
                <li><strong>Service Type:</strong> ${service}</li>
                <li style="margin-top: 10px;"><strong>Message:</strong></li>
                <li style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 5px;">${message}</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              If you have any urgent questions, please feel free to call us directly at +1 (555) 123-4567.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>BCM Group Team</strong><br>
                Email: info@bcmgroup.com<br>
                Phone: +1 (555) 123-4567<br>
                Address: 123 Business Avenue, City Center
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
      subject: 'New Contact Form Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #d32f2f; margin-bottom: 20px;">📧 New Contact Form Message</h2>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 15px;">Contact Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${name}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${phone}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${service}</td></tr>
              </table>
              
              <div style="margin-top: 15px;">
                <strong>Message:</strong>
                <p style="background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0; border-left: 4px solid #d32f2f;">${message}</p>
              </div>
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
      message: 'Message sent successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        service: contact.service,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
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
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
};

module.exports = {
  createContact,
  getAllContacts
};
