import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function CombatCard({ character, getModifier, updateAcComponent, totalAC, formatModifier }) {
  const initialData = {
    magic: character.ac_components?.magic || 0,
    misc: character.ac_components?.misc || 0
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    updateAcComponent("magic", updatedData.magic);
    updateAcComponent("misc", updatedData.misc);
  });

  return (
    <Card className="shadow-lg border border-cyan-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#23d2ee] to-[#5fa6fa] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            קרב
          </div>
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-center">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-600">יוזמה</Label>
            <div className="text-2xl font-bold text-gray-900">
              {formatModifier(character.initiative !== undefined ? character.initiative : getModifier(character.dexterity))}
            </div>
          </div>
          <div>
            <Label className="text-sm text-gray-600">מהירות</Label>
            <div className="text-2xl font-bold text-gray-900">{character.speed || 0} רגל</div>
          </div>
        </div>
        <Separator/>
        <div>
          <Label className="text-sm text-gray-600">דרג״ש</Label>
          <div className="text-4xl font-bold text-gray-900 my-2">{totalAC}</div>
          <div className="text-xs text-gray-600 space-y-1">
            <span>10 + {formatModifier(getModifier(character.dexterity))} (זריזות) + {character.ac_components?.armor || 0} (שריון) + {character.ac_components?.shield || 0} (מגן) + {character.ac_components?.natural || 0} (טבעי)</span>
          </div>
          {editing && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Input 
                type="number" 
                title="קסם" 
                placeholder="קסם" 
                value={tempData.magic || 0} 
                onChange={(e) => updateTempData("magic", parseInt(e.target.value) || 0)} 
                className="h-8"
              />
              <Input 
                type="number" 
                title="שונות" 
                placeholder="שונות" 
                value={tempData.misc || 0} 
                onChange={(e) => updateTempData("misc", parseInt(e.target.value) || 0)} 
                className="h-8"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 