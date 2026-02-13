'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdUnit from '@/components/AdUnit';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { setStatus('error'); return; }
    setStatus('sending');
    const subject = encodeURIComponent(`[PaycheckMath ${formData.subject}] From ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:paycheckmath@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('sent'), 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">Have a question, suggestion, or found a bug? We&apos;d love to hear from you. Fill out the form below or email us directly.</p>

        <div className="grid md:grid-cols-[1fr_320px] gap-8 sm:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input type="text" id="contactName" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="Your name" required />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input type="email" id="contactEmail" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="contactSubject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <select id="contactSubject" value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white">
                  <option value="general">General Inquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="business">Business Inquiry</option>
                </select>
              </div>
              <div>
                <label htmlFor="contactMessage" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <textarea id="contactMessage" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} rows={5} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white resize-y" placeholder="How can we help you?" required />
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {status === 'sending' ? 'Opening email...' : 'Send Message'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              {status === 'sent' && <p className="text-green-600 text-sm font-medium">✅ Your email client should have opened with the message. If it didn&apos;t, email us directly at paycheckmath@gmail.com.</p>}
              {status === 'error' && <p className="text-red-600 text-sm font-medium">Please fill in all required fields.</p>}
            </form>
          </div>

          <aside className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">📧</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <a href="mailto:paycheckmath@gmail.com" className="text-blue-600 text-sm hover:underline">paycheckmath@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">⏰</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Response Time</p>
                    <p className="text-gray-600 text-sm">Within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="font-bold text-gray-900 mb-3">Frequently Asked</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900">Is this calculator accurate?</h3>
                  <p className="text-gray-600">Yes, all calculations use standard formulas based on your inputs. Results are gross pay estimates.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Do you store my data?</h3>
                  <p className="text-gray-600">No. All calculations happen locally in your browser. We never see or store your salary data.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Can I suggest a new calculator?</h3>
                  <p className="text-gray-600">Absolutely! Use the form to send us your idea. We build based on user requests.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <AdUnit format="horizontal" />
      </main>
      <Footer />
    </div>
  );
}
