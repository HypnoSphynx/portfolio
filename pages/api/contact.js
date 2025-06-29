export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // For now, we'll use a simple approach with EmailJS
    // You can also use services like SendGrid, Nodemailer, or EmailJS
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        to_email: 'zawadul1@gmail.com',
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email
      }
    };

    // Send email using EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      res.status(200).json({ message: 'Email sent successfully!' });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
} 