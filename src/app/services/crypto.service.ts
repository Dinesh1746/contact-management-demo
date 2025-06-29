import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private SECRET_KEY = 'my-strong-secret-key'; // Move to environment for better security

  encryptData(data: any): string {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
    } catch (e) {
      console.error('Encryption error:', e);
      return '';
    }
  }

  decryptData(cipherText: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  }
}
