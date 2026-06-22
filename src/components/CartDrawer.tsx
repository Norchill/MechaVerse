/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Trash2, ShieldCheck, Truck, ShoppingBag, ArrowRight, ArrowLeft, CreditCard, Lock, Landmark } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onClear
}: CartDrawerProps) {
  // Checkout sequence wizard steps: 'cart' | 'payment' | 'processing' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'processing' | 'success'>('cart');
  const [processingPercent, setProcessingPercent] = useState(0);
  
  // Promotion engine states
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Method selector: 'card' | 'bank'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  // Credit Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Bank Wire fields
  const [bankRouting, setBankRouting] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankHolderName, setBankHolderName] = useState('');

  // Validation feedback
  const [validationError, setValidationError] = useState<string | null>(null);

  // Totals calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const shippingThreshold = 400; // Free shipping above $400
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : 35;
  const total = subtotal - discountAmount + shippingCost;

  // Real-time ticking percentage during processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === 'processing') {
      setProcessingPercent(0);
      interval = setInterval(() => {
        setProcessingPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCheckoutStep('success');
            }, 600);
            return 100;
          }
          return prev + Math.floor(Math.random() * 8) + 4;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Reset steps on drawer reopen
  useEffect(() => {
    if (!isOpen) {
      // Keep state clean on closure
      if (checkoutStep === 'success') {
        onClear();
        setCheckoutStep('cart');
      }
    }
  }, [isOpen]);

  const handleApplyPromo = () => {
    setPromoError(null);
    setPromoMessage(null);
    if (couponCode.toUpperCase() === 'ARCTIC20') {
      setAppliedDiscount(0.20);
      setPromoMessage('PROMO APPLIED: 20% discount on entire Arctic collection.');
    } else {
      setPromoError('Invalid technical protocol code.');
    }
  };

  const handleInitiateTransaction = () => {
    if (cartItems.length === 0) return;
    setValidationError(null);
    setCheckoutStep('payment');
  };

  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length <= 16) {
      setCardNumber(digits);
    }
  };

  const formatCardNumberStr = (digits: string) => {
    const matches = digits.match(/.{1,4}/g);
    return matches ? matches.join(' ') : digits;
  };

  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 4) {
      if (clean.length > 2) {
        setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2)}`);
      } else {
        setCardExpiry(clean);
      }
    }
  };

  const handleCvvChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 4) {
      setCardCvv(clean);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.length < 15) {
        setValidationError('ERROR: Valid card number payload expected (15-16 digits).');
        return;
      }
      if (!cardName.trim()) {
        setValidationError('ERROR: Authorized cardholder signature needed.');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setValidationError('ERROR: Active temporal expiry code needed (MM/YY).');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setValidationError('ERROR: Decryption key CVV expected (3-4 digits).');
        return;
      }
    } else {
      if (!bankRouting || bankRouting.length < 9) {
        setValidationError('ERROR: System requires a 9-digit routing node transit address.');
        return;
      }
      if (!bankAccount || bankAccount.length < 8) {
        setValidationError('ERROR: Registered account destination payload code is missing.');
        return;
      }
      if (!bankHolderName.trim()) {
        setValidationError('ERROR: Signatory identification protocol required.');
        return;
      }
    }

    // Validation passes, dispatch transaction
    setCheckoutStep('processing');
  };

  const handleCloseSuccess = () => {
    onClear();
    setCheckoutStep('cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={checkoutStep === 'success' ? handleCloseSuccess : checkoutStep === 'processing' ? undefined : onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10 animate-fade-in">
        <div className="w-screen max-w-md transform bg-slate-950/95 border-l border-white/10 backdrop-blur-xl text-white shadow-2xl transition-all flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-2">
              {checkoutStep === 'payment' && (
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="mr-1 text-white/60 hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
                  title="Back to Cargo"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <h2 id="cart-drawer-header-title" className="text-sm font-mono tracking-[0.2em] font-bold text-white uppercase flex items-center gap-2">
                <ShoppingBag size={16} className="text-sky-400" />
                {checkoutStep === 'cart' && `SECURE CARGO [${cartItems.reduce((sum, item) => sum + item.quantity, 0)}]`}
                {checkoutStep === 'payment' && 'GATEWAY DEPLOYMENT'}
                {checkoutStep === 'processing' && 'ENCRYPTING PAYLOAD'}
                {checkoutStep === 'success' && 'TRANSACTION VERIFIED'}
              </h2>
            </div>
            <button
              onClick={checkoutStep === 'success' ? handleCloseSuccess : checkoutStep === 'processing' ? undefined : onClose}
              disabled={checkoutStep === 'processing'}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors disabled:opacity-30"
            >
              <X size={18} />
            </button>
          </div>

          {/* Checkout Steps Body Views */}
          
          {/* STEP 4: SUCCESS VIEW */}
          {checkoutStep === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mb-6 animate-pulse">
                <ShieldCheck size={32} className="text-emerald-400" />
              </div>
              <p className="text-[10px] font-mono text-emerald-400 mb-1 tracking-widest uppercase font-bold">MUTUAL SECURITY ESTABLISHED</p>
              <h3 className="text-xl font-bold font-sans tracking-tight mb-3">CONGRATULATIONS FROM FRZN™</h3>
              <p className="text-xs text-white/50 max-w-xs mb-8 leading-relaxed">
                Your secure transaction holds have been fully certified. The deployment courier route is set. All products have transitioned to dispatch.
              </p>
              
              <div className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-5 mb-8 text-left font-mono text-[10px] text-white/70 space-y-2.5">
                <p className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/40">ORDER REFERENCE</span> <span className="text-emerald-400 font-bold font-mono">FRZN-9508-T-GATE</span></p>
                <p className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/40">PAYMENT ROUTE</span> <span className="font-mono">{paymentMethod === 'card' ? 'AUTHORIZED CREDITS' : 'SECURE SECURE WIRE'}</span></p>
                <p className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/40">DISPATCH CARRIER</span> <span className="font-mono">Priority Arctic Ice Courier</span></p>
                <p className="flex justify-between pt-1 text-xs font-bold text-white"><span className="text-white/40">TRANSFER VALUE</span> <span className="font-mono">${total.toFixed(2)}</span></p>
              </div>

              <button
                onClick={handleCloseSuccess}
                className="w-full py-4 bg-sky-500 text-slate-950 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-sky-400 transition-all rounded cursor-pointer"
              >
                DISMISS PROTOCOL
              </button>
            </div>
          )}

          {/* STEP 3: CRYPTOGRAPHIC RUNTIME PROCESSING VIEW */}
          {checkoutStep === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950">
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-sky-500/10" />
                <div className="absolute inset-0 rounded-full border-t-2 border-sky-400 animate-spin" />
                <span className="text-sm font-mono font-bold text-sky-400">{Math.min(100, processingPercent)}%</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-mono text-sky-300 tracking-[0.2em] uppercase font-semibold animate-pulse">
                  ENCRYPTING TRANSACTION DATA
                </p>
                <p className="text-[10px] text-white/40 font-mono max-w-xs leading-relaxed">
                  [ System dispatching 256-bit secure quantum handshakes to clearing network nodes. Please remain active. ]
                </p>
              </div>

              <div className="w-full max-w-xs bg-slate-900 border border-sky-500/15 rounded p-3 mt-8 font-mono text-[9px] text-left text-sky-300/60 leading-normal space-y-1">
                <p>&gt; CONNECTING BANK SECURE ENCLAVE...</p>
                <p>&gt; SENDING ROTON TRANSACTION SYNC: OK</p>
                <p>&gt; DEPLOYING ASSET RESERVATION LOCK: VALID</p>
                <p>&gt; ESTABLISHING LOGISTICAL COURIER TOKEN...</p>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT & BANK DETAILS FORM VIEW */}
          {checkoutStep === 'payment' && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="p-6 space-y-6">
                
                {/* Micro Tab Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 border border-white/10 rounded-lg">
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('card'); setValidationError(null); }}
                    className={`flex items-center justify-center gap-1.5 py-2 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-white/10 text-white shadow-sm font-bold'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CreditCard size={12} />
                    BANK CARD
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('bank'); setValidationError(null); }}
                    className={`flex items-center justify-center gap-1.5 py-2 font-mono text-[10px] font-bold uppercase rounded-md tracking-wider transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'bg-white/10 text-white shadow-sm font-bold'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Landmark size={12} />
                    BANK SOURCE
                  </button>
                </div>

                {/* Validation Banner */}
                {validationError && (
                  <div className="bg-rose-500/15 border border-rose-500/30 p-3 rounded-md text-[10px] font-mono text-rose-300 leading-snug">
                    {validationError}
                  </div>
                )}

                {/* Cyber Card Visual Preview (Only for card method) */}
                {paymentMethod === 'card' && (
                  <div className="relative w-full h-40 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 border border-white/15 p-5 overflow-hidden shadow-xl">
                    <div className="absolute top-4 right-4 text-sky-400 opacity-60">
                      <CreditCard size={28} className="animate-pulse" />
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-sky-500/10 rounded-full blur-xl" />
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl" />
                    
                    <div className="h-full flex flex-col justify-between relative z-10 font-mono">
                      <div className="flex justify-between items-center">
                        <div className="w-8 h-6 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center">
                          <div className="w-4 h-3 border border-amber-500/20 rounded-sm grid grid-cols-2" />
                        </div>
                        <span className="text-[7px] text-sky-400 font-bold uppercase tracking-widest bg-sky-950/80 border border-sky-500/30 px-1.5 py-0.5 rounded">
                          ARCTIC GATEWAY
                        </span>
                      </div>

                      <div className="my-2">
                        <p className="text-[7px] text-white/30 uppercase tracking-widest mb-0.5">CARD CONTAINER NO.</p>
                        <div className="text-sm md:text-base tracking-[0.16em] text-white font-semibold select-none leading-none font-mono">
                          {cardNumber ? formatCardNumberStr(cardNumber) : '•••• •••• •••• ••••'}
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="min-w-0 pr-2">
                          <p className="text-[7px] text-white/30 uppercase tracking-widest">HOLDER IDENTIFICATION</p>
                          <p className="text-[9px] text-slate-200 uppercase tracking-wider font-semibold truncate max-w-[170px]">
                            {cardName || 'AUTHORIZED PARTY'}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[7px] text-white/30 uppercase tracking-widest">EXPIRY</p>
                          <p className="text-[9px] text-slate-200 uppercase tracking-wider font-semibold font-mono">
                            {cardExpiry || 'MM/YY'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Form Details */}
                <form id="payment-gate-form" onSubmit={handleSubmitPayment} className="space-y-4">
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4">
                      {/* Cardholder Input */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                          SIGNATURE SIGN-OFF (CARDHOLDER NAME)
                        </label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="E.G. JOHN NORCHILL"
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 uppercase transition-colors"
                        />
                      </div>

                      {/* Card Number Input */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                          SECURE CHIP PROTOCOL CARD NUMBER
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 transition-colors"
                        />
                      </div>

                      {/* Expiry & CVV Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                            EXP TEMPORAL CODE
                          </label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-center font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                            DECRYPTION CVV
                          </label>
                          <input
                            type="password"
                            required
                            inputMode="numeric"
                            value={cardCvv}
                            onChange={(e) => handleCvvChange(e.target.value)}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-center font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Bank wire option */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                          AUTHORIZED CLEARING ACCOUNT HOLDER NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={bankHolderName}
                          onChange={(e) => setBankHolderName(e.target.value)}
                          placeholder="E.G. JOHN NORCHILL"
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 uppercase transition-colors"
                        />
                      </div>

                      {/* Routing Node Number */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                          SYSTEM TRANSIT ROUTING CODE (9 DIGITS)
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          maxLength={9}
                          value={bankRouting}
                          onChange={(e) => setBankRouting(e.target.value.replace(/\D/g, ''))}
                          placeholder="011000138"
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 transition-colors"
                        />
                      </div>

                      {/* Bank Account ID */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest uppercase text-white/40 block">
                          WIRE DEPOSIT ACCOUNT ID
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          maxLength={16}
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                          placeholder="0982348123"
                          className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-[11px] focus:outline-none focus:border-sky-450 placeholder-white/20 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Pricing Overview mini-card inside checkout */}
                  <div className="bg-white/5 border border-white/10 rounded p-4 text-xs space-y-2 mt-6">
                    <div className="flex justify-between font-mono text-[10px] text-white/50">
                      <span>SECURE LINE TOTAL</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-mono text-[10px] text-emerald-400">
                        <span>PROMO DISCOUNT (20%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[10px] text-white/50">
                      <span>ARCTIC COURIER</span>
                      <span>{isFreeShipping ? 'FREE' : `$${shippingCost}`}</span>
                    </div>
                    <div className="h-px bg-white/10 my-1 font-mono" />
                    <div className="flex justify-between items-center pt-1 font-mono">
                      <span className="text-[9px] text-white uppercase font-bold tracking-widest">TRANSACTION ASSIGNED</span>
                      <span className="text-sm font-extrabold text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Primary Trigger */}
                  <button
                    type="submit"
                    className="w-full py-4 mt-4 bg-sky-400 hover:bg-sky-350 text-slate-950 font-mono text-xs font-bold tracking-[0.2em] rounded uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-sky-400/10 active:scale-[0.98] cursor-pointer"
                  >
                    <Lock size={12} className="text-slate-950" />
                    <span>AUTHORIZE DEPOSIT PAYLOAD</span>
                  </button>
                </form>

              </div>
              
              <div className="p-6 border-t border-white/10 bg-slate-950">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center py-2 text-white/40 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                >
                  &lt; RE-ALLOCATE ITEMS OVERVIEW
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: CONVENTIONAL CART DRAWER VIEW */}
          {checkoutStep === 'cart' && (
            <>
              {/* Content items */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                
                {/* Shipping Milestone Progress */}
                {cartItems.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-center mb-1.5 font-mono text-[10px]">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Truck size={12} className="text-sky-400" />
                        {isFreeShipping ? 'FREE EXPRESS TRANSIT UNLOCKED' : 'ARCTIC COURIER SHARDS'}
                      </span>
                      <span className="text-sky-400 font-bold">
                        {isFreeShipping ? 'FREE' : `$${(shippingThreshold - subtotal).toFixed(0)} TO UNLOCK`}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-16">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-widest font-mono uppercase text-white/70">Cargo holds are empty</h4>
                      <p className="text-[11px] text-white/40 mt-1 max-w-[200px] mx-auto">No products have been allocated for transfer to your gear locker.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="flex gap-4 p-3 rounded-lg border border-white/10 bg-white/5 relative group transition-all hover:bg-white/10">
                        <div className="w-20 h-24 rounded overflow-hidden flex-shrink-0 border border-white/5 bg-slate-900">
                          <img
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-xs font-bold font-mono text-white tracking-wide truncate uppercase">
                                {item.product.name}
                              </h3>
                              <button
                                onClick={() => onRemove(idx)}
                                className="text-white/40 hover:text-red-400 transition-colors p-1 rounded hover:bg-white/5"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <p className="text-[10px] text-white/40 truncate mt-0.5">{item.product.subName}</p>
                            <div className="flex gap-3 text-[10px] font-mono mt-1 text-sky-300">
                              <span>COLOUR: {item.selectedColor}</span>
                              <span>SIZE: {item.selectedSize}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-end mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-white/10 rounded bg-black/40 text-xs font-mono overflow-hidden">
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2.5 font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                className="px-2 py-1 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            
                            <span className="text-xs font-bold font-mono text-white font-semibold flex-shrink-0">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer and calculations */}
              {cartItems.length > 0 && (
                <div className="px-6 py-6 border-t border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
                  
                  {/* Coupon layout */}
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="ENTER PROTOCOL (ARCTIC20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 font-mono text-[10px] focus:outline-none focus:border-sky-400 placeholder-white/30 uppercase"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        APPLY
                      </button>
                    </div>
                    {promoMessage && (
                      <p className="text-[9px] font-mono text-emerald-400 tracking-wide animate-fade-in">{promoMessage}</p>
                    )}
                    {promoError && (
                      <p className="text-[9px] font-mono text-rose-400 tracking-wide animate-fade-in">{promoError}</p>
                    )}
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-2 font-mono text-[11px] text-white/60">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold font-mono">
                        <span>DISCOUNT (20% OFF)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>ARCTIC COURIER EXPRESS</span>
                      <span className="text-white">
                        {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-white/10 my-2 font-mono" />
                    <div className="flex justify-between text-sm font-bold text-white tracking-wide font-mono">
                      <span>TOTAL ASSIGNED</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleInitiateTransaction}
                    className="w-full relative py-4 bg-white hover:bg-sky-400 text-slate-950 hover:text-slate-950 font-mono text-xs font-bold tracking-[0.2em] rounded uppercase transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-white/5 active:scale-[0.98] cursor-pointer"
                  >
                    <span>INITIATE TRANSACTION</span>
                    <ArrowRight size={13} />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-white/30 uppercase tracking-widest text-center mt-2">
                    <ShieldCheck size={10} className="text-emerald-400 animate-pulse" />
                    <span>256-BIT RSA SECURE INTERFACE CONNECTION</span>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
