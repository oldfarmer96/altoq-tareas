import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT || "587"),
  secure: import.meta.env.SMTP_SECURE === "true",
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<void> {
  await transporter.sendMail({
    from: `"AltoQ.Tareas" <${import.meta.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

export const emailTemplates = {
  businessNotification: (data: {
    tipo: string;
    materia: string;
    descripcion: string;
    nombre: string;
    email: string;
    whatsapp?: string;
    linkArchivos?: string;
    fechaEntrega: string;
    extension: string;
    extensionCustom?: string;
    esUrgente: boolean;
  }) => ({
    subject: `Nueva solicitud: ${data.tipo} - ${data.materia} | ${data.nombre}${data.esUrgente ? " [URGENTE]" : ""}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background-color: #F8F6F1; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background-color: #0A2463; padding: 24px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .body { padding: 32px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1C1C1E; }
    .badge { display: inline-block; background: #E8A030; color: #0A2463; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .urgent-badge { display: inline-block; background: #DC2626; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-left: 8px; }
    .footer { background-color: #F8F6F1; padding: 16px 32px; text-align: center; font-size: 12px; color: #6B7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Solicitud - AltoQ.Tareas</h1>
    </div>
    <div class="body">
      <p>
        <span class="badge">${data.tipo}</span>
        ${data.esUrgente ? "<span class=\"urgent-badge\">⚡ URGENTE - 24h</span>" : ""}
      </p>
      <div class="field">
        <div class="label">Cliente</div>
        <div class="value"><strong>${data.nombre}</strong> (${data.email})</div>
      </div>
      ${data.whatsapp ? `<div class="field"><div class="label">WhatsApp</div><div class="value">${data.whatsapp}</div></div>` : ""}
      <div class="field">
        <div class="label">Materia</div>
        <div class="value">${data.materia}</div>
      </div>
      <div class="field">
        <div class="label">Descripción</div>
        <div class="value">${data.descripcion}</div>
      </div>
      ${data.linkArchivos ? `<div class="field"><div class="label">Archivos</div><div class="value"><a href="${data.linkArchivos}">${data.linkArchivos}</a></div></div>` : ""}
      <div class="field">
        <div class="label">Fecha de entrega</div>
        <div class="value">${data.fechaEntrega} | ${data.extension}${data.extensionCustom ? ` - ${data.extensionCustom}` : ""}</div>
      </div>
      ${data.esUrgente ? `<div class="field" style="background: #FEE2E2; padding: 12px; border-radius: 8px; border-left: 4px solid #DC2626;"><div class="label" style="color: #DC2626;">⚡ TAREA URGENTE</div><div class="value">El cliente necesita la tarea en menos de 24 horas. Considerar recargo por urgencia.</div></div>` : ""}
    </div>
    <div class="footer">
      AltoQ.Tareas - Servicio de tareas universitarias en Perú
    </div>
  </div>
</body>
</html>
    `,
  }),

  clientConfirmation: (data: {
    nombre: string;
    tipo: string;
    materia: string;
    fechaEntrega: string;
    esUrgente: boolean;
  }) => ({
    subject: "✅ Recibimos tu solicitud - AltoQ.Tareas",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', system-ui, sans-serif; background-color: #F8F6F1; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background-color: #0A2463; padding: 24px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .check { font-size: 48px; text-align: center; margin: 24px 0; }
    .body { padding: 32px; }
    .body h2 { color: #0A2463; margin-top: 0; }
    .body p { color: #1C1C1E; line-height: 1.6; }
    .info-box { background: #F8F6F1; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .urgent-box { background: #FEF3C7; border: 2px solid #E8A030; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .urgent-box .calendar { display: inline-block; background: #E8A030; color: #0A2463; padding: 8px 12px; border-radius: 6px; font-weight: 700; text-align: center; margin-right: 12px; }
    .urgent-box .calendar .day { font-size: 20px; display: block; }
    .urgent-box .calendar .month { font-size: 10px; text-transform: uppercase; }
    .urgent-text { color: #92400E; font-weight: 600; }
    .footer { background-color: #F8F6F1; padding: 16px 32px; text-align: center; font-size: 12px; color: #6B7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AltoQ.Tareas</h1>
    </div>
    <div class="check">✅</div>
    <div class="body">
      <h2>¡Hola ${data.nombre}!</h2>
      <p>Hemos recibido tu solicitud correctamente. Nuestro equipo la revisará y te enviaremos una cotización personalizada <strong>en menos de 2 horas</strong>.</p>
      ${data.esUrgente ? `
      <div class="urgent-box">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="calendar">
            <span class="day">⚡</span>
            <span class="month">urgente</span>
          </div>
          <div>
            <p class="urgent-text" style="margin: 0;">Tu tarea será entregada en menos de 24 horas</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #92400E;">Sabemos que a veces todo se acumula. ¡Tranquilo, te ayudamos!</p>
          </div>
        </div>
      </div>
      ` : `
      <div class="info-box">
        <p style="margin: 0;"><strong>Resumen de tu solicitud:</strong></p>
        <p style="margin: 8px 0 0 0;">📋 <strong>${data.tipo}</strong> - ${data.materia}</p>
        <p style="margin: 4px 0 0 0;">📅 Entrega: ${data.fechaEntrega}</p>
      </div>
      `}
      <p>Revisa tu correo en las próximas horas. No olvides revisar la carpeta de spam.</p>
      <p>¿Tienes urgencia? Escríbenos por WhatsApp para atención prioritaria.</p>
    </div>
    <div class="footer">
      AltoQ.Tareas - Tu aliado académico en Perú 🇵🇪
    </div>
  </div>
</body>
</html>
    `,
  }),
};