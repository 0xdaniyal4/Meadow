import { ResumeItem } from '../types';

/**
 * Shelby Protocol SDK Interface Helper
 * Handles cryptographic hashing, blob generation, and Aptos storage submission.
 */

export const INITIAL_DEMO_RESUMES: ResumeItem[] = [
  {
    id: 'res-1',
    title: 'Senior Product Designer - V2.1',
    fileName: 'alex_smith_resume_v2.1.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    version: 'v2.1',
    uploadedAt: 'Oct 24, 2023',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 120,
    isPublic: true,
    shelbyBlobId: '0xshelby_71c89f2a401b3d8e90a',
    aptosTxHash: '0x94f812e987ac2b6f103984d7201a3512bce987f61204',
    publicUrl: `${window.location.origin}?res=res-1`,
    authorAddress: '0x71C...4f2',
    summary: 'Senior Product Designer with 6+ years experience building Web3 interfaces, design systems, and user-centric dApps.',
    skills: ['Figma', 'Design Systems', 'React', 'Tailwind CSS', 'Aptos Move', 'UI/UX Design'],
    certifications: ['Aptos Certified Developer 2023', 'Web3 UX Specialist']
  },
  {
    id: 'res-2',
    title: 'UX Researcher - Web3 Focus',
    fileName: 'ux_research_web3_focus.pdf',
    fileSize: '1.8 MB',
    fileType: 'application/pdf',
    version: 'v1.4',
    uploadedAt: 'Aug 12, 2023',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 190,
    isPublic: false,
    shelbyBlobId: '0xshelby_82d90a1b3c4d5e6f7a',
    aptosTxHash: '0x321a56bc890de1234567890abcdef1234567890a',
    publicUrl: `${window.location.origin}?res=res-2`,
    authorAddress: '0x71C...4f2',
    summary: 'UX Researcher conducting qualitative and quantitative user testing for decentralized governance & wallet onboarding.',
    skills: ['User Interviews', 'Usability Testing', 'Quantitative Analysis', 'Information Architecture'],
    certifications: ['Nielsen Norman Group UX Master']
  },
  {
    id: 'res-3',
    title: 'Lead Designer - Legacy',
    fileName: 'lead_designer_legacy_2022.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    version: 'v1.0',
    uploadedAt: 'Jan 05, 2023',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 400,
    isPublic: false,
    shelbyBlobId: '0xshelby_93e01b2c3d4e5f6a7b',
    aptosTxHash: '0x789012abcdef3456789012abcdef3456789012ab',
    publicUrl: `${window.location.origin}?res=res-3`,
    authorAddress: '0x71C...4f2',
    summary: 'Lead Designer managing cross-functional creative teams for fintech and enterprise SaaS applications.',
    skills: ['Team Leadership', 'Product Strategy', 'Brand Identity', 'Prototyping'],
    certifications: ['Certified Scrum Product Owner']
  }
];

export async function generateShelbyBlobId(file: File): Promise<{ blobId: string; txHash: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  const blobId = `0xshelby_${hexHash.substring(0, 18)}`;
  
  // Generate valid Aptos hex tx hash preview
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
