import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Target,
  Zap
} from "lucide-react";

// Import the new card components
import ArmorCard from "./cards/ArmorCard";
import WeaponsCard from "./cards/WeaponsCard";
import InventoryCard from "./cards/InventoryCard";
import TreasuresCard from "./cards/TreasuresCard";

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
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-8">
        <WeaponsCard />
        <TreasuresCard />
      </div>
      <div className="space-y-8">
        <ArmorCard />
        <InventoryCard />
      </div>
    </div>
  );
} 