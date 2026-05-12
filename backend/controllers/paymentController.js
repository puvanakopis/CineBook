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

        // Build booking payload - fill gaps with sensible defaults
        const bookingPayload = {
            movieId: meta?.movieId || null,
            movieTitle: meta?.movieTitle || 'Unknown Movie',
            customerName: meta?.customerName || 'Guest',
            customerEmail: meta?.customerEmail || 'guest@cinebook.local',
            dateTime: meta?.dateTime || new Date(),
            seats: orderData.seats.map(s => ({ id: s.id, row: s.row, number: s.number, type: s.type, price: s.price })),
            totalPrice: orderData.total || (orderData.subtotal + (orderData.convenienceFee || 0)),
            payment: {
                method: paymentDetails?.method || 'card',
                transactionId: paymentDetails?.transactionId || `tx_${Date.now()}`,
                amount: orderData.total || 0,
                status: paymentDetails?.status || 'Paid',
                provider: paymentDetails?.provider || 'MockGateway'
            },
            poster: meta?.poster || null,
            theaterName: meta?.theaterName || null,
            hallName: meta?.hallName || null,
            screenId: meta?.screenId || null,
            showTime: meta?.showTime || null
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
