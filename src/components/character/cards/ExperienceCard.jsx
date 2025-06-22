import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Star } from "lucide-react";

export default function ExperienceCard({ character, xpHistory, xpToAdd, setXpToAdd, handleAddXp }) {
  return (
    <Card className="shadow-lg border border-purple-300 bg-white">
      <CardHeader className="bg-gradient-to-r from-[#a755f7] to-[#6465f1] text-white rounded-t-lg p-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="w-5 h-5" />
          נקודות ניסיון
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center pt-2 pb-6 px-4">
        <div className="text-6xl font-bold text-gray-900">
          {character.experience_points || 0}
        </div>
        
        <Separator className="my-4" />

        <h3 className="text-lg font-semibold text-gray-900 mb-2">היסטוריה</h3>
        <ScrollArea className="h-24">
          {xpHistory.length > 0 ? (
            <div className="text-sm text-gray-600 space-y-1 text-right pr-2">
              {xpHistory.map(log => (
                <div key={log.id}>
                  <span className="font-semibold text-[#a755f7]">+{log.amount}</span> - {format(new Date(log.date), 'dd/MM/yy')}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">אין היסטוריה</p>
          )}
        </ScrollArea>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Input 
            type="number" 
            value={xpToAdd} 
            onChange={(e) => setXpToAdd(parseInt(e.target.value) || 0)} 
            className="w-24 text-center"
            placeholder="הוסף/הסר"
          />
          <Button onClick={handleAddXp} size="sm" className="bg-[#a755f7] hover:bg-[#6465f1]">הוסף</Button>
        </div>
      </CardContent>
    </Card>
  );
} 