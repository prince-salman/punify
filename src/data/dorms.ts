import { DormLocation } from '../types/order';

export const DORM_LOCATIONS: DormLocation[] = [
  {
    id: 'sh_tower1',
    name: 'Student Housing — Tower 1 Lobby Drop',
    zone: 'Student Housing',
    notes: 'Free delivery to lobby / security desk Tower 1 PresUniv',
    deliveryFee: 0,
  },
  {
    id: 'sh_tower2',
    name: 'Student Housing — Tower 2 Lobby Drop',
    zone: 'Student Housing',
    notes: 'Free delivery to lobby / security desk Tower 2 PresUniv',
    deliveryFee: 0,
  },
  {
    id: 'sh_tower3',
    name: 'Student Housing — Tower 3 Lobby Drop',
    zone: 'Student Housing',
    notes: 'Free delivery to lobby / security desk Tower 3 PresUniv',
    deliveryFee: 0,
  },
  {
    id: 'sh_tower4',
    name: 'Student Housing — Tower 4 Lobby Drop',
    zone: 'Student Housing',
    notes: 'Free delivery to lobby / security desk Tower 4 PresUniv',
    deliveryFee: 0,
  },
  {
    id: 'nbh_blocks',
    name: 'New Beverly Hills (NBH) Dormitory Area',
    zone: 'New Beverly Hills',
    notes: 'Direct delivery to NBH Jababeka student cluster',
    deliveryFee: 3000,
  },
  {
    id: 'campus_fab',
    name: 'PresUniv Campus — FAB (Faculty of Art & Business) Lobby',
    zone: 'Campus Hub',
    notes: 'Meet PUNIFY courier at Gazebo / FAB Lobby during class breaks',
    deliveryFee: 0,
  },
  {
    id: 'campus_main',
    name: 'PresUniv Campus — Main Building Ground Floor',
    zone: 'Campus Hub',
    notes: 'Meeting point in front of ATM Center / Student Lounge',
    deliveryFee: 0,
  },
  {
    id: 'cikarang_hub',
    name: 'Self Pickup — PUNIFY Central Hub (Jl. Ki Hajar Dewantara Cikarang)',
    zone: 'Off-Campus',
    notes: 'Direct walk-in pickup for urgent deadlines or immediate checks',
    deliveryFee: 0,
  },
];
