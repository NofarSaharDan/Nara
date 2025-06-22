import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Save, X } from "lucide-react";

export default function JournalEntryCard({ 
  entry, 
  editing, 
  editingEntry, 
  editText, 
  setEditText, 
  startEditing, 
  saveEdit, 
  cancelEdit, 
  deleteEntry 
}) {
  return (
    <Card className="shadow-lg border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-700">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{entry.date}</span>
          </div>
          {editing && (
            <div className="flex gap-2">
              {editingEntry === entry.id ? (
                <>
                  <Button
                    size="sm"
                    onClick={saveEdit}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    שמור
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEdit}
                  >
                    <X className="w-3 h-3 mr-1" />
                    ביטול
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(entry)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    ערוך
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-3 h-3 mr-1" />
                    מחק
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {editingEntry === entry.id ? (
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            className="border-purple-300 focus:border-purple-500"
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 