# Modern Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring smooth scroll animations, GitHub integration, and a collapsible navigation system. This single-page application showcases your skills, projects, and contact information in an elegant, interactive design.

## ✨ Features

### 🎨 **Modern Design**
- **Single-page scrolling layout** with smooth scroll-triggered animations
- **Dark theme** with gradient backgrounds and glass-morphism effects
- **Responsive design** that works perfectly on desktop, tablet, and mobile
- **Custom typography** with animated text effects

### 🧭 **Navigation**
- **Collapsible left sidebar** that expands on hover and collapses to show only first letters
- **Mobile hamburger menu** for smaller screens
- **Smooth scrolling** between sections
- **Active section highlighting**

### 📊 **Sections**

#### **Home/About Me**
- **Dynamic GitHub profile integration** - displays your GitHub avatar and bio
- **Personal introduction** with customizable content
- **Email contact button** positioned below your name
- **Animated title effects**

#### **Tech Stack/Proficiency**
- **5-grid layout** covering different technology categories:
  - **Languages** (Python, Java, JavaScript, C++)
  - **Frontend** (HTML/CSS, TypeScript, Tailwind CSS, Next.js)
  - **Backend** (Express.js, MongoDB, PostgreSQL, Redis)
  - **AI Technologies** (TensorFlow, PyTorch, OpenAI API, Hugging Face)
- **Color-coded progress bars** with smooth animations
- **Customizable skill percentages**

#### **Projects**
- **Dynamic GitHub integration** - automatically fetches and displays your repositories
- **Responsive grid layout** with project cards
- **Repository information** including stars, forks, and primary language
- **Filtering options** for blacklisted projects
- **Formatted project names** in title case

#### **Contact**
- **Modern two-column layout** on desktop, stacked on mobile
- **Contact info cards** with icons
- **EmailJS integration** for contact form functionality
- **Additional contact information**

### 🔧 **Technical Features**
- **GitHub API integration** for dynamic content
- **EmailJS** for contact form functionality
- **Tailwind CSS** for styling
- **React Icons** for beautiful icons
- **Optimized performance** with Next.js caching
- **SEO-friendly** structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GitHub account (for API integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   GH_TOKEN=your_github_token_here
   VC_TOKEN=your_vercel_token_here
   IS_TEMPLATE=false
   GITHUB_USERNAME=your_github_username
   ```

4. **Configure your data**
   
   Edit `data.json` with your information:
   ```json
   {
     "description": "Your portfolio description",
     "githubUsername": "your_github_username",
     "avatarUrl": "your_avatar_url",
     "displayName": "Your Display Name",
     "email": "your_email@example.com",
     "projects": {
       "blacklist": ["repo-to-hide"],
       "heroNames": ["special-repo"]
     }
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GH_TOKEN` | GitHub Personal Access Token | Yes |
| `VC_TOKEN` | Vercel Token (for deployment) | No |
| `IS_TEMPLATE` | Set to `false` to disable template mode | Yes |
| `GITHUB_USERNAME` | Your GitHub username | Yes |

### GitHub Token Setup

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `public_repo` (for repository access)
   - `read:user` (for user profile)
   - `read:org` (for organization data)
4. Copy the token and add it to your `.env.local` file

### Customizing Content

#### Personal Information
Edit `data.json` to customize:
- Your GitHub username
- Display name
- Email address
- Avatar URL
- Project blacklist (repos to hide)

#### Tech Stack
Modify the skill arrays in `app/page.jsx`:

```javascript
const languages = [
  { name: "Python", value: 90 },
  { name: "Java", value: 80 },
  // Add your skills here
];

const frontend = [
  { name: "HTML/CSS", value: 90 },
  { name: "React", value: 85 },
  // Add your frontend skills
];

const backend = [
  { name: "Node.js", value: 80 },
  { name: "Express.js", value: 75 },
  // Add your backend skills
];

const ai = [
  { name: "TensorFlow", value: 75 },
  { name: "PyTorch", value: 80 },
  // Add your AI skills
];
```

#### About Me Section
Edit the "About Me" paragraph in `app/page.jsx` to reflect your personal story and background.

#### Contact Information
Update the email address in the mail button and contact form in `app/page.jsx`.

### EmailJS Setup (Optional)

For contact form functionality:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email template
3. Get your service ID, template ID, and public key
4. Add them to your environment variables:
   ```env
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit `tailwind.config.js` for custom color schemes
- **Typography**: Modify font families and sizes in the config
- **Animations**: Adjust animation durations and effects in the CSS

### Layout
- **Section heights**: Modify `min-h-[80vh]` classes in `app/page.jsx`
- **Spacing**: Adjust padding and margin classes
- **Grid layouts**: Modify grid classes for different screen sizes

### Components
Each section is a separate component in `app/components/`:
- `scroll-section.jsx` - Wrapper for scroll animations
- `collapsible-nav.jsx` - Navigation sidebar
- `github-projects.jsx` - Projects display
- `emailjs-contact.jsx` - Contact form

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation becomes hamburger menu on mobile
- Grid layouts stack on smaller screens
- Typography scales appropriately
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your site

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Run setup script
```

### Project Structure

```
portfolio/
├── app/
│   ├── components/          # React components
│   ├── data.js             # GitHub API functions
│   ├── layout.jsx          # Root layout
│   └── page.jsx            # Main page component
├── lib/
│   └── setup.mjs           # Setup script
├── public/                 # Static assets
├── data.json               # Configuration data
├── global.css              # Global styles
└── tailwind.config.js      # Tailwind configuration
```

### API Integration

The project integrates with several GitHub APIs:
- **User Profile**: Fetches avatar, bio, and stats
- **Repositories**: Gets all public repositories
- **Pinned Repositories**: Displays pinned repos
- **Organizations**: Shows user organizations
- **Recent Activity**: Displays recent GitHub activity

## 🐛 Troubleshooting

### Common Issues

1. **GitHub API Rate Limits**
   - Ensure you have a valid `GH_TOKEN`
   - Check your token permissions

2. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`

3. **Styling Issues**
   - Clear browser cache
   - Restart development server

4. **Contact Form Not Working**
   - Verify EmailJS configuration
   - Check browser console for errors

### Performance Optimization

- Images are optimized with Next.js Image component
- API responses are cached for performance
- Static assets are served efficiently
- Code splitting is handled automatically

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the GitHub issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, React, and Tailwind CSS** 