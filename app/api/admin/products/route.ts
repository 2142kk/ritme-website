import { auth } from '@/auth'
import db from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, tagline, description, status, link, display_order, is_published } = await request.json()
    const result = await db.query(
      `INSERT INTO products (name, tagline, description, status, link, display_order, is_published)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, tagline || '', description || '', status || 'coming_soon', link || null, display_order ?? 99, is_published ?? false]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, name, tagline, description, status, link, display_order, is_published } = await request.json()
    const result = await db.query(
      `UPDATE products SET name=$1, tagline=$2, description=$3, status=$4, link=$5,
       display_order=$6, is_published=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
      [name, tagline, description, status, link || null, display_order, is_published, id]
    )
    if (result.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await request.json()
    await db.query('DELETE FROM products WHERE id=$1', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
