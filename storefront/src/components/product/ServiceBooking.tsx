'use client';
import { useState, useMemo } from 'react';
import styles from './ServiceBooking.module.css';
import type { ServiceConfig } from '@/data/products';

interface Props {
    serviceConfig: ServiceConfig;
    productName: string;
    price: number;
}

export default function ServiceBooking({ serviceConfig, productName, price }: Props) {
    const today = new Date();
    const [bookingStep, setBookingStep] = useState(1); // 1: Addons, 2: Schedule, 3: Address, 4: Review
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(serviceConfig.providers[0]?.id || '');
    const [monthOffset, setMonthOffset] = useState(0);
    const [serviceAddress, setServiceAddress] = useState('123 Park Street, Apartment 4B, Chembur East');
    const [serviceCity, setServiceCity] = useState('Mumbai');
    const [servicePincode, setServicePincode] = useState('400071');
    const [booked, setBooked] = useState(false);

    const viewDate = useMemo(() => {
        const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
        return d;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthOffset]);

    const monthName = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const isSameDay = (a: Date, b: Date) =>
        a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    const isBeforeToday = (d: Date) => {
        const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return d < t;
    };

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    };

    const addonsTotal = (serviceConfig.addons || [])
        .filter(a => selectedAddons.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0);
    const convenienceFee = serviceConfig.convenienceFee || 0;
    const grandTotal = price + addonsTotal + convenienceFee;

    const provider = serviceConfig.providers.find(p => p.id === selectedProvider);

    const handleBook = () => setBooked(true);

    // STEP INDICATORS
    const stepLabels = ['Add-ons', 'Schedule', 'Address', 'Review'];

    if (booked) {
        return (
            <div className={styles.bookingWidget} style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Booking Confirmed!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    Your booking for <strong style={{ color: 'var(--text-main)' }}>{productName}</strong> is confirmed.
                </p>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem', textAlign: 'left', fontSize: '0.85rem' }}>
                    <div className={styles.summaryRow}><span>📅 Date</span><strong>{selectedDate?.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</strong></div>
                    <div className={styles.summaryRow}><span>⏰ Time</span><strong>{selectedSlot}</strong></div>
                    <div className={styles.summaryRow}><span>👨‍🔧 Provider</span><strong>{provider?.name}</strong></div>
                    <div className={styles.summaryRow}><span>📍 Location</span><strong>{serviceAddress}, {serviceCity}</strong></div>
                    <div className={styles.summaryRow}><span>💰 Total</span><strong style={{ color: 'var(--success)' }}>₹{grandTotal.toLocaleString()}</strong></div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                    📱 Booking details sent to your phone & email. Provider will reach 15 mins before the slot.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem' }}
                        onClick={() => { setBooked(false); setBookingStep(2); }}>
                        📅 Reschedule
                    </button>
                    <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem', borderColor: 'rgba(239,68,68,0.4)', color: '#ef4444' }}
                        onClick={() => { if (confirm('Are you sure you want to cancel? Cancellation is free up to 4 hours before your slot.')) { setBooked(false); setBookingStep(1); } }}>
                        ❌ Cancel Booking
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.bookingWidget}>
            {/* Step Progress Bar */}
            <div className={styles.stepProgress}>
                {stepLabels.map((label, i) => (
                    <div key={label} className={`${styles.stepDot} ${bookingStep > i + 1 ? styles.stepDone : ''} ${bookingStep === i + 1 ? styles.stepCurrent : ''}`}>
                        <div className={styles.dotCircle}>{bookingStep > i + 1 ? '✓' : i + 1}</div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>

            {/* STEP 1: Add-ons & Inclusions */}
            {bookingStep === 1 && (
                <div className={styles.stepContent}>
                    <div className={styles.durationBadge}>⏱️ Duration: {serviceConfig.duration} · 🛡️ 30-Day Warranty</div>

                    {/* Inclusions / Exclusions */}
                    {(serviceConfig.inclusions || serviceConfig.exclusions) && (
                        <div className={styles.inclusionSection}>
                            {serviceConfig.inclusions && (
                                <div>
                                    <div className={styles.sectionLabel}>✅ What&apos;s Included</div>
                                    <ul className={styles.inclusionList}>
                                        {serviceConfig.inclusions.map((item, i) => (
                                            <li key={i} className={styles.included}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {serviceConfig.exclusions && (
                                <div style={{ marginTop: '1rem' }}>
                                    <div className={styles.sectionLabel}>❌ Not Included</div>
                                    <ul className={styles.inclusionList}>
                                        {serviceConfig.exclusions.map((item, i) => (
                                            <li key={i} className={styles.excluded}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Add-ons */}
                    {serviceConfig.addons && serviceConfig.addons.length > 0 && (
                        <>
                            <div className={styles.sectionLabel}>➕ Frequently Added Together</div>
                            <div className={styles.addonsList}>
                                {serviceConfig.addons.map(addon => (
                                    <div
                                        key={addon.id}
                                        className={`${styles.addonCard} ${selectedAddons.includes(addon.id) ? styles.addonActive : ''}`}
                                        onClick={() => toggleAddon(addon.id)}
                                    >
                                        <span className={styles.addonIcon}>{addon.icon}</span>
                                        <div className={styles.addonInfo}>
                                            <div className={styles.addonName}>{addon.name}</div>
                                            <div className={styles.addonPrice}>+₹{addon.price}</div>
                                        </div>
                                        <div className={styles.addonCheck}>
                                            {selectedAddons.includes(addon.id) ? '☑' : '☐'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
                        onClick={() => setBookingStep(2)}>
                        Continue — Select Date & Time →
                    </button>
                </div>
            )}

            {/* STEP 2: Date, Time, Provider */}
            {bookingStep === 2 && (
                <div className={styles.stepContent}>
                    <div className={styles.sectionLabel}>Select Date</div>
                    <div className={styles.calendarHeader}>
                        <button onClick={() => setMonthOffset(m => m - 1)} disabled={monthOffset <= 0}>‹</button>
                        <h4>{monthName}</h4>
                        <button onClick={() => setMonthOffset(m => m + 1)} disabled={monthOffset >= 2}>›</button>
                    </div>
                    <div className={styles.calendarGrid}>
                        {dayLabels.map(d => <div key={d} className={styles.dayLabel}>{d}</div>)}
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                            const disabled = isBeforeToday(cellDate);
                            const selected = selectedDate && isSameDay(cellDate, selectedDate);
                            const isToday = isSameDay(cellDate, today);
                            return (
                                <div key={day}
                                    className={`${styles.dayCell} ${disabled ? styles.dayDisabled : ''} ${selected ? styles.daySelected : ''} ${isToday ? styles.dayToday : ''}`}
                                    onClick={() => !disabled && setSelectedDate(cellDate)}
                                >{day}</div>
                            );
                        })}
                    </div>

                    <div className={styles.sectionLabel}>Select Time Slot</div>
                    <div className={styles.slotsGrid}>
                        {serviceConfig.availableSlots.map(slot => (
                            <button key={slot}
                                className={`${styles.slotBtn} ${selectedSlot === slot ? styles.slotActive : ''}`}
                                onClick={() => setSelectedSlot(slot)}
                            >{slot}</button>
                        ))}
                    </div>

                    <div className={styles.sectionLabel}>Choose Professional</div>
                    <div className={styles.providersList}>
                        {serviceConfig.providers.map(p => (
                            <div key={p.id}
                                className={`${styles.providerCard} ${selectedProvider === p.id ? styles.providerActive : ''}`}
                                onClick={() => setSelectedProvider(p.id)}
                            >
                                <div className={styles.providerAvatar}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className={styles.providerInfo}>
                                    <div className={styles.providerName}>{p.name}</div>
                                    <div className={styles.providerRating}>
                                        ★ {p.rating} · {p.jobsDone.toLocaleString()} jobs done
                                    </div>
                                </div>
                                {selectedProvider === p.id && <div className={styles.providerCheck}>✓</div>}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button className="btn btn-outline" onClick={() => setBookingStep(1)}>← Back</button>
                        <button className="btn btn-primary" style={{ flex: 1 }}
                            disabled={!selectedDate || !selectedSlot}
                            onClick={() => setBookingStep(3)}>
                            {!selectedDate || !selectedSlot ? 'Select Date & Time' : 'Continue — Service Address →'}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: Service Address */}
            {bookingStep === 3 && (
                <div className={styles.stepContent}>
                    <div className={styles.sectionLabel}>📍 Where should we come?</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Address</label>
                            <textarea value={serviceAddress} onChange={e => setServiceAddress(e.target.value)} rows={2}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '8px', resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>City</label>
                                <input value={serviceCity} onChange={e => setServiceCity(e.target.value)}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.65rem', borderRadius: '8px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>PIN Code</label>
                                <input value={servicePincode} onChange={e => setServicePincode(e.target.value)}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.65rem', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>

                    {/* Safety & Trust Section */}
                    <div className={styles.trustSection}>
                        <div className={styles.sectionLabel}>🛡️ VyaparPe Safety Promise</div>
                        <div className={styles.trustGrid}>
                            <div className={styles.trustItem}><span>✅</span> Background Verified</div>
                            <div className={styles.trustItem}><span>📋</span> ID Card Checked</div>
                            <div className={styles.trustItem}><span>🏥</span> Fully Insured</div>
                            <div className={styles.trustItem}><span>😷</span> Sanitized Equipment</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button className="btn btn-outline" onClick={() => setBookingStep(2)}>← Back</button>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setBookingStep(4)}>
                            Review Booking →
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 4: Review & Book */}
            {bookingStep === 4 && (
                <div className={styles.stepContent}>
                    <div className={styles.sectionLabel}>📋 Booking Summary</div>
                    <div className={styles.bookingSummary}>
                        <div className={styles.summaryRow}><span>📅 Date</span><strong>{selectedDate?.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</strong></div>
                        <div className={styles.summaryRow}><span>⏰ Time</span><strong>{selectedSlot}</strong></div>
                        <div className={styles.summaryRow}><span>👨‍🔧 Professional</span><strong>{provider?.name} (★ {provider?.rating})</strong></div>
                        <div className={styles.summaryRow}><span>📍 Address</span><strong>{serviceAddress}, {serviceCity} {servicePincode}</strong></div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className={styles.sectionLabel}>💰 Price Breakdown</div>
                    <div className={styles.bookingSummary}>
                        <div className={styles.summaryRow}><span>Base Service</span><strong>₹{price.toLocaleString()}</strong></div>
                        {selectedAddons.length > 0 && (serviceConfig.addons || [])
                            .filter(a => selectedAddons.includes(a.id))
                            .map(a => (
                                <div key={a.id} className={styles.summaryRow}>
                                    <span>{a.icon} {a.name}</span><strong>+₹{a.price}</strong>
                                </div>
                            ))
                        }
                        {convenienceFee > 0 && (
                            <div className={styles.summaryRow} style={{ color: 'var(--text-muted)' }}>
                                <span>Convenience Fee</span><strong>₹{convenienceFee}</strong>
                            </div>
                        )}
                        <div className={styles.summaryRow} style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem', fontSize: '1.05rem' }}>
                            <span style={{ fontWeight: 700 }}>Total</span>
                            <strong style={{ color: 'var(--success)', fontSize: '1.1rem' }}>₹{grandTotal.toLocaleString()}</strong>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button className="btn btn-outline" onClick={() => setBookingStep(3)}>← Back</button>
                        <button className="btn btn-primary" style={{ flex: 1, padding: '0.85rem', fontSize: '1rem' }}
                            onClick={handleBook}>
                            Confirm Booking — ₹{grandTotal.toLocaleString()}
                        </button>
                    </div>
                    {/* Cancellation Policy */}
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.75rem', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text-main)' }}>📋 Cancellation Policy:</strong> Free cancellation up to 4 hours before your scheduled slot. ₹100 cancellation fee applies for late cancellations. No refund for no-shows.
                    </div>
                </div>
            )}
        </div>
    );
}
