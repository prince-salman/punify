import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { DORM_LOCATIONS } from '../data/dorms';

interface DormSelectorProps {
  selectedDormId: string;
  roomNumber: string;
  onSelectDorm: (dormId: string) => void;
  onChangeRoomNumber: (room: string) => void;
}

export const DormSelector: React.FC<DormSelectorProps> = ({
  selectedDormId,
  roomNumber,
  onSelectDorm,
  onChangeRoomNumber,
}) => {
  const selectedDorm = DORM_LOCATIONS.find((d) => d.id === selectedDormId);

  return (
    <div className="space-y-4">
      {/* Location Select */}
      <div>
        <label className="text-xs font-semibold text-slate-800 block mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Pilih Titik Antar Asrama / Kampus PresUniv</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Dorm Drop Gratis
          </span>
        </label>
        
        <select
          value={selectedDormId}
          onChange={(e) => onSelectDorm(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600"
        >
          {DORM_LOCATIONS.map((dorm) => (
            <option key={dorm.id} value={dorm.id}>
              {dorm.name} ({dorm.deliveryFee === 0 ? 'Gratis' : `+Rp ${dorm.deliveryFee.toLocaleString('id-ID')}`})
            </option>
          ))}
        </select>
        
        {selectedDorm && (
          <p className="mt-1.5 text-[11px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{selectedDorm.notes}</span>
          </p>
        )}
      </div>

      {/* Room Number / Notes */}
      <div>
        <label className="text-xs font-semibold text-slate-800 block mb-1">
          Nomor Kamar Asrama / Meja Lobby
        </label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => onChangeRoomNumber(e.target.value)}
          placeholder="Misal: Tower 2 Kamar 408 atau Titip Satpam Lobby"
          className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:border-blue-600"
        />
      </div>
    </div>
  );
};
