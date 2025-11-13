const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS, TO_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

exports.handler = async (event) => {
  const payload = JSON.parse(event.body).client_payload;
  const { form, name, email, plan, message } = payload;

  const subject = form === 'paymentForm' ? 'Novo Pagamento IPTV' : 'Nova Mensagem de Suporte';
  const html = `
    <h2>${subject}</h2>
    <p><strong>Nome:</strong> ${name || 'Não informado'}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    ${plan ? `<p><strong>Plano:</strong> ${plan}</p>` : ''}
    ${message ? `<p><strong>Mensagem:</strong> ${message}</p>` : ''}
  `;

  await transporter.sendMail({
    from: EMAIL_USER,
    to: TO_EMAIL,
    subject,
    html
  });

  return { statusCode: 200 };
};
