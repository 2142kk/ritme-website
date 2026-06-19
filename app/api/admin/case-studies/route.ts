import { auth } from '@/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, is_published } = await request.json()

    const result = await db.query(
      `UPDATE case_studies
       SET is_published = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [is_published, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating case study:', error)
    return NextResponse.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    const result = await db.query(
      'DELETE FROM case_studies WHERE id = $1 RETURNING id',
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting case study:', error)
    return NextResponse.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    )
  }
}
