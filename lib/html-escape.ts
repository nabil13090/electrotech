// ✅ AJOUTÉ SEO/SEC : échappement HTML pour corps d’e-mails (évite injection si champs malveillants)

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
