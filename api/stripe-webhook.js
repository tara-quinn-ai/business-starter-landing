const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const getRawBody = require('raw-body');

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.fastmail.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get customer email
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'there';
    const amountPaid = (session.amount_total / 100).toFixed(2);

    if (customerEmail) {
      try {
        // Send confirmation email
        await transporter.sendMail({
          from: '"Tara Quinn" <taraquinnai@fastmail.com>',
          to: customerEmail,
          subject: '🎉 Your OpenClaw Business Starter is Ready!',
          text: `Hi ${customerName},

Thank you for purchasing OpenClaw Business Starter!

Your payment of $${amountPaid} has been confirmed. 

DOWNLOAD YOUR PACKAGE:
https://taraquinn.ai/download.html

QUICK START (< 5 minutes):

1. Download and extract:
   cd ~/Downloads
   tar -xzf openclaw-business-starter.tar.gz
   cd openclaw-business-starter

2. Run setup:
   ./scripts/setup-foundation.sh

3. Restart OpenClaw:
   openclaw gateway restart

That's it! Your bot now has the autonomous business foundation.

WHAT'S INCLUDED:
• PARA memory system (Projects, Areas, Resources, Archive)
• Daily rhythm cron jobs (morning review + nightly consolidation)
• Security rules & decision frameworks
• Coding workflow templates
• Identity files (SOUL.md, AGENTS.md, USER.md)

NEED HELP?
• Website: https://taraquinn.ai
• X/Twitter: https://x.com/TaraQuinnAI
• Docs: https://docs.openclaw.ai
• GitHub: https://github.com/tara-quinn-ai/openclaw-business-starter
• Email: taraquinnai@fastmail.com

Built by Tara Quinn, autonomous AI entrepreneur.
MIT License — Use it, modify it, build on it.

Cheers,
Tara

P.S. — ClawHub install will be available after March 3rd. Until then, use the direct download above.`,
          html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 28px; }
    .button { display: inline-block; background: #51cf66; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .code { background: #2c3e50; color: #51cf66; padding: 15px; border-radius: 6px; font-family: monospace; overflow-x: auto; margin: 15px 0; }
    .code code { display: block; margin: 5px 0; }
    .note { background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
    <h1>Your OpenClaw Business Starter is Ready!</h1>
  </div>

  <p>Hi ${customerName},</p>
  <p>Thank you for purchasing OpenClaw Business Starter! Your payment of <strong>$${amountPaid}</strong> has been confirmed.</p>

  <div style="text-align: center;">
    <a href="https://taraquinn.ai/download.html" class="button">⬇️ Download Your Package</a>
  </div>

  <h2 style="color: #667eea;">Quick Start (< 5 Minutes)</h2>

  <div class="code">
    <code># 1. Download and extract</code>
    <code>cd ~/Downloads</code>
    <code>tar -xzf openclaw-business-starter.tar.gz</code>
    <code>cd openclaw-business-starter</code>
    <code></code>
    <code># 2. Run setup</code>
    <code>./scripts/setup-foundation.sh</code>
    <code></code>
    <code># 3. Restart OpenClaw</code>
    <code>openclaw gateway restart</code>
  </div>

  <p>That's it! Your bot now has the autonomous business foundation.</p>

  <div class="note">
    <strong>📦 ClawHub Publishing</strong><br>
    ClawHub install will be available after March 3rd. Until then, use the direct download link above.
  </div>

  <h3 style="color: #667eea;">What's Included:</h3>
  <ul>
    <li>PARA memory system (Projects, Areas, Resources, Archive)</li>
    <li>Daily rhythm cron jobs (morning review + nightly consolidation)</li>
    <li>Security rules & decision frameworks</li>
    <li>Coding workflow templates</li>
    <li>Identity files (SOUL.md, AGENTS.md, USER.md)</li>
  </ul>

  <h3 style="color: #667eea;">Need Help?</h3>
  <p>
    <a href="https://taraquinn.ai">Website</a> •
    <a href="https://x.com/TaraQuinnAI">X/Twitter</a> •
    <a href="https://docs.openclaw.ai">Docs</a> •
    <a href="https://github.com/tara-quinn-ai/openclaw-business-starter">GitHub</a> •
    <a href="mailto:taraquinnai@fastmail.com">Email</a>
  </p>

  <div class="footer">
    <p>Built by <a href="https://taraquinn.ai">Tara Quinn</a>, autonomous AI entrepreneur.</p>
    <p>MIT License — Use it, modify it, build on it.</p>
  </div>
</body>
</html>`
        });

        console.log(`Confirmation email sent to ${customerEmail}`);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the webhook if email fails
      }
    }
  }

  res.json({ received: true });
};
