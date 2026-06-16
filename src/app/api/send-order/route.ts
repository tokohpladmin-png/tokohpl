import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tokohpl.admin@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function formatIDR(amount: number | null | undefined): string {
  if (amount == null) return '—';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function buildEmailHtml(order: any): string {
  const itemRows = order.items.map((item: any) => {
    const total = item.product.price * item.quantity;
    return `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#737373;font-size:12px;">
          ${item.product.brand} · ${item.product.code}<br>
          <span style="color:#111;font-weight:600;">${item.product.name}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;text-align:center;color:#737373;font-size:12px;">${item.quantity} lembar</td>
        <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:600;font-size:13px;">${formatIDR(total)}</td>
      </tr>`;
  }).join('');

  const deadline = new Date(order.deadlineIso).toLocaleString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;background:#fff;">

  <!-- Header -->
  <div style="background:#111111;padding:28px 32px;">
    <div style="font-size:20px;font-weight:300;letter-spacing:-0.04em;color:#fff;">
      toko<span style="font-weight:800;">hpl</span><span style="color:#CC4E2A;">.com</span>
    </div>
    <div style="margin-top:8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">
      Pesanan Baru Masuk
    </div>
  </div>

  <!-- Order ID banner -->
  <div style="background:#CC4E2A;padding:16px 32px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <div style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:4px;">Nomor Pesanan</div>
      <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;">${order.id}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:4px;">Tanggal</div>
      <div style="font-size:13px;font-weight:600;color:#fff;">${new Date(order.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>
  </div>

  <div style="padding:32px;">

    <!-- Customer -->
    <div style="margin-bottom:24px;border:1px solid #e5e5e5;padding:20px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#737373;margin-bottom:12px;">Informasi Pelanggan</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:4px 0;color:#737373;width:35%;">Nama</td><td style="padding:4px 0;font-weight:600;color:#111;">${order.customer.fullName}</td></tr>
        <tr><td style="padding:4px 0;color:#737373;">WhatsApp</td><td style="padding:4px 0;color:#111;">${order.customer.phone}</td></tr>
        <tr><td style="padding:4px 0;color:#737373;">Email</td><td style="padding:4px 0;color:#111;">${order.customer.email}</td></tr>
        <tr><td style="padding:4px 0;color:#737373;">Alamat</td><td style="padding:4px 0;color:#111;">${order.customer.address}, ${order.customer.city}, ${order.customer.province} ${order.customer.postalCode}</td></tr>
        ${order.customer.notes ? `<tr><td style="padding:4px 0;color:#737373;">Catatan</td><td style="padding:4px 0;color:#111;font-style:italic;">${order.customer.notes}</td></tr>` : ''}
      </table>
    </div>

    <!-- Items -->
    <div style="margin-bottom:24px;border:1px solid #e5e5e5;padding:20px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#737373;margin-bottom:12px;">Daftar Produk</div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="border-bottom:2px solid #111;">
            <th style="text-align:left;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#737373;padding-bottom:8px;">Produk</th>
            <th style="text-align:center;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#737373;padding-bottom:8px;">Qty</th>
            <th style="text-align:right;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#737373;padding-bottom:8px;">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>
      <!-- Totals -->
      <div style="margin-top:16px;border-top:1px solid #e5e5e5;padding-top:16px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:#737373;margin-bottom:6px;">
          <span>Subtotal</span><span>${formatIDR(order.subtotal)}</span>
        </div>
        ${order.discountAmount > 0 ? `
        <div style="display:flex;justify-content:space-between;font-size:12px;color:#CC4E2A;margin-bottom:6px;">
          <span>Diskon ${order.couponCode ? `(${order.couponCode})` : ''}</span>
          <span>− ${formatIDR(order.discountAmount)}</span>
        </div>` : ''}
        <div style="display:flex;justify-content:space-between;font-size:12px;color:#737373;margin-bottom:12px;">
          <span>Ongkos Kirim</span>
          <span>${order.shippingFee === 0 ? 'Gratis' : formatIDR(order.shippingFee)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:#111;border-top:1px solid #111;padding-top:12px;">
          <span>Total Pembayaran</span>
          <span style="color:#CC4E2A;">${formatIDR(order.orderTotal)}</span>
        </div>
      </div>
    </div>

    <!-- Payment deadline -->
    <div style="background:#fef3c7;border:1px solid #fcd34d;padding:16px 20px;margin-bottom:24px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#92400e;margin-bottom:6px;">Batas Waktu Pembayaran</div>
      <div style="font-size:13px;font-weight:600;color:#111;">${deadline}</div>
      <div style="font-size:12px;color:#78350f;margin-top:4px;">Pesanan akan dibatalkan otomatis jika belum dibayar.</div>
    </div>

    <!-- Action -->
    <div style="background:#f5f5f5;border:1px solid #e5e5e5;padding:16px 20px;text-align:center;">
      <div style="font-size:12px;color:#737373;margin-bottom:12px;">Hubungi pelanggan via WhatsApp untuk konfirmasi pesanan:</div>
      <a href="https://wa.me/${order.customer.phone.replace(/\D/g,'').replace(/^0/,'62')}?text=${encodeURIComponent(`Halo ${order.customer.fullName}, pesanan Anda di TokoHPL dengan nomor ${order.id} telah kami terima. Mohon segera melakukan pembayaran sebelum ${deadline}. Terima kasih.`)}"
        style="display:inline-block;background:#111;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:12px 24px;text-decoration:none;">
        Balas via WhatsApp
      </a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background:#111;padding:20px 32px;text-align:center;">
    <div style="font-size:11px;color:#525252;">© ${new Date().getFullYear()} TokoHPL · CV. Varindo Forma Hutama</div>
    <div style="font-size:10px;color:#404040;margin-top:4px;">tokohpl.admin@gmail.com · 0816 1345 224</div>
  </div>

</div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    await transporter.sendMail({
      from: '"TokoHPL" <tokohpl.admin@gmail.com>',
      to: 'tokohpl.admin@gmail.com',
      subject: `[Pesanan Baru] ${order.id} — ${order.customer.fullName} — ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(order.orderTotal)}`,
      html: buildEmailHtml(order),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
