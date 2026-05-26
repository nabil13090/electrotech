import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { quoteFormSchema } from "@/lib/api/schemas";
import { escapeHtml } from "@/lib/html-escape";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const raw = {
      nom: String(formData.get("nom") ?? ""),
      prenom: String(formData.get("prenom") ?? ""),
      email: String(formData.get("email") ?? ""),
      telephone: String(formData.get("telephone") ?? ""),
      adresse: String(formData.get("adresse") ?? ""),
      codePostal: String(formData.get("codePostal") ?? ""),
      ville: String(formData.get("ville") ?? ""),
      typePrestation: String(formData.get("typePrestation") ?? ""),
      description: String(formData.get("description") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      urgence: String(formData.get("urgence") ?? ""),
    };

    const parsed = quoteFormSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      nom,
      prenom,
      email,
      telephone,
      adresse,
      codePostal,
      ville,
      typePrestation,
      description,
      budget,
      urgence,
    } = parsed.data;

    const file = formData.get("file");
    let attachment: { filename: string; content: Buffer } | null = null;

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: "Fichier trop volumineux (max 5 Mo)" },
          { status: 400 }
        );
      }
      const bytes = await file.arrayBuffer();
      attachment = {
        filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
        content: Buffer.from(bytes),
      };
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Email sending disabled.");
      return NextResponse.json(
        { message: "Demande de devis reçue (email non configuré)" },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeNom = escapeHtml(nom);
    const safePrenom = escapeHtml(prenom);
    const safeEmail = escapeHtml(email);
    const safeTel = escapeHtml(telephone);
    const safeAdresse = escapeHtml(adresse);
    const safeCp = escapeHtml(codePostal);
    const safeVille = escapeHtml(ville);
    const safeType = escapeHtml(typePrestation);
    const safeBudget = escapeHtml(budget || "Non spécifié");
    const safeUrgence = escapeHtml(urgence || "Non spécifiée");
    const safeDesc = escapeHtml(description).replace(/\n/g, "<br/>");

    const emailHtml = `
      <h2>Nouvelle demande de devis - Electrotech</h2>
      <h3>Informations client</h3>
      <ul>
        <li><strong>Nom:</strong> ${safeNom} ${safePrenom}</li>
        <li><strong>Email:</strong> ${safeEmail}</li>
        <li><strong>Téléphone:</strong> ${safeTel}</li>
        <li><strong>Adresse:</strong> ${safeAdresse}, ${safeCp} ${safeVille}</li>
      </ul>
      <h3>Détails de la demande</h3>
      <ul>
        <li><strong>Type de prestation:</strong> ${safeType}</li>
        <li><strong>Budget:</strong> ${safeBudget}</li>
        <li><strong>Urgence:</strong> ${safeUrgence}</li>
        <li><strong>Description:</strong><br/>${safeDesc}</li>
      </ul>
    `;

    const attachments = attachment ? [attachment] : [];

    await transporter.sendMail({
      from: process.env.SMTP_FROM || email,
      to: process.env.CONTACT_EMAIL || "contact@electrotech13.fr",
      replyTo: email,
      subject: `Nouvelle demande de devis - ${nom} ${prenom}`,
      html: emailHtml,
      attachments,
    });

    const confirmationHtml = `
      <h2>Merci pour votre demande de devis !</h2>
      <p>Bonjour ${safePrenom},</p>
      <p>Nous avons bien reçu votre demande de devis pour : <strong>${safeType}</strong></p>
      <p>Notre équipe va étudier votre demande et vous contactera dans les plus brefs délais (sous 24h).</p>
      <p>En cas d'urgence, n'hésitez pas à nous appeler au <strong>04 91 87 11 08</strong>.</p>
      <p>Cordialement,<br/>L'équipe Electrotech</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@electrotech13.fr",
      to: email,
      subject: "Confirmation de votre demande de devis - Electrotech",
      html: confirmationHtml,
    });

    return NextResponse.json(
      { message: "Demande de devis envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending quote request:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de la demande. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
