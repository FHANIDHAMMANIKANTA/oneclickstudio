import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FolderLock, 
  ShoppingBag, 
  IndianRupee, 
  Download, 
  QrCode, 
  Link2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Plus, 
  Eye, 
  ExternalLink,
  CreditCard,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { AssetVaultItem, StoreProduct } from '../../types';
import { mockAssetVaultItems, mockStoreProducts } from '../../data/mockData';

export const CreatorHubStorefront: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'storefront' | 'vault'>('storefront');
  const [products, setProducts] = useState<StoreProduct[]>(mockStoreProducts);
  const [assets, setAssets] = useState<AssetVaultItem[]>(mockAssetVaultItems);
  const [checkoutProduct, setCheckoutProduct] = useState<StoreProduct | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalStoreSales = products.reduce((acc, p) => acc + p.salesCount, 0);
  const totalStoreRevenue = products.reduce((acc, p) => acc + p.revenueINR, 0);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCheckoutProduct(null);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      alert('Payment Verified via UPI (Razorpay Simulator)! Digital file delivered to user email.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              CREATOR HUB & DIGITAL STOREFRONT
            </h2>
            <span className="text-[10px] font-mono uppercase bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/20">
              UPI & India-First Checkout
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Convert social followers directly into paying customers with built-in digital product checkout and protected lead magnet vault.
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('storefront')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'storefront' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Digital Storefront
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'vault' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lead Magnet Vault ({assets.length})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-indigo-300">
            <Link2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono">pulse.bio/fhanidham</span>
          </div>
        </div>
      </div>

      {/* Store Revenue Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Store Revenue</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
            ₹{totalStoreRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">100% Attributed via Comment-to-DM & Bio</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Orders Completed</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {totalStoreSales}
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Average Order Value: ₹940</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Lead Magnet Vault Downloads</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
            3,270
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">695 Active Expiring Protected Links</div>
        </div>
      </div>

      {/* TAB 1: DIGITAL STOREFRONT */}
      {activeTab === 'storefront' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Active Digital Products & Checkout
            </h3>
            <button
              onClick={() => alert('New Digital Product Modal opened')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-rose-400" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl bg-[#131724] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-rose-500/40 transition-all"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-black/60">
                    <img
                      src={prod.coverImage}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                      {prod.salesCount} Sold
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {prod.type}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-white font-mono">
                          ₹{prod.priceINR.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPriceINR && (
                          <span className="text-[11px] text-slate-500 line-through font-mono">
                            ₹{prod.originalPriceINR}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{prod.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <div className="text-[11px] font-mono text-amber-400">
                    Revenue: ₹{prod.revenueINR.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={() => setCheckoutProduct(prod)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Test Instant Checkout (UPI / Card)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEAD MAGNET VAULT */}
      {activeTab === 'vault' && (
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-rose-400" />
                SECURE LEAD MAGNET VAULT
              </h3>
              <p className="text-xs text-slate-400">
                Anti-piracy protected files with dynamic expiring tokens and lead capture gates.
              </p>
            </div>

            <button
              onClick={() => alert('Select file to upload to secure vault')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200"
            >
              + Upload File
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-mono text-xs uppercase">
                    {asset.type}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{asset.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">({asset.size})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                      <span>Downloads: <strong className="text-emerald-400 font-mono">{asset.downloads}</strong></span>
                      <span>Views: <strong className="text-slate-300 font-mono">{asset.views}</strong></span>
                      <span>Uploaded {asset.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(asset.url, asset.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5 border border-white/10"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Expiring Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Razorpay / UPI Instant Checkout Modal Simulation */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-[#141724] border border-white/10 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  INSTANT CHECKOUT (RAZORPAY SIMULATOR)
                </h3>
              </div>
              <button
                onClick={() => setCheckoutProduct(null)}
                className="w-7 h-7 rounded-lg bg-white/5 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Product info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
              <img
                src={checkoutProduct.coverImage}
                alt=""
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 truncate">
                <div className="font-bold text-white truncate">{checkoutProduct.title}</div>
                <div className="text-[11px] text-slate-400">Instant digital access delivered</div>
              </div>
              <div className="text-sm font-extrabold text-amber-400 font-mono">
                ₹{checkoutProduct.priceINR.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Payment method selector */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR Code</span>
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card / NetBanking</span>
              </button>
            </div>

            {/* QR Code Graphic for UPI */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center">
                  <div className="w-full h-full border-2 border-black border-dashed flex flex-col items-center justify-center text-black text-[10px] font-mono">
                    <QrCode className="w-16 h-16 text-black" />
                    <span>UPI SCAN & PAY</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  UPI ID: <span className="text-emerald-400">fhanidham@okaxis</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Supports GPay, PhonePe, Paytm, CRED & BHIM
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessingPayment}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <span>Confirming UPI Webhook...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Pay ₹{checkoutProduct.priceINR.toLocaleString('en-IN')} (Simulate Success)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
