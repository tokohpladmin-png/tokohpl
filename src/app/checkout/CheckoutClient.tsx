'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatIDR } from '@/lib/utils';

const PROVINCES = [
  'DKI Jakarta',
  'Banten',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Bali',
];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({
    fullName: '', phone: '', email: '', province: '',
    city: '', address: '', postalCode: '', notes: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi';
    if (!form.phone.trim()) e.phone = 'Nomor WhatsApp wajib diisi';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid';
    if (!form.province) e.province = 'Provinsi wajib dipilih';
    if (!form.city.trim()) e.city = 'Kota wajib diisi';
    if (!form.address.trim()) e.address = 'Alamat lengkap wajib diisi';
    if (!form.postalCode.trim()) e.postalCode = 'Kode pos wajib diisi';
    return e;
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const id = `ORD-${Date.now()}`;
    const order = {
      orderId: id,
      timestamp: new Date().toISOString(),
      customer: { ...form },
      items: items.map((i) => ({
        code: i.product.code,
        name: i.product.name,
        brand: i.product.brand,
        quantity: i.quantity,
        unitPrice: i.product.price,
        subtotal: typeof i.product.price === 'number' ? i.product.price * i.quantity : null,
      })),
      subtotal: subtotal(),
      shippingFee: 0,
      grandTotal: subtotal(),
    };

    // Store order (future: integrate with API/WhatsApp/Google Sheets)
    try {
      localStorage.setItem(`order_${id}`, JSON.stringify(order));
    } catch {}

    setOrderId(id);
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="shell py-20 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-hpl-ink flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14l8 8L24 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="label mb-3">Pesanan Berhasil</p>
        <h1 className="display text-hpl-ink text-4xl sm:text-5xl mb-4">Terima Kasih!</h1>
        <p className="text-[14px] leading-7 text-hpl-500 mb-2">
          Pesanan Anda telah kami terima. Nomor order: <span className="font-semibold text-hpl-ink">{orderId}</span>
        </p>
        <p className="text-[13px] leading-7 text-hpl-500 mb-8">
          Tim kami akan menghubungi Anda via WhatsApp ({form.phone}) dalam 1×24 jam untuk konfirmasi pesanan.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={`https://wa.me/6281288885224?text=${encodeURIComponent(`Halo, saya baru saja melakukan pemesanan dengan nomor ${orderId}. Mohon konfirmasinya. Terima kasih.`)}`}
            target="_blank" rel="noreferrer"
            className="btn-ink"
          >
            Konfirmasi via WhatsApp
          </a>
          <Link href="/products" className="btn-ghost">Lanjut Belanja</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-20 text-center">
        <p className="label mb-4">Checkout</p>
        <h1 className="display text-hpl-ink text-4xl mb-4">Keranjang Kosong</h1>
        <p className="text-[13px] text-hpl-500 mb-8">Tambahkan produk ke keranjang sebelum checkout.</p>
        <Link href="/products" className="btn-ink">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-hpl-line bg-hpl-50">
        <div className="shell py-8">
          <p className="label mb-2">Pemesanan</p>
          <h1 className="display text-hpl-ink text-4xl sm:text-5xl">Checkout</h1>
          <p className="mt-2 text-[12px] text-hpl-500">Pengiriman gratis ke Jawa & Bali</p>
        </div>
      </div>

      <div className="shell py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">

          {/* Form */}
          <div className="space-y-8">

            {/* Customer info */}
            <fieldset className="border border-hpl-line">
              <legend className="sr-only">Informasi Pelanggan</legend>
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Informasi Pelanggan</p>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-5">
                <FormField label="Nama Lengkap *" error={errors.fullName}>
                  <input value={form.fullName} onChange={set('fullName')} placeholder="Nama sesuai KTP" className={fieldClass(errors.fullName)}/>
                </FormField>
                <FormField label="No. WhatsApp *" error={errors.phone}>
                  <input value={form.phone} onChange={set('phone')} placeholder="08xxxxxxxxxx" className={fieldClass(errors.phone)}/>
                </FormField>
                <FormField label="Email *" error={errors.email} className="sm:col-span-2">
                  <input type="email" value={form.email} onChange={set('email')} placeholder="nama@email.com" className={fieldClass(errors.email)}/>
                </FormField>
              </div>
            </fieldset>

            {/* Shipping */}
            <fieldset className="border border-hpl-line">
              <legend className="sr-only">Informasi Pengiriman</legend>
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Alamat Pengiriman</p>
                <p className="text-[11px] text-hpl-500 mt-1">Gratis ongkir untuk Jawa & Bali</p>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-5">
                <FormField label="Provinsi *" error={errors.province}>
                  <div className="relative">
                    <select value={form.province} onChange={set('province')} className={`${fieldClass(errors.province)} appearance-none pr-9`}>
                      <option value="">Pilih Provinsi</option>
                      {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-hpl-400">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </FormField>
                <FormField label="Kota / Kabupaten *" error={errors.city}>
                  <input value={form.city} onChange={set('city')} placeholder="Nama kota" className={fieldClass(errors.city)}/>
                </FormField>
                <FormField label="Alamat Lengkap *" error={errors.address} className="sm:col-span-2">
                  <textarea value={form.address} onChange={set('address')} rows={3}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    className={`${fieldClass(errors.address)} h-auto py-3 resize-none`}/>
                </FormField>
                <FormField label="Kode Pos *" error={errors.postalCode}>
                  <input value={form.postalCode} onChange={set('postalCode')} placeholder="12345" className={fieldClass(errors.postalCode)}/>
                </FormField>
                <FormField label="Catatan Pengiriman" error={undefined}>
                  <input value={form.notes} onChange={set('notes')} placeholder="Contoh: Titip satpam" className="field"/>
                </FormField>
              </div>
            </fieldset>

            <div className="border border-hpl-line bg-hpl-50 px-5 py-4">
              <p className="text-[12px] text-hpl-600">
                <span className="font-semibold text-hpl-ink">Pengiriman hanya tersedia</span> untuk Jawa dan Bali. Untuk area lain, hubungi kami via WhatsApp.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="border border-hpl-line">
              <div className="border-b border-hpl-line px-6 py-4 bg-hpl-50">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-hpl-700">Ringkasan Pesanan</p>
              </div>
              <ul className="divide-y divide-hpl-line max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.product.code} className="px-6 py-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.14em] uppercase text-hpl-500">{item.product.code}</p>
                      <p className="text-[12px] font-medium text-hpl-ink truncate">{item.product.name}</p>
                      <p className="text-[11px] text-hpl-500">×{item.quantity}</p>
                    </div>
                    <span className="text-[13px] font-semibold text-hpl-ink shrink-0">
                      {formatIDR(typeof item.product.price === 'number' ? item.product.price * item.quantity : null)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-hpl-line p-6 space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Subtotal</span>
                  <span className="font-semibold text-hpl-ink">{formatIDR(subtotal())}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-hpl-600">Ongkir</span>
                  <span className="font-semibold text-hpl-gold">Gratis</span>
                </div>
                <div className="border-t border-hpl-line pt-3 flex justify-between">
                  <span className="text-[13px] font-semibold text-hpl-ink">Total</span>
                  <span className="text-[18px] font-semibold text-hpl-ink">{formatIDR(subtotal())}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn-ink w-full justify-center py-4 text-[12px]"
            >
              Konfirmasi Pesanan
            </button>
            <p className="text-[11px] text-center text-hpl-500">
              Dengan memesan, Anda menyetujui syarat dan ketentuan kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function fieldClass(err?: string) {
  return `field ${err ? 'border-red-400 focus:border-red-600' : ''}`;
}

function FormField({ label, error, children, className = '' }: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block">
        <span className="label text-hpl-600 mb-2 block">{label}</span>
        {children}
      </label>
      {error && <p className="mt-1.5 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
