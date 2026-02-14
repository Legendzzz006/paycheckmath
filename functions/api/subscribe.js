export async function onRequestPost(context) {
    try {
        const { email } = await context.request.json();

        if (!email || !email.includes('@')) {
            return new Response(
                JSON.stringify({ error: 'Please provide a valid email address.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const apiKey = context.env.MAILERLITE_API_KEY;

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'Newsletter service is temporarily unavailable.' }),
                { status: 503, headers: { 'Content-Type': 'application/json' } }
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
            if (response.status === 422) {
                if (data?.message?.toLowerCase().includes('already') || data?.errors?.email) {
                    return new Response(
                        JSON.stringify({ success: true, message: "You're already subscribed! Thanks for being a reader.", alreadySubscribed: true }),
                        { status: 200, headers: { 'Content-Type': 'application/json' } }
                    );
                }
                return new Response(
                    JSON.stringify({ error: data?.message || 'Invalid email address.' }),
                    { status: 422, headers: { 'Content-Type': 'application/json' } }
                );
            }

            return new Response(
                JSON.stringify({ error: 'Failed to subscribe. Please try again later.' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Successfully subscribed! Check your inbox.' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Something went wrong. Please try again.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
