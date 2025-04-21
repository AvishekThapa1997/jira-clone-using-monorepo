import crypto from "crypto";
/**
 * Generates a random salt for password hashing.
 * @returns {string} A hexadecimal string representing the salt.
 */
export function generatePasswordSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Hashes a password using the provided salt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export function hashPassword(
  password: string,
  salt: string = generatePasswordSalt()
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword.toString("hex"));
      }
    });
  });
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @param {string} plainPassword - The plain text password to verify.
 * @param {string} salt - The salt used for hashing the original password.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
 */
export async function comparePassword(
  hashedPassword: string,
  plainPassword: string,
  salt: string
): Promise<boolean> {
  const hashedPlainPassword = await hashPassword(plainPassword, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hashedPlainPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}
