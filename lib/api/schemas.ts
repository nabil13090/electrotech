// ✅ AJOUTÉ SEO/SEC : schémas Zod partagés pour les routes API
import { z } from "zod";

export const contactFormSchema = z.object({
  nom: z.string().min(1).max(120).trim(),
  email: z.string().email().max(254),
  telephone: z.string().max(40).optional().or(z.literal("")),
  sujet: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(5000).trim(),
});

export const quoteFormSchema = z.object({
  nom: z.string().min(1).max(80).trim(),
  prenom: z.string().min(1).max(80).trim(),
  email: z.string().email().max(254),
  telephone: z.string().min(1).max(40).trim(),
  adresse: z.string().min(1).max(200).trim(),
  codePostal: z.string().min(1).max(12).trim(),
  ville: z.string().min(1).max(100).trim(),
  typePrestation: z.string().min(1).max(200).trim(),
  description: z.string().min(1).max(8000).trim(),
  budget: z.string().max(120).optional().or(z.literal("")),
  urgence: z.string().max(80).optional().or(z.literal("")),
});
