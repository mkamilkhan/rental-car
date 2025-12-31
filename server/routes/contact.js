const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Check if email is configured
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS && 
                          process.env.EMAIL_USER !== 'your-email@gmail.com' &&
                          process.env.EMAIL_PASS !== 'your-app-password';

// Create transporter only if email is configured
let transporter = null;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Log form data to console (for development/testing)
    console.log('\n📧 ===== NEW CONTACT FORM SUBMISSION =====');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('📧 Target Email: m.kamil.se@gmail.com');
    console.log('📧 Email Configured:', isEmailConfigured);
    console.log('📧 Sender Email:', process.env.EMAIL_USER || 'Not set');
    console.log('==========================================\n');

    // Try to send email if configured
    if (isEmailConfigured && transporter) {
      try {
        // Always send to m.kamil.se@gmail.com
        const adminEmail = 'm.kamil.se@gmail.com';
        
        // Email to Admin (with form data)
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: adminEmail,
          subject: `New Contact Form: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ff6b35;">New Contact Form Submission</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
              <p style="color: #666; font-size: 12px;">
                This email was sent from the OFFROAD RENTALHUB contact form.
              </p>
            </div>
          `
        };

        // Confirmation email to User
        const userMailOptions = {
          from: process.env.EMAIL_USER,
          to: email, // User's email from form
          subject: `Thank you for contacting OFFROAD RENTALHUB`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ff6b35;">Thank You, ${name}!</h2>
              <p>We have received your message and will get back to you soon.</p>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Your Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
              <p style="color: #666; font-size: 12px;">
                Best regards,<br>
                OFFROAD RENTALHUB Team
              </p>
            </div>
          `
        };

        // Send email to admin (m.kamil.se@gmail.com)
        await transporter.sendMail(adminMailOptions);
        console.log('✅ Email sent successfully to:', adminEmail);
        console.log('📧 Contact form message delivered to m.kamil.se@gmail.com');
        
        // Optional: Send confirmation to user
        try {
          await transporter.sendMail(userMailOptions);
          console.log('✅ Confirmation email sent to user:', email);
        } catch (userEmailError) {
          console.log('⚠️  User confirmation email failed (admin email sent successfully)');
        }
        
      } catch (emailError) {
        console.error('\n❌ ===== EMAIL SENDING ERROR =====');
        console.error('Error:', emailError.message);
        console.error('Code:', emailError.code);
        console.error('Response:', emailError.response);
        
        if (emailError.code === 'EAUTH') {
          console.error('\n⚠️  Authentication failed!');
          console.error('Possible reasons:');
          console.error('1. Wrong password - Use Gmail App Password, not regular password');
          console.error('2. 2-Step Verification not enabled');
          console.error('3. App Password not generated');
          console.error('\nSolution:');
          console.error('1. Go to: https://myaccount.google.com/apppasswords');
          console.error('2. Generate App Password for "Mail"');
          console.error('3. Use that 16-character password in .env file');
          console.error('4. Restart your server');
        }
        console.error('Full email error details:', emailError);
        console.error('===================================\n');
        
        // Return success but note email failed
        return res.json({ 
          success: true, 
          message: 'Message received! (Email sending failed - check server console for details)',
          emailSent: false
        });
      }
      
      // Return success with email confirmation
      return res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon. Email has been sent.',
        emailSent: true
      });
    } else {
      console.log('\n⚠️  ===== EMAIL NOT CONFIGURED =====');
      console.log('Email sending is disabled because EMAIL_USER and EMAIL_PASS are not configured.');
      console.log('\n📋 To enable email sending, add these to server/.env file:');
      console.log('EMAIL_USER=your-email@gmail.com');
      console.log('EMAIL_PASS=your-app-password (Gmail App Password)');
      console.log('CONTACT_EMAIL=m.kamil.se@gmail.com');
      console.log('\n📝 Steps to get Gmail App Password:');
      console.log('1. Go to: https://myaccount.google.com/apppasswords');
      console.log('2. Generate App Password for "Mail"');
      console.log('3. Copy the 16-character password');
      console.log('4. Add it to server/.env file as EMAIL_PASS');
      console.log('5. Restart your server');
      console.log('\n💡 For now, form data is logged above. Email will be sent once configured.');
      console.log('==========================================\n');
      
      // Return success - form data is logged
      return res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon. (Note: Email not configured - check server console)',
        emailSent: false
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing your message. Please try again later.' 
    });
  }
});

module.exports = router;

