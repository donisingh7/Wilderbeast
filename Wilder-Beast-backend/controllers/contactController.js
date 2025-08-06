import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const contact = await Contact.create({ name, email, message });

    const transporter = nodemailer.createTransport({ /* SMTP or SendGrid creds */ });
    await transporter.sendMail({
      from: '"WilderBeast Site" <no-reply@wilderbeast.in>',
      to:   'info@wilderbeast.in',
      subject: `New Contact Form Submission`,
      html: `<p><strong>${name}</strong> (${email}) says:</p>
             <p>${message}</p>`
    });

    res.status(201).json({ message: 'Thank you—we’ve received your message!' });

  } catch (err) {
    next(err);
  }
};
