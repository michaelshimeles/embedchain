import CryptoJS from "crypto-js";

export function encryptText(text: string, secretKey: string) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}
