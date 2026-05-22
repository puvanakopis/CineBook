export async function postPayment(payload: any, baseUrl?: string) {
    const API_BASE = (process.env.NEXT_PUBLIC_API_URL as string) || baseUrl || 'http://127.0.0.1:4000';
    const resp = await fetch(`${API_BASE}/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Payment failed: ${resp.status} ${text}`);
    }
    return resp.json();
}

export async function createStripeIntent(amount: number, currency = 'lkr', baseUrl?: string) {
    const API_BASE = (process.env.NEXT_PUBLIC_API_URL as string) || baseUrl || 'http://127.0.0.1:4000';
    const resp = await fetch(`${API_BASE}/api/payments/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency })
    });
    if (!resp.ok) throw new Error('Failed to create stripe intent');
    return resp.json();
}
