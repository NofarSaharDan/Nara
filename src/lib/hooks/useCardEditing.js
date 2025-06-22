import { useState } from "react";

export const useCardEditing = (initialData, updateFunction) => {
  const [editing, setEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const startEditing = () => {
    setTempData(initialData);
    setEditing(true);
  };

  const saveChanges = () => {
    // Only update if there are actual changes
    const hasChanges = Object.keys(tempData).some(
      (key) => tempData[key] !== initialData[key]
    );

    if (hasChanges) {
      Object.keys(tempData).forEach((key) => {
        if (tempData[key] !== initialData[key]) {
          updateFunction(key, tempData[key]);
        }
      });
    }
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
