import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Policies() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="policies-page">
      <section className="policy-page">
        <div className="container">
          <div className="section-label">Booking & Event Policies</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.6rem, 5vw, 3.8rem)' }}>
            TERMS, CANCELLATION<br /><span>&amp; PAYMENT</span> GUIDELINES
          </h1>
          <p className="section-desc" style={{ maxWidth: '760px', marginTop: '16px' }}>
            These policies apply to all Mavricks event bookings, upcoming event announcements, and ticket purchases made via our website, WhatsApp, or partner platforms.
          </p>
          
          <a 
            href="#terms" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '18px', padding: '11px 18px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none' }}
          >
            View policy details <span style={{ fontSize: '1.1rem' }}>↓</span>
          </a>

          <div className="policy-highlights">
            <div className="policy-highlight">
              <strong>Booking Confirmation</strong>
              <span>Your reservation is confirmed only after successful payment and a valid booking receipt.</span>
            </div>
            <div className="policy-highlight">
              <strong>Event Updates</strong>
              <span>Event dates, venue, timing, and artist line-up are subject to change and will be communicated promptly.</span>
            </div>
            <div className="policy-highlight">
              <strong>Entry Rules</strong>
              <span>Guests must carry a valid ticket or booking confirmation and comply with event security and house rules.</span>
            </div>
          </div>

          <div className="policy-card" id="terms" style={{ marginTop: '32px' }}>
            <h2>1. Terms & Conditions</h2>
            <p>By purchasing a ticket or booking a table with Mavricks Events, you agree to the following terms:</p>
            <ul>
              <li>Tickets are non-transferable unless explicitly approved by the event management team.</li>
              <li>Entry is subject to event capacity, age restrictions, dress code, and security screening.</li>
              <li>Mavricks reserves the right to refuse entry or remove any guest violating venue rules, safety guidelines, or public conduct standards.</li>
              <li>Any promotional offers, discounts, or package pricing are valid only within the stated period and may be withdrawn without prior notice.</li>
              <li>Guests are responsible for their own belongings, travel arrangements, and arrival timing.</li>
            </ul>
          </div>

          <div className="policy-card" id="cancellation">
            <h2>2. Cancellation & Refund Policy</h2>
            <p>Cancellation requests must be submitted in writing to the Mavricks team at the earliest possible time.</p>
            <ul>
              <li>Full refund if the cancellation request is made at least 7 days before the event date.</li>
              <li>50% refund if cancellation is made between 3 and 6 days before the event.</li>
              <li>No refund for cancellations made within 72 hours of the event or for no-shows.</li>
              <li>Refunds will be processed within 7 to 10 business days after approval.</li>
              <li>In case of event postponement or cancellation by Mavricks, customers will be offered either a credit for a future event or a refund as applicable.</li>
            </ul>
          </div>

          <div className="policy-card" id="payment">
            <h2>3. Payment Policy</h2>
            <p>All bookings must be paid through the approved booking channels provided on the website or by the Mavricks team.</p>
            <ul>
              <li>Advance payment is required to hold a reservation or ticket.</li>
              <li>Accepted payment methods include UPI, cards, net banking, and other approved digital methods.</li>
              <li>Any processing fees, convenience charges, or platform fees, if applicable, will be disclosed at the time of booking.</li>
              <li>Payments are considered successful only after receiving a confirmed booking receipt or payment confirmation.</li>
              <li>Disputes or chargebacks must be raised directly with the Mavricks support team before contacting the bank or payment provider.</li>
            </ul>
          </div>

          <div className="policy-card">
            <h2>4. Event Management & Guest Conduct</h2>
            <p>Mavricks Event Management may update event format, venue, timing, or entertainment arrangements as required for operational, safety, or venue reasons. Guests are expected to:</p>
            <ul>
              <li>Respect staff, guests, and venue property.</li>
              <li>Follow all safety, security, and entry instructions at the venue.</li>
              <li>Refrain from carrying prohibited items, illegal substances, or dangerous materials.</li>
              <li>Accept that photography, videography, and public sharing may be captured as part of event coverage.</li>
            </ul>
          </div>

          <div className="policy-card">
            <h2>5. Contact for Policy Queries</h2>
            <p>For refund, booking, or policy-related assistance, please contact the Mavricks team via the contact page or WhatsApp support.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
