import { useState } from 'react';
import { getSchedule, saveSchedule } from '../lib/adminData';
import type { ScheduleItem } from '../lib/adminData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Save, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => getSchedule());
  const [edited, setEdited] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (index: number, field: 'hours' | 'free', value: string) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index] = {
      ...updatedSchedule[index],
      [field]: value,
    };
    setSchedule(updatedSchedule);
    setEdited(true);
  };

  const handleSave = () => {
    saveSchedule(schedule);
    setEdited(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    const data = getSchedule();
    setSchedule(data);
    setEdited(false);
  };

  return (
    <div className="space-y-6">
      {saved && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            ✓ Schedule saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {schedule.map((item, index) => (
          <Card key={item.day} className="p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-[#0A165E] mb-2">
                  Day
                </label>
                <div className="px-4 py-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] font-medium text-[#0A165E]">
                  {item.day}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A165E] mb-2">
                  Hours
                </label>
                <Input
                  type="text"
                  value={item.hours}
                  onChange={(e) => handleChange(index, 'hours', e.target.value)}
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                  className="border-[#E2E8F0]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0A165E] mb-2">
                  Free Consultation
                </label>
                <Input
                  type="text"
                  value={item.free}
                  onChange={(e) => handleChange(index, 'free', e.target.value)}
                  placeholder="e.g., 9:00 AM - 10:00 AM or -"
                  className="border-[#E2E8F0]"
                />
              </div>

              <div className="text-sm text-gray-500 text-center">
                {item.hours === 'Closed' && (
                  <span className="inline-block px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                    CLOSED
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-6">
        <Button
          onClick={handleSave}
          disabled={!edited}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          disabled={!edited}
          className="border-[#E2E8F0]"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
