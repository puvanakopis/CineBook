const Booking = require('../models/bookingModel');

// Basic simulated payment processing and booking creation
exports.processPayment = async (req, res) => {
    try {
        const { orderData, paymentDetails, meta } = req.body;

        if (!orderData || !orderData.seats || orderData.seats.length === 0) {
            return res.status(400).json({ message: 'No order data or seats provided' });
        }

        // Simulate payment gateway (10% failure)
        const success = Math.random() > 0.1;

        if (!success) {
            return res.status(402).json({ message: 'Payment failed' });
        }

        const movieId = meta?.movie?.id || meta?.movie?._id || meta?.movieId || null;
        const movieTitle = meta?.movie?.title || meta?.movieTitle || meta?.title || 'Unknown Movie';
        const theaterId = meta?.theater?.id || meta?.theater?._id || meta?.theaterId || null;
        const theaterName = meta?.theater?.name || meta?.theaterName || null;
        const screenId = meta?.screen?.id || meta?.screenId || null;
        const showTime = meta?.showTime || meta?.time || null;
        const customerName = meta?.customerName || meta?.customer?.name || 'Guest';
        const customerEmail = meta?.customerEmail || meta?.customer?.email || 'guest@cinebook.local';
        const parseDateTime = () => {
            if (meta?.dateTime) {
                const dt = new Date(meta.dateTime);
                if (!isNaN(dt.valueOf())) return dt;
            }

            if (meta?.date) {
                const timeRaw = meta?.time || '';
                const startTime = (typeof timeRaw === 'string' && timeRaw.includes('-')) ? timeRaw.split('-')[0].trim() : timeRaw.trim();

                // Try ISO combine first
                if (startTime) {
                    const iso = `${meta.date}T${startTime}`;
                    const dtIso = new Date(iso);
                    if (!isNaN(dtIso.valueOf())) return dtIso;

                    // Fallback to space-separated
                    const dtSpace = new Date(`${meta.date} ${startTime}`);
                    if (!isNaN(dtSpace.valueOf())) return dtSpace;
                }

                // Try date-only
                const dtDateOnly = new Date(meta.date);
                if (!isNaN(dtDateOnly.valueOf())) return dtDateOnly;
            }

            return new Date();
        };

        const dateTime = parseDateTime();

        // Build booking payload - fill gaps with sensible defaults
        const bookingPayload = {
            movieId,
            movieTitle,
            customerName,
            customerEmail,
            dateTime,
            seats: orderData.seats.map(s => ({ id: s.id, row: s.row, number: s.number, type: s.type, price: s.price })),
            totalPrice: orderData.total || (orderData.subtotal + (orderData.convenienceFee || 0)),
            payment: {
                method: paymentDetails?.method || 'card',
                transactionId: paymentDetails?.transactionId || `tx_${Date.now()}`,
                amount: orderData.total || 0,
                status: paymentDetails?.status || 'Paid',
                provider: paymentDetails?.provider || 'MockGateway'
            },
            poster: meta?.movie?.poster || meta?.poster || null,
            theaterId,
            theaterName,
            screenId,
            showTime,
            genres: meta?.movie?.genres || meta?.genres || [],
            duration: meta?.movie?.duration || meta?.duration || null,
            format: meta?.format || meta?.screen?.type || null
        };

        const booking = new Booking(bookingPayload);
        await booking.save();

        res.status(201).json({ message: 'Payment processed and booking created', booking });
    } catch (err) {
        console.error('Payment processing error', err);
        res.status(500).json({ message: 'Server error processing payment' });
    }
};

// Create a Stripe PaymentIntent if Stripe is configured.
exports.createStripeIntent = async (req, res) => {
    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeKey) return res.status(501).json({ message: 'Stripe not configured on server' });

        let Stripe;
        try {
            Stripe = require('stripe');
        } catch (e) {
            console.error('stripe package missing', e);
            return res.status(500).json({ message: 'stripe package not installed on server' });
        }

        const stripe = Stripe(stripeKey);
        const { amount, currency = 'lkr', metadata } = req.body;
        if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

        const intent = await stripe.paymentIntents.create({
            amount: Math.round(Number(amount)),
            currency: currency === 'lkr' ? 'lkr' : currency,
            metadata: metadata || {}
        });

        res.json({ client_secret: intent.client_secret, intent });
    } catch (err) {
        console.error('createStripeIntent error', err);
        res.status(500).json({ message: 'Server error creating Stripe intent' });
    }
};
