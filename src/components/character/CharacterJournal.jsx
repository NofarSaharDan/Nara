import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Save, 
  X,
  Calendar,
  MapPin
} from "lucide-react";

export default function CharacterJournal({ character, editing, updateCharacter }) {
  const [newEntry, setNewEntry] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editText, setEditText] = useState("");

  const addJournalEntry = () => {
    if (newEntry.trim()) {
      const entry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('he-IL'),
        content: newEntry.trim(),
        timestamp: new Date().toISOString()
      };
      
      const currentEntries = character.journal_entries || [];
      updateCharacter("journal_entries", [entry, ...currentEntries]);
      setNewEntry("");
    }
  };

  const deleteEntry = (entryId) => {
    const currentEntries = character.journal_entries || [];
    const updatedEntries = currentEntries.filter(entry => entry.id !== entryId);
    updateCharacter("journal_entries", updatedEntries);
  };

  const startEditing = (entry) => {
    setEditingEntry(entry.id);
    setEditText(entry.content);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const currentEntries = character.journal_entries || [];
      const updatedEntries = currentEntries.map(entry => 
        entry.id === editingEntry 
          ? { ...entry, content: editText.trim() }
          : entry
      );
      updateCharacter("journal_entries", updatedEntries);
      setEditingEntry(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setEditText("");
  };

  const journalEntries = character.journal_entries || [];

  return (
    <div className="space-y-6">
      {/* Add New Entry */}
      <Card className="shadow-lg">
        <CardHeader className="text-white bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-t-lg">
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

      {/* Journal Entries */}
      <div className="space-y-4">
        {journalEntries.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <p className="text-purple-600 text-lg">אין עדיין רשומות ביומן</p>
              <p className="text-purple-500 text-sm">התחל לכתוב על המסע שלך!</p>
            </CardContent>
          </Card>
        ) : (
          journalEntries.map((entry) => (
            <Card key={entry.id} className="shadow-lg border-purple-100">
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
          ))
        )}
      </div>
    </div>
  );
} 