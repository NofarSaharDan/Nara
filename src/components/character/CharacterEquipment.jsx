import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sword, 
  Shield, 
  Plus, 
  Trash2, 
  Package,
  Target,
  Zap
} from "lucide-react";

export default function CharacterEquipment({ character, editing, updateCharacter }) {
  const [newWeapon, setNewWeapon] = useState({
    name: "",
    attack_bonus: 0,
    damage: "",
    damage_type: ""
  });
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    quantity: 1,
    description: ""
  });
  const [showAddWeapon, setShowAddWeapon] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);

  const addWeapon = () => {
    const updatedWeapons = [...(character.weapons || []), { ...newWeapon, id: Date.now() }];
    updateCharacter("weapons", updatedWeapons);
    setNewWeapon({
      name: "",
      attack_bonus: 0,
      damage: "",
      damage_type: ""
    });
    setShowAddWeapon(false);
  };

  const removeWeapon = (weaponId) => {
    const updatedWeapons = character.weapons?.filter(weapon => weapon.id !== weaponId) || [];
    updateCharacter("weapons", updatedWeapons);
  };

  const addEquipment = () => {
    const updatedEquipment = [...(character.equipment || []), { ...newEquipment, id: Date.now() }];
    updateCharacter("equipment", updatedEquipment);
    setNewEquipment({
      name: "",
      quantity: 1,
      description: ""
    });
    setShowAddEquipment(false);
  };

  const removeEquipment = (equipmentId) => {
    const updatedEquipment = character.equipment?.filter(item => item.id !== equipmentId) || [];
    updateCharacter("equipment", updatedEquipment);
  };

  const getDamageTypeColor = (damageType) => {
    const colors = {
      "חותך": "bg-red-100 text-red-800 border-red-300",
      "חודר": "bg-blue-100 text-blue-800 border-blue-300", 
      "מוחץ": "bg-stone-100 text-stone-800 border-stone-300",
      "אש": "bg-orange-100 text-orange-800 border-orange-300",
      "קרח": "bg-cyan-100 text-cyan-800 border-cyan-300",
      "חשמל": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "רעל": "bg-green-100 text-green-800 border-green-300",
      "נקרומנטי": "bg-gray-100 text-gray-800 border-gray-300"
    };
    return colors[damageType] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Weapons */}
      <Card className="shadow-lg border-red-200 bg-gradient-to-br from-white to-red-50">
        <CardHeader className="bg-gradient-to-l from-red-600 to-orange-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sword className="w-5 h-5" />
              נשקים
            </CardTitle>
            {editing && (
              <Button
                onClick={() => setShowAddWeapon(!showAddWeapon)}
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="w-4 h-4 ml-1" />
                הוסף נשק
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <AnimatePresence>
            {showAddWeapon && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>שם הנשק</Label>
                      <Input
                        value={newWeapon.name}
                        onChange={(e) => setNewWeapon({...newWeapon, name: e.target.value})}
                        placeholder="חרב ארוכה"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>בונוס התקפה</Label>
                      <Input
                        type="number"
                        value={newWeapon.attack_bonus}
                        onChange={(e) => setNewWeapon({...newWeapon, attack_bonus: parseInt(e.target.value) || 0})}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>נזק</Label>
                      <Input
                        value={newWeapon.damage}
                        onChange={(e) => setNewWeapon({...newWeapon, damage: e.target.value})}
                        placeholder="1d8+3"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>סוג נזק</Label>
                      <Input
                        value={newWeapon.damage_type}
                        onChange={(e) => setNewWeapon({...newWeapon, damage_type: e.target.value})}
                        placeholder="חותך"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddWeapon(false)}
                      size="sm"
                    >
                      ביטול
                    </Button>
                    <Button
                      onClick={addWeapon}
                      disabled={!newWeapon.name}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      הוסף נשק
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {character.weapons?.length > 0 ? (
              character.weapons.map((weapon) => (
                <motion.div
                  key={weapon.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-red-200 hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-red-800 mb-2">{weapon.name}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="flex items-center gap-1 border-red-300 text-red-700">
                          <Target className="w-3 h-3" />
                          התקפה: {weapon.attack_bonus >= 0 ? '+' : ''}{weapon.attack_bonus}
                        </Badge>
                        {weapon.damage && (
                          <Badge variant="outline" className="flex items-center gap-1 border-red-300 text-red-700">
                            <Zap className="w-3 h-3" />
                            נזק: {weapon.damage}
                          </Badge>
                        )}
                        {weapon.damage_type && (
                          <Badge className={getDamageTypeColor(weapon.damage_type)}>
                            {weapon.damage_type}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {editing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWeapon(weapon.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-red-600">
                <Sword className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <p>אין נשקים</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card className="shadow-lg border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-l from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              ציוד ומלאי
            </CardTitle>
            {editing && (
              <Button
                onClick={() => setShowAddEquipment(!showAddEquipment)}
                size="sm"
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="w-4 h-4 ml-1" />
                הוסף פריט
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <AnimatePresence>
            {showAddEquipment && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>שם הפריט</Label>
                      <Input
                        value={newEquipment.name}
                        onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                        placeholder="חבל, פנס, וכו'"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>כמות</Label>
                      <Input
                        type="number"
                        min="1"
                        value={newEquipment.quantity}
                        onChange={(e) => setNewEquipment({...newEquipment, quantity: parseInt(e.target.value) || 1})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>תיאור</Label>
                    <Textarea
                      value={newEquipment.description}
                      onChange={(e) => setNewEquipment({...newEquipment, description: e.target.value})}
                      placeholder="תיאור הפריט ושימושיו..."
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddEquipment(false)}
                      size="sm"
                    >
                      ביטול
                    </Button>
                    <Button
                      onClick={addEquipment}
                      disabled={!newEquipment.name}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      הוסף פריט
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {character.equipment?.length > 0 ? (
              character.equipment.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-blue-200 hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-bold text-blue-800">{item.name}</h3>
                        {item.quantity > 1 && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            x{item.quantity}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-blue-600 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    {editing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEquipment(item.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-blue-600">
                <Package className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <p>אין ציוד</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 