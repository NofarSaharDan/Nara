// src/lib/hooks/useCardEditing.js
import { useState } from "react";

export const useCardEditing = (initialData, updateFunction) => {
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const startEditing = () => {
    setTempData({ ...initialData });
    setEditing(true);
  };

  const saveChanges = () => {
    // Call the update function with all temp data
    updateFunction(tempData);
    setEditing(false);
    setTempData({});
  };

  const cancelEditing = () => {
    setEditing(false);
    setTempData({});
  };

  const updateTempData = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    editing,
    tempData,
    startEditing,
    saveChanges,
    cancelEditing,
    updateTempData,
  };
};

// Specialized hook for single field editing (like textarea fields)
export const useSingleFieldEditing = (
  initialValue,
  updateFunction,
  fieldName
) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const startEditing = () => {
    setTempValue(initialValue || "");
    setEditing(true);
  };

  const saveChanges = () => {
    if (tempValue !== initialValue) {
      updateFunction(fieldName, tempValue);
    }
    setEditing(false);
  };

  const cancelEditing = () => {
    setEditing(false);
    setTempValue("");
  };

  return {
    editing,
    tempValue,
    startEditing,
    saveChanges,
    cancelEditing,
    setTempValue,
  };
};
