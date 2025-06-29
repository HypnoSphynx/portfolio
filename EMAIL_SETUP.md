# EmailJS Setup Instructions

To make the contact form functional, you need to set up EmailJS. Here's how:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Add a new service (Gmail, Outlook, etc.)
3. Connect your email account (zawadul1@gmail.com)
4. Note down the Service ID

## 3. Create Email Template
1. Go to "Email Templates"
2. Create a new template
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down the Template ID

## 4. Get User ID
1. Go to "Account" → "API Keys"
2. Copy your Public Key (User ID)

## 5. Environment Variables
Create a `.env.local` file in your project root with:

```env
# GitHub Configuration
GH_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username

# EmailJS Configuration (Client-side - must start with NEXT_PUBLIC_)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id_here

# Vercel Configuration (optional)
VC_TOKEN=your_vercel_token_here
```

## 6. Test the Form
1. Start your development server: `npm run dev`
2. Go to the Contact section
3. Fill out the form and submit
4. Check your email (zawadul1@gmail.com) for the message

## 7. Troubleshooting

### Common Issues:

#### Issue 1: "EmailJS not configured"
**Solution**: 
- Make sure all environment variables start with `NEXT_PUBLIC_`
- Restart your development server after adding environment variables
- Check that the values are correct

#### Issue 2: "Failed to send message"
**Solution**:
- Verify your EmailJS service is connected
- Check that your template variables match the code
- Ensure your email service is working

#### Issue 3: "Network error"
**Solution**:
- Check your internet connection
- Verify EmailJS service status
- Try again in a few minutes

#### Issue 4: "Rate limit exceeded"
**Solution**:
- Wait a few minutes before trying again
- Consider upgrading your EmailJS plan for higher limits

## 8. Security Notes

### Environment Variables:
- Variables starting with `NEXT_PUBLIC_` are exposed to the client
- This is safe for EmailJS as these are public keys
- Never expose server-side secrets with `NEXT_PUBLIC_`

### Rate Limiting:
- Free EmailJS accounts have limited monthly emails
- Monitor your usage in the EmailJS dashboard
- Consider upgrading for higher limits

## 9. Alternative Setup (Server-side)

If you prefer server-side email handling, you can use the API route approach:

```javascript
// pages/api/contact.js
export default async function handler(req, res) {
  // Your server-side email logic here
}
```

## 10. Production Deployment

### Vercel:
1. Add environment variables in Vercel dashboard
2. Make sure to include `NEXT_PUBLIC_` prefix for client-side variables
3. Deploy your application

### Other Platforms:
1. Add environment variables in your hosting platform
2. Ensure `NEXT_PUBLIC_` variables are set correctly
3. Deploy and test the contact form

## 11. Monitoring

### EmailJS Dashboard:
- Monitor email delivery in EmailJS dashboard
- Check for failed deliveries
- Review usage statistics

### Error Logging:
- Check browser console for client-side errors
- Monitor server logs for any issues
- Set up error tracking if needed

## 12. Alternative: Simple Mailto Fallback
If you prefer not to use EmailJS, you can modify the form to use a simple mailto link:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const { name, email, message } = formData;
  const mailtoLink = `mailto:zawadul1@gmail.com?subject=Portfolio Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  window.open(mailtoLink);
};
```

## 13. Test the Form
1. Start your development server
2. Go to the Contact section
3. Fill out the form and submit
4. Check your email (zawadul1@gmail.com) for the message

## Troubleshooting
- Make sure all environment variables are set correctly
- Check EmailJS dashboard for any error logs
- Ensure your email service is properly connected
- Verify the template variables match the API call 