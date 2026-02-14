import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        const apiKey = process.env.MAILERLITE_API_KEY;

        if (!apiKey) {
            console.error('MAILERLITE_API_KEY is not set');
            return NextResponse.json(
                { error: 'Newsletter service is temporarily unavailable.' },
                { status: 503 }
            );
        }

        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                email,
                status: 'active',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // MailerLite returns 422 for validation errors (e.g., already subscribed)
            if (response.status === 422) {
                // If the subscriber already exists, treat it as success
                if (data?.message?.toLowerCase().includes('already') ||
                    data?.errors?.email) {
                    return NextResponse.json({
                        success: true,
                        message: 'You\'re already subscribed! Thanks for being a reader.',
                        alreadySubscribed: true,
                    });
                }
                return NextResponse.json(
                    { error: data?.message || 'Invalid email address.' },
                    { status: 422 }
                );
            }

            console.error('MailerLite API error:', response.status, data);
            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again later.' },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed! Check your inbox.',
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
