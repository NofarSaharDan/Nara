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
  Zap,
  Sparkles
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

  const ArmorCard = () => (
    <Card className="shadow-lg border-sky-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#24d3ee] to-[#5fa6fa] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          שריון
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-sky-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">שריון עור</p>
              <p className="text-sm text-gray-500">סוג: שריון קל</p>
            </div>
            <Badge variant="outline" className="border-sky-300 text-sky-700">
              מודיפיקטור זריזות +11
            </Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-sky-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">מגן עץ</p>
              <p className="text-sm text-gray-500">סוג: מגן</p>
            </div>
            <Badge variant="outline" className="border-sky-300 text-sky-700">
              +2
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WeaponsCard = () => (
    <Card className="shadow-lg border-red-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sword className="w-5 h-5" />
          נשקים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">חרב קצרה</p>
              <p className="text-sm text-gray-500">סוג נזק: חיתוך, תכונות: קל, פיניס</p>
            </div>
            <Badge variant="outline" className="border-red-300 text-red-700">
              1d6
            </Badge>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">קשת קצרה</p>
              <p className="text-sm text-gray-500">סוג נזק: חודר, תכונות: תחמושת, טווח</p>
            </div>
            <Badge variant="outline" className="border-red-300 text-red-700">
              1d6
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InventoryCard = () => (
     <Card className="shadow-lg border-green-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#22c55f] to-[#22c55f] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          ציוד ומלאי
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {name: 'תרמיל', quantity: 1}, {name: 'ערכת ריפוי', quantity: 1}, {name: 'חבל (15 מטר)', quantity: 1},
          {name: 'לפיד', quantity: 10}, {name: 'מנות ליום', quantity: 5}, {name: 'כד מים', quantity: 1},
          {name: 'סכין', quantity: 1}, {name: 'חליפי טיפוס', quantity: 1},
        ].map(item => (
            <div key={item.name} className="p-3 bg-white rounded-lg shadow-sm border border-green-200 flex justify-between items-center">
               <span className="font-semibold text-gray-800">{item.name}</span>
               <Badge variant="secondary" className="bg-green-100 text-green-800">x {item.quantity}</Badge>
            </div>
        ))}
      </CardContent>
    </Card>
  );

  const TreasuresCard = () => (
    <Card className="shadow-lg border-purple-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#a856f8] to-[#a78bfa] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          פריטים מיוחדים ואוצרות
        </CardTitle>
      </CardHeader>
       <CardContent className="p-6 space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-200">
            <div>
              <p className="font-bold text-gray-800 flex items-center gap-2">קמע אסגארד <Badge variant="outline" className="border-purple-300 text-purple-700">נדיר</Badge></p>
              <p className="text-sm text-gray-500 mt-1">קמע עתיק של האל האסגארדי</p>
            </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-200">
            <div>
              <p className="font-bold text-gray-800 flex items-center gap-2">זיכרון דרקוני <Badge variant="outline" className="border-purple-300 text-purple-700">יוצא דופן</Badge></p>
              <p className="text-sm text-gray-500 mt-1">חרוז מכיל זיכרונות עתיקים</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );

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