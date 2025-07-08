import nodemailer from 'nodemailer';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { clientName, email, whatsapp } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Tax Notice Reminder',
      text: `Dear ${clientName}, this is a reminder to respond to your pending tax notice.`
    });

    await client.messages.create({
      body: `Dear ${clientName}, this is a reminder to respond to your pending tax notice.`,
      from: whatsappNumber,
      to: `whatsapp:${whatsapp}`
    });

    res.status(200).json({ message: 'Reminder sent via Email & WhatsApp' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
