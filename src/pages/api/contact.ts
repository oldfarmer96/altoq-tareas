import type { APIRoute } from "astro";
import { sendEmail, emailTemplates } from "../../lib/email";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const {
      tipo,
      materia,
      descripcion,
      tieneArchivos,
      linkArchivos,
      fechaEntrega,
      extension,
      extensionCustom,
      esUrgente,
      nombre,
      email,
      whatsapp,
    } = data;

    if (!nombre || !email || !tipo || !materia || !descripcion) {
      return new Response(
        JSON.stringify({ ok: false, error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const businessEmail = import.meta.env.BUSINESS_EMAIL || import.meta.env.SMTP_USER;

    const { subject: businessSubject, html: businessHtml } = emailTemplates.businessNotification({
      tipo,
      materia,
      descripcion,
      nombre,
      email,
      whatsapp,
      linkArchivos: tieneArchivos !== "no" ? linkArchivos : undefined,
      fechaEntrega,
      extension,
      extensionCustom: extension === "Otro" ? extensionCustom : undefined,
      esUrgente,
    });

    await sendEmail({
      to: businessEmail,
      subject: businessSubject,
      html: businessHtml,
    });

    const { subject: clientSubject, html: clientHtml } = emailTemplates.clientConfirmation({
      nombre,
      tipo,
      materia,
      fechaEntrega,
      esUrgente,
    });

    await sendEmail({
      to: email,
      subject: clientSubject,
      html: clientHtml,
    });

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Error al procesar la solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};