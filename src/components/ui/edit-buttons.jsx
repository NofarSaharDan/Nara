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
          className="text-white hover:bg-white/30 hover:text-white bg-transparent border-none shadow-none p-1"
          title="ערוך"
        >
          <Edit className="w-4 h-4" />
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className="text-white hover:bg-white/30 hover:text-white bg-transparent border-none shadow-none p-1"
            title="שמור"
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-white hover:bg-white/30 hover:text-white bg-transparent border-none shadow-none p-1"
            title="בטל"
          >
            <X className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}; 