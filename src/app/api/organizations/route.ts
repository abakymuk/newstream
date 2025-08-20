import { createClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const organizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  logo_url: z.string().url().optional(),
})

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: organizations, error } = await supabase
      .from('organizations')
      .select(`
        *,
        organization_members!inner(user_id)
      `)
      .eq('organization_members.user_id', user.id)

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 400 })
    }

    return NextResponse.json(organizations)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = organizationSchema.parse(body)

    // Check if slug is unique
    const { data: existingOrg } = await supabase
      .from('organizations')
      .select('id')
      .eq('slug', validatedData.slug)
      .single()

    if (existingOrg) {
      return NextResponse.json({ error: 'Organization slug already exists' }, { status: 400 })
    }

    // Create organization
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert({
        ...validatedData,
        created_by: user.id,
      })
      .select()
      .single()

    if (orgError) {
      return NextResponse.json({ error: 'Failed to create organization' }, { status: 400 })
    }

    // Add user as owner
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        organization_id: organization.id,
        user_id: user.id,
        role: 'owner',
        invited_by: user.id,
      })

    if (memberError) {
      return NextResponse.json({ error: 'Failed to add user as owner' }, { status: 400 })
    }

    return NextResponse.json(organization, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
