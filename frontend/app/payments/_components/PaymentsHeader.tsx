'use client';

export function PaymentsHeader() {
    return (
        <section className="pb-8 border-b border-[#392828]">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
                            Payment Methods
                        </h1>
                        <p className="text-text-secondary text-base max-w-2xl">
                            Manage your cards and digital wallets for seamless ticket booking at Sathyam, SPI Cinemas, and more.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}