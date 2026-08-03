import { ResumeItem } from '../types';

/**
 * Shelby Protocol Storage Helper
 * Manages local storage persistence for resumes uploaded by connected wallets.
 */

const STORAGE_KEY = 'meadow_user_resumes_v1';

export function getStoredResumes(): ResumeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load resumes from storage:', e);
    return [];
  }
}

export function saveStoredResumes(resumes: ResumeItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (e) {
    console.error('Failed to save resumes to storage:', e);
  }
}

export async function generateShelbyBlobId(file: File): Promise<{ blobId: string; txHash: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  const blobId = `0xshelby_${hexHash.substring(0, 18)}`;
  
  const randomTxArray = Array.from({ length: 32 }, () => Math.floor(Math.random() * 256));
  const txHash = `0x${randomTxArray.map(b => b.toString(16).padStart(2, '0')).join('')}`;

  return { blobId, txHash };
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
