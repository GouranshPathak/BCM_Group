const { body, validationResult } = require('express-validator');

// Validation middleware for enquiry form
const validateEnquiry = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Full name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters'),
  
  body('interestedIn')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Interested in field must not exceed 100 characters'),
  
  body('budget')
    .optional()
    .trim()
    .isIn(['under-50l', '50l-1cr', '1cr-2cr', '2cr-5cr', 'above-5cr'])
    .withMessage('Invalid budget range selected'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters'),
  
  body('projectName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Project name must not exceed 100 characters'),
];

// Validation middleware for contact form
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  
  body('service')
    .trim()
    .isIn([
      'Residential Construction',
      'Commercial Projects',
      'Sales & Leasing',
      'Interior Design',
      'Project Management',
      'Legal Documentation',
      'Other'
    ])
    .withMessage('Invalid service type selected'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  
  next();
};

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Rate limiters for different endpoints
const enquiryLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Too many enquiry submissions, please try again later.'
);

const contactLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  3, // limit each IP to 3 requests per windowMs
  'Too many contact form submissions, please try again later.'
);

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Remove any HTML tags from text inputs
  const sanitizeHtml = require('sanitize-html');
  
  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {}
        });
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };
  
  if (req.body) {
    sanitizeObject(req.body);
  }
  
  next();
};

module.exports = {
  validateEnquiry,
  validateContact,
  handleValidationErrors,
  enquiryLimiter,
  contactLimiter,
  sanitizeInput
};
