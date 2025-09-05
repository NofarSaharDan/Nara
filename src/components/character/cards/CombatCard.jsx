// src/components/character/cards/CombatCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { useCardEditing } from "@/lib/hooks/useCardEditing";
import { EditButtons } from "../../ui/edit-buttons";

export default function CombatCard({ 
  character, 
  getModifier, 
  updateAcComponent, 
  updateSpeed,
  updateInitiativeBonus,
  updateCharacter, // Add this
  totalAC, 
  formatModifier 
}) {
  // Convert feet to meters for Israeli users
  const convertSpeedToMeters = (feetSpeed) => {
    return Math.round((feetSpeed || 20) * 0.3048);
  };

  const convertMetersToFeet = (metersSpeed) => {
    return Math.round((metersSpeed || 6) / 0.3048);
  };

  const initialData = {
    magic: character.ac_components?.magic || 0,
    misc: character.ac_components?.misc || 0,
    speedInMeters: convertSpeedToMeters(character.speed || 20),
    initiativeBonus: character.initiative_bonus || 0
  };

  const {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData
  } = useCardEditing(initialData, (updatedData) => {
    console.log('💾 Saving all data:', updatedData);
    
    // Update AC components directly through updateCharacter
    if (updatedData.magic !== undefined || updatedData.misc !== undefined) {
      const updatedACComponents = {
        ...(character.ac_components || {}),
        magic: updatedData.magic ?? character.ac_components?.magic ?? 0,
        misc: updatedData.misc ?? character.ac_components?.misc ?? 0
      };
      console.log('🛡️ Updating AC components directly:', updatedACComponents);
      updateCharacter("ac_components", updatedACComponents);
    }
    
    // Update speed (convert meters to feet)
    if (updateSpeed && updatedData.speedInMeters !== undefined) {
      const speedInFeet = convertMetersToFeet(updatedData.speedInMeters);
      console.log('🏃 Updating speed:', speedInFeet, 'feet (was', updatedData.speedInMeters, 'meters)');
      updateSpeed(speedInFeet);
    }
    
    // Update initiative bonus
    if (updateInitiativeBonus && updatedData.initiativeBonus !== undefined) {
      console.log('⚡ Updating initiative bonus:', updatedData.initiativeBonus);
      updateInitiativeBonus(updatedData.initiativeBonus);
    }
  });

  // Calculate initiative with potential bonus
  const calculateInitiative = () => {
    const dexMod = getModifier(character.dexterity);
    const bonus = editing ? (tempData.initiativeBonus ?? 0) : (character.initiative_bonus || 0);
    return dexMod + bonus;
  };

  // Calculate AC in real-time during editing
  const calculateCurrentAC = () => {
    if (editing) {
      const baseAC = 10;
      const dexMod = getModifier(character.dexterity);
      const armor = character.ac_components?.armor || 4;
      const shield = character.ac_components?.shield || 1;
      const natural = character.ac_components?.natural || 0;
      const magic = tempData.magic ?? character.ac_components?.magic ?? 0;
      const misc = tempData.misc ?? character.ac_components?.misc ?? 0;
      
      return baseAC + dexMod + armor + shield + natural + magic + misc;
    }
    return totalAC;
  };

  const getCurrentSpeed = () => {
    return editing ? (tempData.speedInMeters ?? initialData.speedInMeters) : convertSpeedToMeters(character.speed || 20);
  };

  const getCurrentSpeedInFeet = () => {
    return editing ? convertMetersToFeet(tempData.speedInMeters ?? initialData.speedInMeters) : (character.speed || 20);
  };

  return (
    <Card className="shadow-lg border border-cyan-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#23d2ee] to-[#5fa6fa] text-white rounded-t-lg py-3">
        <CardTitle className="text-lg flex items-center justify-between w-full">
          <EditButtons
            editing={editing}
            onEdit={startEditing}
            onSave={saveChanges}
            onCancel={cancelEditing}
          />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            קרב
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 text-center">
        <div className="grid grid-cols-2 gap-4">
          {/* Initiative */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">יוזמה</Label>
            <div className="text-2xl font-bold text-gray-900">
              {formatModifier(calculateInitiative())}
            </div>
            {editing && (
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">בונוס נוסף</Label>
                <Input
                  type="number"
                  value={tempData.initiativeBonus ?? 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    console.log('🔄 Updating initiative bonus temp:', value);
                    updateTempData('initiativeBonus', value);
                  }}
                  className="h-12 text-center"
                />
              </div>
            )}
          </div>
          
          {/* Speed in Meters */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">מהירות</Label>
            <div className="text-2xl font-bold text-gray-900">
              {getCurrentSpeed()} מטר
            </div>
            <div className="text-xs text-gray-500">
              ({getCurrentSpeedInFeet()} רגל)
            </div>
            {editing && (
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">מטרים</Label>
                <Input
                  type="number"
                  value={tempData.speedInMeters ?? initialData.speedInMeters}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    console.log('🔄 Updating speed temp:', value, 'meters');
                    updateTempData('speedInMeters', value);
                  }}
                  className="h-12 text-center"
                />
              </div>
            )}
          </div>
        </div>
        
        <Separator/>
        
        {/* Armor Class */}
        <div>
          <Label className="text-sm text-gray-600">דרג״ש</Label>
          <div className="text-4xl font-bold text-gray-900 my-2">
            {calculateCurrentAC()}
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>10 + {formatModifier(getModifier(character.dexterity))} (זריזות) + {character.ac_components?.armor || 4} (שריון) + {character.ac_components?.shield || 1} (מגן)</div>
            {editing && (
              <div className="text-blue-600">
                + {tempData.magic ?? character.ac_components?.magic ?? 0} (קסם) + {tempData.misc ?? character.ac_components?.misc ?? 0} (שונות) = {calculateCurrentAC()}
              </div>
            )}
          </div>
          {editing && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">קסם</Label>
                <Input 
                  type="number" 
                  value={tempData.magic ?? 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    console.log('🔄 Updating magic temp:', value);
                    updateTempData('magic', value);
                  }} 
                  className="h-12 text-center"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">שונות</Label>
                <Input 
                  type="number" 
                  value={tempData.misc ?? 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    console.log('🔄 Updating misc temp:', value);
                    updateTempData('misc', value);
                  }} 
                  className="h-12 text-center"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}