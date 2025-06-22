import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

export default function AddJournalEntryCard({ newEntry, setNewEntry, addJournalEntry }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-journal">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          הוסף רשומה חדשה
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="כתוב על ההתקדמות שלך במשחק, אירועים חשובים, או מחשבות על הדמות..."
            rows={4}
            className="border-purple-300 focus:border-purple-500"
          />
          <Button 
            onClick={addJournalEntry}
            disabled={!newEntry.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            הוסף רשומה
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 