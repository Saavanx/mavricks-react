import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Tickets({ onOpenLogin }) {
  const { currentUser, idToken, getFreshToken, logout } = useAuth();
  const [searchParams] = useSearchParams();

  // URL status tracking
  const status = searchParams.get('status');
  const bookingId = searchParams.get('booking');
  const txnId = searchParams.get('txn');

  // Form states
  const [packageType, setPackageType] = useState('stag');
  const [quantity, setQuantity] = useState(1);
  const [tableType, setTableType] = useState('');
  const [addOns, setAddOns] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Success Receipt state
  const [receipt, setReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [gatewayError, setGatewayError] = useState(null);

  // Pricing constants
  const packagePrices = {
    stag: 2299,
    female: 499,
    couple: 2799
  };
  const tablePrices = {
    '': 0,
    regular: 14999,
    vvip: 22999
  };

  // Sync profile details when logged in
  useEffect(() => {
    if (currentUser) {
      setCustomerEmail(currentUser.email || '');
      setCustomerPhone(currentUser.phoneNumber || '');
    }
  }, [currentUser]);

  // Handle gateway redirects on success callbacks
  useEffect(() => {
    if (status === 'success' && bookingId) {
      const fetchBooking = async () => {
        try {
          const res = await fetch(`/api/bookings/${bookingId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.ok && data.booking) {
              const b = data.booking;
              setReceipt({
                date: new Date(b.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
                status: b.payment_status.toUpperCase(),
                amount: `₹${Number(b.amount).toLocaleString('en-IN')}`,
                transactionId: b.booking_id,
                ref: b.gateway_payment_id || txnId || 'Pending',
                eventName: b.event_name,
                package: b.package_type,
                qty: b.quantity,
                table: b.table_type || 'None',
                addons: JSON.parse(b.addons_json || '[]').join(', ') || 'None'
              });
              setIsReceiptOpen(true);
            }
          }
        } catch (err) {
          console.error('Error fetching booking detail:', err);
          // Fallback static details
          setReceipt({
            date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            status: 'PAID',
            amount: 'Confirmed',
            transactionId: bookingId,
            ref: txnId || 'Pending',
            eventName: 'March Madness',
            package: 'Passes',
            qty: 1,
            table: 'None',
            addons: 'None'
          });
          setIsReceiptOpen(true);
        }
      };
      fetchBooking();
    } else if (status === 'cancelled') {
      alert('Payment was cancelled or failed. Please try again.');
    }
  }, [status, bookingId, txnId]);

  // Total price calculator
  const calculateTotal = () => {
    const pkgPrice = packagePrices[packageType] || 0;
    const tblPrice = tablePrices[tableType] || 0;
    return (pkgPrice * quantity) + tblPrice;
  };

  const handleAddOnChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAddOns([...addOns, value]);
    } else {
      setAddOns(addOns.filter(a => a !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guard: Force authentication
    if (!currentUser) {
      onOpenLogin();
      return;
    }

    setSubmitting(true);
    const payload = {
      eventKey: 'march-madness',
      packageType,
      quantity: Number(quantity),
      tableType,
      addOns,
      customerEmail,
      customerPhone
    };

    try {
      const token = await getFreshToken() || idToken;
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Payment could not be initialized.');
      }

      if (result.paymentUrl) {
        // Redirect to NTT Gateway checkout
        window.location.href = result.paymentUrl;
        return;
      }

      // Fallback Receipt
      setReceipt({
        date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'Pending',
        amount: `₹${calculateTotal().toLocaleString('en-IN')}`,
        transactionId: result.paymentRef || 'Pending',
        ref: 'Sandbox'
      });
      setIsReceiptOpen(true);
    } catch (err) {
      console.error(err);
      const isGatewayDown = err.message && (
        err.message.toLowerCase().includes('unavailable') ||
        err.message.toLowerCase().includes('gateway') ||
        err.message.toLowerCase().includes('encdata') ||
        err.message.toLowerCase().includes('unexpected response')
      );
      if (isGatewayDown) {
        setGatewayError(err.message);
      } else {
        setGatewayError(err.message || 'Unable to connect to the payment gateway.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tickets-page">
      <section className="page-hero tickets-hero">
        <div className="orb orb-gold" style={{ width: '500px', height: '500px', right: '-100px', top: '-100px', opacity: 0.2 }}></div>
        <div className="page-hero-bg"></div>
        <div className="container">
          <div className="section-label reveal">Book Your Spot</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>GET YOUR<br/><span>TICKETS</span></h1>
          <p className="section-desc reveal reveal-delay-2" style={{ marginTop: '16px' }}>
            Compare trusted booking platforms, choose the best fee route, and lock your spot for Mavricks nights across NCR.
          </p>
        </div>
      </section>

      {/* TICKET EVENT SELECTOR */}
      <section className="section-pad tickets-section">
        <div className="container">
          <div className="tickets-section-head reveal">
            <div>
              <div className="section-label">Booking Options</div>
              <h2 className="tickets-section-title">CHOOSE YOUR <span>BEST ROUTE</span></h2>
              <p className="tickets-section-copy">
                Use the recommended platform for lighter convenience charges, compare alternate listings, or contact the team directly for premium table reservations.
              </p>
            </div>
            <div className="tickets-live-pill">
              <div className="avail-dot"></div>
              <span>Listings are live</span>
            </div>
          </div>

          <div className="ticket-layout">
            {/* Left: Event Details Info Panel */}
            <div className="ticket-tiers">
              <div className="event-info-bar reveal">
                <div className="eib-badge-row">
                  <span className="tag tag-gold">Test Event</span>
                  <span className="eib-status">Gateway Test Mode</span>
                </div>
                <div className="eib-text">
                  <h2>MARCH MADNESS — ROOFTOP SPLASH</h2>
                  <p className="eib-desc">This is a dedicated test booking for the NTT Data payment gateway flow. Choose a package, complete the checkout, and verify the payment redirect, callback, and receipt journey end to end.</p>
                </div>
                <div className="eib-meta-grid">
                  <div className="eib-meta-item">
                    <div className="eib-meta-icon">📅</div>
                    <div><strong>Date</strong><span>21 March 2026</span></div>
                  </div>
                  <div className="eib-meta-item">
                    <div className="eib-meta-icon">📍</div>
                    <div><strong>Venue</strong><span>Rooftop Lounge, NCR</span></div>
                  </div>
                  <div className="eib-meta-item">
                    <div className="eib-meta-icon">🎯</div>
                    <div><strong>Goal</strong><span>Test gateway success flow</span></div>
                  </div>
                </div>
                <div className="test-flow-steps">
                  <div className="test-flow-step">1. Select your pass</div>
                  <div className="test-flow-step">2. Pay through the gateway</div>
                  <div className="test-flow-step">3. Review your receipt</div>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <a href="https://www.instagram.com/mavricks.event/" target="_blank" rel="noreferrer" className="btn-primary">Follow on Instagram</a>
                  <Link to="/contact" className="btn-outline">Get Notified</Link>
                </div>
              </div>
            </div>

            {/* Right: Checkout Form */}
            <div className="checkout-panel reveal">
              <div className="cp-kicker">Secure Checkout</div>
              <h3 className="cp-title">Reserve Your Spot</h3>
              <div className="booking-note">
                <strong>Demo &amp; live-ready flow</strong>
                <p>Use this checkout to test the booking journey. When the gateway credentials are configured, the same flow will connect to the live payment provider.</p>
              </div>

              <form onSubmit={handleSubmit} className="payment-form">
                <input type="hidden" name="eventKey" value="march-madness" />
                <div className="payment-form-group">
                  <label htmlFor="packageType">Package</label>
                  <select 
                    id="packageType" 
                    value={packageType} 
                    onChange={(e) => setPackageType(e.target.value)}
                  >
                    <option value="stag">Stag Entry — ₹2,299</option>
                    <option value="female">Ladies Entry — ₹499</option>
                    <option value="couple">Couple Entry — ₹2,799</option>
                  </select>
                </div>

                <div className="payment-form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    min="1" 
                    max="20" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  />
                </div>

                <div className="payment-form-group">
                  <label htmlFor="tableType">Table</label>
                  <select 
                    id="tableType" 
                    value={tableType} 
                    onChange={(e) => setTableType(e.target.value)}
                  >
                    <option value="">No table</option>
                    <option value="regular">Regular Table — ₹14,999</option>
                    <option value="vvip">VVIP Table — ₹22,999</option>
                  </select>
                </div>

                <div className="payment-form-group">
                  <label>Add-ons</label>
                  <div className="checkbox-group">
                    <label>
                      <input 
                        type="checkbox" 
                        value="hukkah" 
                        checked={addOns.includes('hukkah')} 
                        onChange={handleAddOnChange} 
                      /> Hukkah
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        value="bottle" 
                        checked={addOns.includes('bottle')} 
                        onChange={handleAddOnChange} 
                      /> Bottle
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        value="mixer" 
                        checked={addOns.includes('mixer')} 
                        onChange={handleAddOnChange} 
                      /> Mixer
                    </label>
                  </div>
                </div>

                <div className="payment-form-group">
                  <label htmlFor="customerEmail">Email</label>
                  <input 
                    type="email" 
                    id="customerEmail" 
                    placeholder="you@example.com" 
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required 
                    readOnly={!!currentUser && !!currentUser.email}
                  />
                </div>

                <div className="payment-form-group">
                  <label htmlFor="customerPhone">Phone</label>
                  <input 
                    type="tel" 
                    id="customerPhone" 
                    placeholder="+91xxxxxxxxxx" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required 
                    readOnly={!!currentUser && !!currentUser.phoneNumber}
                  />
                </div>

                {/* Profile Display Area */}
                {currentUser && (
                  <div className="user-profile-status">
                    <span>Logged in as: <strong>{currentUser.displayName || currentUser.email || 'User'}</strong></span>
                    <button type="button" onClick={logout}>Sign Out</button>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-gold cp-cta"
                  style={{ cursor: 'pointer' }}
                  disabled={submitting}
                >
                  {submitting ? 'Connecting...' : `Proceed to Payment (Total: ₹${calculateTotal().toLocaleString('en-IN')})`}
                </button>
              </form>

              <div className="ticket-policies">
                <div className="policy-item">
                  <span>🎟️</span>
                  <div>
                    <strong>Platform Booking</strong>
                    <p>Tickets are sold through Sort My Scene, BookMyShow, and District when listings are live.</p>
                  </div>
                </div>
                <div className="policy-item">
                  <span>🍽️</span>
                  <div>
                    <strong>Extra Charges</strong>
                    <p>Food, wine, and hukkah are separate and not included in entry tickets.</p>
                  </div>
                </div>
                <div className="policy-item">
                  <span>🪑</span>
                  <div>
                    <strong>Table Booking</strong>
                    <p>Table reservations are handled directly. Contact the team for group or VIP table enquiries.</p>
                  </div>
                </div>
                <div className="policy-item">
                  <span>📄</span>
                  <div>
                    <strong>Policies</strong>
                    <p>Read our <Link to="/policies" style={{ color: '#ffcf4d', textDecoration: 'underline' }}>Terms, Cancellation &amp; Payment Policy</Link> before booking.</p>
                  </div>
                </div>
              </div>
              <div className="cp-contact">
                <p>Want to plan a private event or make a group enquiry?</p>
                <Link to="/contact" className="btn-gold cp-cta">Contact the Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="trust-section section-pad" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item reveal">
              <div className="trust-icon">🔒</div>
              <strong>Secure Payments</strong>
              <span>256-bit SSL encryption</span>
            </div>
            <div className="trust-item reveal reveal-delay-1">
              <div className="trust-icon"></div>
              <strong>Verified Events</strong>
              <span>Every event is officially authorized</span>
            </div>
            <div className="trust-item reveal reveal-delay-2">
              <div className="trust-icon">📲</div>
              <strong>Instant Delivery</strong>
              <span>Tickets to your email in seconds</span>
            </div>
            <div className="trust-item reveal reveal-delay-3">
              <div className="trust-icon">🎯</div>
              <strong>Best Price</strong>
              <span>No hidden fees &amp; No Extra Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* GATEWAY ERROR MODAL */}
      {gatewayError && (
        <div className="login-modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div className="login-modal-card" style={{ maxWidth: '420px', padding: '32px', textAlign: 'center', position: 'relative' }}>
            <button type="button" className="close-modal-btn" onClick={() => setGatewayError(null)}>&times;</button>
            
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(231, 76, 60, 0.15)', border: '1px solid rgba(231,76,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>⚠️</div>
            
            <h3 className="modal-title" style={{ color: '#e74c3c', fontSize: '20px', marginBottom: '8px' }}>Payment Gateway Unavailable</h3>
            <p className="modal-subtitle" style={{ marginBottom: '20px', lineHeight: '1.7' }}>
              Our payment gateway is currently experiencing downtime. You can book directly via WhatsApp and our team will confirm your slot instantly.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', marginBottom: '20px', textAlign: 'left', fontSize: '13px' }}>
              <div style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>Your Selection</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Package</span>
                <strong style={{ textTransform: 'capitalize' }}>{packageType} Entry × {quantity}</strong>
              </div>
              {tableType && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Table</span>
                  <strong style={{ textTransform: 'capitalize' }}>{tableType}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px', marginTop: '6px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Total</span>
                <strong style={{ color: '#2ecc71' }}>₹{calculateTotal().toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <a
              href={`https://wa.me/919319826105?text=${encodeURIComponent(`Hi! I want to book tickets for March Madness.\n\nPackage: ${packageType} × ${quantity}\nTable: ${tableType || 'None'}\nTotal: ₹${calculateTotal().toLocaleString('en-IN')}\nEmail: ${customerEmail}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                width: '100%', padding: '14px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(37,211,102,0.3)', marginBottom: '12px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Book via WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setGatewayError(null)}
              style={{ width: '100%', padding: '11px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}
            >
              Try Again Later
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS RECEIPT MODAL OVERLAY */}
      {isReceiptOpen && receipt && (
        <div className="login-modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div className="login-modal-card" style={{ maxWidth: '460px', padding: '30px', position: 'relative' }}>
            <button type="button" className="close-modal-btn" onClick={() => setIsReceiptOpen(false)}>&times;</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '28px', color: '#2ecc71' }}>✓</div>
              <h3 className="modal-title" style={{ margin: 0, fontSize: '24px', color: '#f7b731' }}>Payment Confirmed</h3>
              <p className="modal-subtitle" style={{ margin: '6px 0 0' }}>Your passes are secured! Show this receipt at the entrance.</p>
            </div>

            {/* Aesthetic Ticket Receipt Design */}
            <div className="ticket-receipt" style={{ background: '#13111f', border: '1px dashed rgba(247, 183, 49, 0.3)', borderRadius: '16px', overflow: 'hidden', color: '#fff', position: 'relative' }}>
              
              {/* Top ticket section */}
              <div style={{ padding: '20px', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold)', fontWeight: 700 }}>Mavricks Event Pass</span>
                <h4 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                  {receipt.eventName || 'MARCH MADNESS — ROOFTOP SPLASH'}
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Date &amp; Time</span>
                    <strong>{receipt.date}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Venue</span>
                    <strong>Rooftop Lounge, NCR</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Package Type</span>
                    <strong style={{ textTransform: 'capitalize' }}>{receipt.package} Entry</strong>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Quantity</span>
                    <strong>{receipt.qty} Pax</strong>
                  </div>
                </div>
              </div>

              {/* Middle circular punchouts to simulate a physical ticket */}
              <div style={{ position: 'absolute', left: '-10px', top: '56%', width: '20px', height: '20px', borderRadius: '50%', background: '#1a1729', borderRight: '1px dashed rgba(247, 183, 49, 0.3)', zIndex: 2 }}></div>
              <div style={{ position: 'absolute', right: '-10px', top: '56%', width: '20px', height: '20px', borderRadius: '50%', background: '#1a1729', borderLeft: '1px dashed rgba(247, 183, 49, 0.3)', zIndex: 2 }}></div>

              {/* Bottom billing section */}
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Table Allocation</span>
                    <strong style={{ textTransform: 'capitalize' }}>{receipt.table}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Add-ons Included</span>
                    <strong style={{ textTransform: 'capitalize' }}>{receipt.addons}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Booking ID</span>
                    <strong style={{ color: 'var(--cyan)' }}>{receipt.transactionId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Transaction Ref</span>
                    <strong style={{ fontSize: '11px' }}>{receipt.ref}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                  <span style={{ color: '#fff', fontWeight: 600 }}>Amount Charged</span>
                  <strong style={{ color: '#2ecc71', fontSize: '16px' }}>{receipt.amount}</strong>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => setIsReceiptOpen(false)} 
              className="btn-gold" 
              style={{ width: '100%', padding: '12px', background: '#f7b731', color: '#111', fontWeight: 700, border: 0, borderRadius: '999px', marginTop: '24px', cursor: 'pointer' }}
            >
              Done &amp; Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
