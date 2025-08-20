# NewStream

A modern SaaS platform built with Next.js 15, Supabase, and Vercel.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Tools**: ESLint, Prettier, Husky

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account
- Vercel account
- GitHub account

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd newstream
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your values:

```bash
cp env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and keys from the project settings
3. Add them to your `.env.local` file

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
newstream/
├── src/
│   ├── app/                    # Next.js 15 app router
│   │   ├── (auth)/            # Auth pages group
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Protected dashboard pages
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # shadcn/ui components
│   │   └── ui/               # Reusable UI components
│   └── lib/                   # Utilities and configs
│       ├── supabase.ts       # Client-side Supabase config
│       ├── supabase-server.ts # Server-side Supabase config
│       └── utils.ts          # Utility functions
├── .github/                   # GitHub Actions workflows
├── docs/                      # Project documentation
├── public/                    # Static assets
└── env.example               # Environment variables template
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

**Current Status**: ✅ Deployed and configured
- Production: https://newstream-omega.vercel.app
- CI/CD: GitHub Actions with Vercel deployment

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Supabase Setup

1. Enable Authentication in your Supabase project
2. Configure email templates
3. Set up Row Level Security (RLS) policies
4. Create necessary database tables

### Environment Variables

See `env.example` for all required environment variables.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
