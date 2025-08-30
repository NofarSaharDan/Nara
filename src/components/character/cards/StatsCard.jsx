import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "@/components/ui/edit-buttons";
import {
  Star,
  Target,
  Zap,
  Heart,
  BrainCircuit,
  Shield as WisdomShield,
} from "lucide-react";

export default function StatsCard({ abilities, character, updateAbility, calculateTotal, getModifier, formatModifier }) {
  const initialData = abilities.reduce((acc, ability) => {
    const abilityData = character[ability.key] || {};
    acc[ability.key] = {
      base: abilityData.base || 0,
      racial: abilityData.racial || 0,
      magic: abilityData.magic || 0,
      misc: abilityData.misc || 0,
    };
    return acc;
  }, {});

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData,
  } = useCardEditing(initialData, (updatedData) => {
    Object.entries(updatedData).forEach(([abilityKey, abilityValues]) => {
      // Pass the whole updated ability object to the parent
      updateAbility(abilityKey, abilityValues);
    });
  });

  const handleStatChange = (abilityKey, field, value) => {
    updateTempData(abilityKey, {
      ...tempData[abilityKey],
      [field]: parseInt(value, 10) || 0,
    });
  };
  
  const abilityPresentation = {
    strength: { icon: <Target />, color: "text-red-500", bgColor: "bg-red-500" },
    dexterity: { icon: <Zap />, color: "text-amber-500", bgColor: "bg-amber-500" },
    constitution: { icon: <Heart />, color: "text-green-500", bgColor: "bg-green-500" },
    intelligence: { icon: <BrainCircuit />, color: "text-blue-500", bgColor: "bg-blue-500" },
    wisdom: { icon: <WisdomShield />, color: "text-indigo-500", bgColor: "bg-indigo-500" },
    charisma: { icon: <Star />, color: "text-pink-500", bgColor: "bg-pink-500" },
  };

  return (
    <Card>
      <CardHeader className="card-header-stats flex-row items-center justify-between pb-2">
        <EditButtons
          isEditing={editing}
          onEdit={startEditing}
          onSave={saveChanges}
          onCancel={cancelEditing}
        />
        <CardTitle className="text-lg font-medium w-full text-right">תכונות</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {abilities.map((abilityInfo) => {
          const abilityData = character[abilityInfo.key] || {};
          const tempAbilityData = tempData[abilityInfo.key] || {};
          const presentation = abilityPresentation[abilityInfo.key];
          const modifier = getModifier(abilityData);

          const detailParts = [
            `בסיס: ${abilityData.base || 0}`,
            `גזע: ${abilityData.racial || 0}`,
          ];
          if (abilityData.magic) detailParts.push(`קסם: ${abilityData.magic}`);
          if (abilityData.misc) detailParts.push(`שונות: ${abilityData.misc}`);
          
          return (
            <div key={abilityInfo.key} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`${presentation.color} w-6 h-6`}>
                    {React.cloneElement(presentation.icon, { className: "w-full h-full" })}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{abilityInfo.name}</p>
                    <p className="text-xs text-slate-500">{detailParts.join(' | ')}</p>
                  </div>
                </div>
                
                <div className={`w-14 h-14 rounded-full ${presentation.bgColor} flex items-center justify-center`}>
                  <p className="text-white text-2xl font-bold">{formatModifier(modifier)}</p>
                </div>
              </div>
              
              {editing && (
                <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[ 'base', 'racial', 'magic', 'misc' ].map(field => {
                    const fieldLabels = { base: 'בסיס', racial: 'גזע', magic: 'קסם', misc: 'שונות' };
                    return (
                      <div className="space-y-1" key={field}>
                        <Label htmlFor={`${field}-${abilityInfo.key}`} className="text-xs font-medium text-slate-600">{fieldLabels[field]}</Label>
                        <Input 
                          id={`${field}-${abilityInfo.key}`} 
                          type="number" 
                          value={tempAbilityData[field]} 
                          onChange={(e) => handleStatChange(abilityInfo.key, field, e.target.value)}
                          className="h-8 w-full"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
} 