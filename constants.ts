import { ClaimStatus, UserRole, Claim } from './types.ts';

export const APP_NAME = 'VelocityPRO';

export const MOCK_CLAIMS: Claim[] = [
  {
    id: 'CLM-001',
    userId: 'user1',
    title: 'Vehicle Collision - Rear End',
    description: 'Accident occurred at Broadway intersection. Significant damage to rear bumper.',
    status: ClaimStatus.PENDING,
    createdAt: '2024-05-20T10:00:00Z',
    category: 'Auto',
    documents: ['photo1.jpg', 'police_report.pdf']
  },
  {
    id: 'CLM-002',
    userId: 'user1',
    appraiserId: 'appraiser1',
    title: 'Residential Water Damage',
    description: 'Leaking pipe in master bathroom caused ceiling damage in kitchen below.',
    status: ClaimStatus.IN_PROGRESS,
    createdAt: '2024-05-18T14:30:00Z',
    amount: 4500,
    category: 'Home',
    documents: ['water_damage.png']
  },
  {
    id: 'CLM-003',
    userId: 'user2',
    appraiserId: 'appraiser1',
    title: 'Theft - Electronic Equipment',
    description: 'Home burglary resulting in loss of high-end laptop and gaming console.',
    status: ClaimStatus.COMPLETED,
    createdAt: '2024-05-15T09:15:00Z',
    amount: 2200,
    category: 'Personal Property',
    documents: ['receipt_laptop.pdf']
  }
];

export const STATUS_COLORS: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ClaimStatus.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [ClaimStatus.IN_PROGRESS]: 'bg-indigo-100 text-indigo-800',
  [ClaimStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [ClaimStatus.REJECTED]: 'bg-red-100 text-red-800',
};