import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/#Inicio',
      },
    });
  }

  try {
    await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>', // temporal
      to: ['soporte.arcadia.studio@gmail.com'],
      subject: 'Nuevo contacto',
      html: `
        <div style="font-family: sans-serif">
          <h2>Nuevo contacto</h2>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    // 🔥 REDIRECCIÓN DIRECTA AL HERO
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/#Inicio',
      },
    });

  } catch (error) {
    console.error(error);

    // incluso en error, volvemos al inicio
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/#Inicio',
      },
    });
  }
}

