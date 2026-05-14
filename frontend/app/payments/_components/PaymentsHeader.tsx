'use client';

export function PaymentsHeader() {
    return (
        <section className="mb-16">
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl md:text-4xl font-extrabold text-white border-l-4 border-primary pl-6 tracking-wide">
                    Payment Methods
                </h1>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    Manage your cards and digital wallets for seamless ticket booking at Sathyam, SPI Cinemas, and more.
                </p>
            </div>
        </section>
    );
}