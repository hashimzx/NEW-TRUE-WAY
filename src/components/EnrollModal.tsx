import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Upload, 
  CreditCard, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: string;
  defaultCourse?: string;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  currency = 'GBP',
  defaultCourse = 'How to Become an Online Quran Teacher'
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'easypaisa' | 'card'>('bank');
  const [submitted, setSubmitted] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse);
  const [transactionRef, setTransactionRef] = useState('');
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Abdul Basit,\n\nI want to enroll in "${course}".\nName: ${firstName || 'Student'} ${lastName}\nPhone: ${phone}\nEmail: ${email}\nPayment Method: ${selectedMethod}\nRef: ${transactionRef || 'Pending screenshot'}`
    );
    window.open(`https://wa.me/923068959085?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-black uppercase tracking-wider border border-pink-400/30">
              <Sparkles className="w-3 h-3" />
              <span>Secure Your Seat · Batch Admissions Open</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Start Learning With Us
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm">
              Lifetime course access, live Zoom sessions with Abdul Basit Saleem & WhatsApp community.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-purple-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into Payment Details & Registration Form */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {submitted ? (
            <div className="text-center py-12 space-y-5 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-purple-950">
                Enrollment Application Received!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                JazakAllah Khair <strong>{firstName} {lastName}</strong>. Our admissions team and Mentor Abdul Basit Saleem will verify your seat and contact you via WhatsApp (<strong>{phone}</strong>) within 24–48 hours.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold rounded-xl hover:bg-purple-100 transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Bank / Easypaisa Accounts (from ustadleads.com) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Pricing summary */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-200/80 rounded-2xl p-4.5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Program Fee</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-purple-950">PKR 4,999</span>
                    <span className="text-sm text-slate-400 line-through">PKR 7,999</span>
                    <span className="text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">Save 38%</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    One-time payment. Lifetime access, live Zoom sessions & community included.
                  </p>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                    Select Payment Method
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bank')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition cursor-pointer ${
                        selectedMethod === 'bank'
                          ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-purple-600" />
                      <span>Bank Wire</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('easypaisa')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition cursor-pointer ${
                        selectedMethod === 'easypaisa'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Easypaisa</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('card')}
                      className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition cursor-pointer ${
                        selectedMethod === 'card'
                          ? 'border-pink-600 bg-pink-50 text-pink-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-pink-600" />
                      <span>Card / Global</span>
                    </button>
                  </div>
                </div>

                {/* Bank Transfer Details (Direct from UstadLeads) */}
                {selectedMethod === 'bank' && (
                  <div className="space-y-3">
                    {/* HBL Account */}
                    <div className="bg-white border border-purple-200 rounded-xl p-3.5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-purple-50 pb-1.5">
                        <span className="font-black text-xs text-purple-950">Bank: Habib Bank Ltd (HBL)</span>
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">Preferred</span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-700">
                        <p><strong className="text-slate-900">Title:</strong> ABDUL BASIT SALEEM</p>
                        <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          <span className="font-mono text-purple-900 font-semibold">01707918996103</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('01707918996103', 'hbl_acc')}
                            className="text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-1 font-bold"
                          >
                            {copiedField === 'hbl_acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'hbl_acc' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          <span className="font-mono text-[10px] text-purple-900">PK34HABB0001707918996103</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('PK34HABB0001707918996103', 'hbl_iban')}
                            className="text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-1 font-bold"
                          >
                            {copiedField === 'hbl_iban' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'hbl_iban' ? 'Copied' : 'IBAN'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Allied Bank Account */}
                    <div className="bg-white border border-purple-200 rounded-xl p-3.5 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between border-b border-purple-50 pb-1.5">
                        <span className="font-black text-xs text-purple-950">Bank: ALLIED BANK LIMITED</span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-700">
                        <p><strong className="text-slate-900">Title:</strong> ABDUL BASIT SALEEM</p>
                        <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          <span className="font-mono text-purple-900 font-semibold">07400010079809420018</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('07400010079809420018', 'abl_acc')}
                            className="text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-1 font-bold"
                          >
                            {copiedField === 'abl_acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'abl_acc' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          <span className="font-mono text-[10px] text-purple-900">PK97ABPA0010079809420018</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard('PK97ABPA0010079809420018', 'abl_iban')}
                            className="text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-1 font-bold"
                          >
                            {copiedField === 'abl_iban' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedField === 'abl_iban' ? 'Copied' : 'IBAN'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Easypaisa Account (Direct from UstadLeads) */}
                {selectedMethod === 'easypaisa' && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Easypaisa Mobile Account</span>
                    </div>
                    <div className="text-xs space-y-1.5 text-emerald-900">
                      <p><strong>Account Title:</strong> ABDUL BASIT SALEEM</p>
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-200">
                        <span className="font-mono font-bold text-base text-emerald-950">03497778998</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('03497778998', 'easypaisa_num')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition flex items-center gap-1"
                        >
                          {copiedField === 'easypaisa_num' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'easypaisa_num' ? 'Copied' : 'Copy Number'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-emerald-700 pt-1">
                        Send payment via Easypaisa App or any Easypaisa shop and upload the receipt on the right.
                      </p>
                    </div>
                  </div>
                )}

                {/* International Card / PayPal */}
                {selectedMethod === 'card' && (
                  <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 space-y-3 text-xs text-purple-950">
                    <div className="flex items-center gap-2 font-black text-sm">
                      <CreditCard className="w-4 h-4 text-pink-600" />
                      <span>International Debit / Credit / Wise / PayPal</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      For international students (UK, US, Canada, Australia, Europe, UAE), we support Wise, Stripe card checkout, and direct wire. Please reach out to Abdul Basit directly on WhatsApp for instant invoice link.
                    </p>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full py-2.5 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Request International Payment Link</span>
                    </button>
                  </div>
                )}

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Account Details & 100% Halal Education Guarantee.</span>
                </div>
              </div>

              {/* Right Column: Enrollment Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-purple-100 pb-2">
                    <h3 className="text-base font-black text-purple-950">
                      Submit Your Payment Proof & Seat Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill in your details below. We confirm seats within 24–48 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Ahmad"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Khan"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Course Selected *
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition font-medium text-slate-800"
                    >
                      <option value="How to Become an Online Quran Teacher">
                        How to Become an Online Quran Teacher (30-Day Masterclass - PKR 4,999)
                      </option>
                      <option value="One-on-One Session with Abdul Basit">
                        One-on-One Mentorship Session with Abdul Basit Saleem
                      </option>
                      <option value="Full Quran Recitation & Tajweed Mastery">
                        Full Quran Recitation & Tajweed Mastery
                      </option>
                      <option value="Madani Qaida for Kids & Beginners">
                        Madani Qaida for Kids & Beginners
                      </option>
                      <option value="Quran Hifz (Memorization) Program">
                        Quran Hifz (Memorization) Program
                      </option>
                    </select>
                  </div>

                  {/* Transaction ID or Receipt Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Transaction Ref / TID
                      </label>
                      <input
                        type="text"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder="e.g. TRX-987654321"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Screenshot of Payment
                      </label>
                      <label className="w-full px-3 py-2 bg-slate-50 border border-dashed border-purple-300 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-50 transition text-purple-900 font-medium">
                        <Upload className="w-3.5 h-3.5 text-purple-600" />
                        <span className="truncate">{fileName || 'Choose image/PDF'}</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFileName(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message / Availability (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any specific timings or questions..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-600 focus:bg-white transition"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-5 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white text-xs font-black rounded-xl shadow-lg shadow-pink-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Payment & Confirm Seat</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enroll via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    Questions? Call or WhatsApp Abdul directly at <a href="https://wa.me/923068959085" className="text-purple-700 font-bold hover:underline">+92 306 8959085</a>
                  </p>
                </form>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
