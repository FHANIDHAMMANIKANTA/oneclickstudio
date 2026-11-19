import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in select-none">
      <div className="card-brutal p-6 sm:p-8 bg-[#FFFDF8] max-w-2xl w-full max-h-[85vh] flex flex-col justify-between relative shadow-brutal-lg text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${isPrivacy ? 'bg-[#B8FF5C]' : 'bg-[#FF5B37]'} border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center`}>
              {isPrivacy ? (
                <ShieldCheck className="w-5 h-5 text-[#0A0A0A]" />
              ) : (
                <FileText className="w-5 h-5 text-[#0A0A0A]" />
              )}
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-[#0A0A0A] tracking-tight">
                {isPrivacy ? 'Privacy & Data Protection' : 'Terms of Service & Usage'}
              </h3>
              <p className="text-xs text-neutral-600 font-mono">
                Effective: November 2026 · Hivepostly Platform Compliance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-neutral-200 border-2 border-[#0A0A0A] shadow-brutal-sm text-[#0A0A0A] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-5 pr-2 space-y-5 text-xs text-neutral-700 leading-relaxed font-body">
          {isPrivacy ? (
            <>
              <div className="p-3 bg-[#B8FF5C]/30 border-2 border-[#0A0A0A] font-medium text-neutral-900">
                🔒 <strong>Zero Data Selling Guarantee:</strong> Hivepostly never sells, rents, or licenses your personal media, video drafts, audience metrics, or account access tokens to third parties.
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  1. Information We Collect
                </h4>
                <p>
                  We collect account authentication tokens (OAuth 2.0) provided directly through official social network developer APIs (Meta Graph, YouTube Data API, X API, TikTok for Developers, LinkedIn v2, and Pinterest Business API). We do not store or capture raw passwords.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  2. Media & Video Processing
                </h4>
                <p>
                  Video clips processed in Hivepostly Studio utilize in-browser WebCodecs and temporary sandboxed render pipelines. Videos are only stored in your private Media Vault as long as your workspace remains active, and can be purged immediately with one click.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  3. Comment-to-DM Trigger Safety
                </h4>
                <p>
                  Automated direct messaging strictly honors official Instagram & Meta daily velocity limits, keyword opt-ins, and anti-spam protocols to safeguard creator account health and recipient privacy.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  4. Your Rights & Data Portability
                </h4>
                <p>
                  You retain full ownership of all generated hooks, captions, and edited assets. You may request full account data deletion or export your telemetry history at any time from Settings.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-[#FF5B37]/20 border-2 border-[#0A0A0A] font-medium text-neutral-900">
                ⚡ <strong>Creator Ownership:</strong> You own 100% of the intellectual property, videos, hooks, and content you create or schedule through Hivepostly.
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  1. Service Eligibility & Fair Use
                </h4>
                <p>
                  Hivepostly is designed for content creators, media brands, and digital agencies. You agree not to utilize the automated publisher or comment bots to distribute malicious software, phishing links, hate speech, or spam.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  2. AI Credits & Token Billing
                </h4>
                <p>
                  AI Studio generations and automated subtitle burn-ins consume allocated plan credits. Unused monthly credits roll over up to 2x your subscription tier limit. Additional credits may be purchased anytime without renewing base subscription.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  3. Platform API Compliance
                </h4>
                <p>
                  Hivepostly abides by each respective network's terms of service (YouTube, Meta, TikTok, X, Pinterest, LinkedIn). Platform rate limits and policy updates may affect external API synchronization times beyond our direct control.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#0A0A0A] uppercase tracking-wide">
                  4. Billing, UPI & Cancellations
                </h4>
                <p>
                  Plans renew monthly or annually. You may cancel your subscription at any moment with zero termination fees. Indian UPI & GST tax invoices are automatically generated upon payment.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-[#0A0A0A] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-mono">
            <CheckCircle2 className="w-4 h-4 text-[#B8FF5C]" />
            <span>256-Bit SSL Encryption</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-bold text-xs uppercase tracking-wider border-2 border-[#0A0A0A] shadow-brutal transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
