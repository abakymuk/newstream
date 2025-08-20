# Authentication & Authorization Documentation

## Overview

This application uses **Supabase Auth** for authentication and authorization, providing a secure and scalable solution for user management.

## Architecture

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Browser   │───▶│   Next.js    │───▶│  Supabase   │
│             │    │  Middleware  │    │    Auth     │
└─────────────┘    └──────────────┘    └─────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │ PostgreSQL   │
                   │     +RLS     │
                   └──────────────┘
```

## Authentication Flow

### 1. User Registration
- **Endpoint**: `/auth/register`
- **Process**:
  1. User fills registration form
  2. Client calls Supabase Auth API
  3. Email verification sent (optional)
  4. Database trigger creates user profile
  5. User redirected to dashboard

### 2. User Login
- **Endpoint**: `/auth/login`
- **Process**:
  1. User enters credentials
  2. Supabase validates credentials
  3. JWT tokens issued (access + refresh)
  4. Tokens stored in secure cookies
  5. User redirected to dashboard

### 3. Password Reset
- **Endpoint**: `/auth/reset-password`
- **Process**:
  1. User enters email address
  2. Reset email sent via Supabase
  3. User clicks link in email
  4. New password form displayed
  5. Password updated in Supabase

### 4. Session Management
- **Middleware**: `src/middleware.ts`
- **Process**:
  1. Every request checked for valid session
  2. Automatic token refresh when needed
  3. Protected routes redirect to login
  4. Public routes accessible without auth

## Database Schema

### Users Table (Supabase Auth)
```sql
-- Managed by Supabase Auth
auth.users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  encrypted_password TEXT,
  email_confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Profiles Table
```sql
-- Custom user profiles
public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'UTC',
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Organizations Table
```sql
public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Organization Members Table
```sql
public.organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
)
```

## Row Level Security (RLS)

### Profiles RLS Policies
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Organizations RLS Policies
```sql
-- Users can view organizations they're members of
CREATE POLICY "Users can view member organizations" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_id = id AND user_id = auth.uid()
    )
  );

-- Only owners and admins can update organizations
CREATE POLICY "Owners and admins can update organizations" ON organizations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_id = id 
        AND user_id = auth.uid() 
        AND role IN ('owner', 'admin')
    )
  );
```

## API Endpoints

### Authentication Endpoints

#### `POST /api/auth/reset-password`
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent successfully"
}
```

#### `GET /api/auth/profile`
Get current user's profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "avatar_url": null,
  "timezone": "UTC",
  "language": "en"
}
```

#### `PUT /api/auth/profile`
Update current user's profile.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "timezone": "America/New_York",
  "language": "en"
}
```

### Organization Endpoints

#### `GET /api/organizations`
Get organizations for current user.

#### `POST /api/organizations`
Create new organization.

#### `GET /api/organizations/[id]/members`
Get organization members.

#### `POST /api/organizations/[id]/members`
Add member to organization.

## Feature Flags

Authentication features can be controlled via feature flags:

```typescript
// Environment Variables
NEXT_PUBLIC_FEATURE_AUTH_ROLES=true
NEXT_PUBLIC_FEATURE_PASSWORD_RESET=true
NEXT_PUBLIC_FEATURE_ORGANIZATION_MANAGEMENT=true
NEXT_PUBLIC_FEATURE_USER_PROFILE=true
```

**Usage:**
```tsx
import { FeatureFlag } from '@/components/FeatureFlag'

<FeatureFlag flag="USER_PROFILE">
  <ProfileSettings />
</FeatureFlag>
```

## Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` files
- Use different keys for dev/staging/prod
- Rotate keys regularly

### 2. Session Security
- Secure cookies with `httpOnly` and `secure` flags
- Short-lived access tokens (1 hour)
- Long-lived refresh tokens (30 days)
- Automatic token refresh

### 3. Database Security
- Row Level Security enabled on all tables
- Principle of least privilege
- Regular security audits

### 4. API Security
- Request validation with Zod schemas
- Rate limiting on auth endpoints
- CORS properly configured
- HTTPS enforcement in production

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm test -- --testPathPattern=api
```

### E2E Tests
```bash
npm run test:e2e
```

## Monitoring

### Key Metrics
- Authentication success/failure rates
- Session duration and refresh patterns
- Password reset completion rates
- User registration conversion rates

### Security Monitoring
- Failed login attempts
- Suspicious activity patterns
- Token refresh anomalies
- Database access patterns

## Troubleshooting

### Common Issues

#### "Invalid JWT" Errors
- Check token expiration
- Verify environment variables
- Clear browser cookies
- Check Supabase project settings

#### RLS Policy Denials
- Verify user authentication
- Check policy conditions
- Review database logs
- Test policies in SQL editor

#### Session Not Persisting
- Check cookie settings
- Verify middleware configuration
- Check domain/subdomain issues
- Review HTTPS settings

## Development Setup

1. **Environment Variables**
   ```bash
   cp .env.example .env.local
   # Fill in Supabase credentials
   ```

2. **Database Migration**
   ```bash
   # Migrations are in supabase/migrations/
   # Applied automatically in Supabase dashboard
   ```

3. **Local Development**
   ```bash
   npm run dev
   ```

4. **Testing**
   ```bash
   npm test              # Unit tests
   npm run test:e2e      # E2E tests
   npm run test:coverage # Coverage report
   ```

## Deployment

### Vercel Deployment
1. Environment variables configured in Vercel dashboard
2. Automatic deployment on main branch push
3. Preview deployments for PRs

### Supabase Configuration
1. Database policies applied
2. Auth settings configured
3. Email templates customized
4. RLS enabled on all tables

For more details, see [ADR-001: Authentication Provider Selection](../adr/001-authentication-provider.md).
