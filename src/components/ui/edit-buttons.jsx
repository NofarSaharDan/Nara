import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";

export const EditButtons = ({ editing, onEdit, onSave, onCancel, className = "" }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {!editing ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-white hover:bg-white/30 hover:text-white bg-black/20 border border-white/40 rounded-md px-2 py-1"
          title="ערוך"
        >
          <Edit className="w-3 h-3" />
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className="text-white hover:bg-white/30 hover:text-white bg-black/20 border border-white/40 rounded-md px-2 py-1"
            title="שמור"
          >
            <Save className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-white hover:bg-white/30 hover:text-white bg-black/20 border border-white/40 rounded-md px-2 py-1"
            title="בטל"
          >
            <X className="w-3 h-3" />
          </Button>
        </>
      )}
    </div>
  );
}; 