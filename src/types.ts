export interface ResumeItem {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  fileDataUrl?: string;
  version: string;
  uploadedAt: string;
  timestamp: number;
  isPublic: boolean;
  shelbyBlobId: string;
  aptosTxHash: string;
  publicUrl: string;
  authorAddress: string;
  summary?: string;
  skills?: string[];
  certifications?: string[];
}

export interface ShelbyBlobMetadata {
  blobId: string;
  size: number;
  contentType: string;
  storageProvider: string;
  aptosTxHash: string;
  verifiedAt: string;
}

export type ViewTab = 'landing' | 'dashboard' | 'upload' | 'view-public';
