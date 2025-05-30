# FootballBuddy

A modern, user-friendly football companion website that keeps you updated with live scores, news, and highlights from the world of football.

## Features

- **Live Matches**: Real-time scores and match updates
- **Latest News**: Breaking news and transfer updates from the football world
- **Team Information**: Detailed information about your favorite teams
- **Competition Tracking**: Follow major competitions and tournaments
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean and intuitive user interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/footballbuddy.git
cd footballbuddy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to footballbuddy.xyz

### Method 1: Using Vercel (Recommended)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy to production:
```bash
vercel --prod
```

5. Configure your domain:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings > Domains
   - Add your domain: footballbuddy.xyz
   - Follow the DNS configuration instructions

### Method 2: Traditional Hosting

1. Build the production version:
```bash
npm run build
```

2. The built files will be in the `.next` directory

3. Configure your web server:
   - Point your domain footballbuddy.xyz to your server
   - Set up Node.js on your server
   - Configure SSL certificate (recommended: Let's Encrypt)
   - Set up reverse proxy (nginx/Apache) to the Node.js process

4. Start the production server:
```bash
npm run start
```

## Technology Stack

- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **TypeScript**: Type-safe JavaScript
- **Heroicons**: Beautiful hand-crafted SVG icons

## Project Structure

```
footballbuddy/
├── app/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Application pages
│   └── styles/       # Global styles
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 