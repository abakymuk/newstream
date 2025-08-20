/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'

// Mock the API route
const mockSupabaseAuth = {
  resetPasswordForEmail: jest.fn(),
}

jest.mock('../../lib/supabase-server', () => ({
  createClient: jest.fn(() => ({
    auth: mockSupabaseAuth,
  })),
}))

// Import after mocking
import { POST } from '../../app/api/auth/reset-password/route'

describe('/api/auth/reset-password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send reset password email successfully', async () => {
    mockSupabaseAuth.resetPasswordForEmail.mockResolvedValue({ error: null })

    const request = new NextRequest('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Password reset email sent successfully')
    expect(mockSupabaseAuth.resetPasswordForEmail).toHaveBeenCalledWith(
      'test@example.com',
      { redirectTo: `${process.env.NEXTAUTH_URL}/auth/reset-password` }
    )
  })

  it('should return 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email')
  })

  it('should handle supabase errors', async () => {
    mockSupabaseAuth.resetPasswordForEmail.mockResolvedValue({ 
      error: { message: 'User not found' } 
    })

    const request = new NextRequest('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('User not found')
  })
})