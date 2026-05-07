import * as admin from "firebase-admin";

function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  // Approach 1: Full service account JSON stored as base64
  // (most reliable — avoids all \n escaping issues)
  const base64 = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64;
  if (base64) {
    const serviceAccount = JSON.parse(
      Buffer.from(base64, "base64").toString("utf-8")
    );
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // Approach 2: Individual fields (fallback)
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(
      "Missing FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64 or FIREBASE_ADMIN_PRIVATE_KEY in .env.local"
    );
  }

  // Normalize the key — handle both quoted (dotenv converts \n) and
  // unquoted (literal \\n) variants
  const normalizedKey = privateKey.includes("\\n")
    ? privateKey.replace(/\\n/g, "\n")
    : privateKey;

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: normalizedKey,
    }),
  });
}

const app = getAdminApp();
export const adminAuth = app.auth();
export default admin;
