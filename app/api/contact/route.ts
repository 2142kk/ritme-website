import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address'),
  company: z.string().max(255).optional().nullable(),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Save to database
    const result = await db.query(
      `INSERT INTO leads (name, email, company, message, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'new', NOW(), NOW())
       RETURNING id, email, name`,
      [validatedData.name, validatedData.email, validatedData.company || null, validatedData.message]
    );

    const lead = result.rows[0];

    // Send email notification
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'hello@ritmelab.io',
        to: process.env.NOTIFICATION_EMAIL || 'hello@ritmelab.io',
        subject: 'New Lead from ritmeLab Website',
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
