import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DialogForm({ activeTab, onAdd }) {
  const [newEntry, setNewEntry] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleAdd = () => {
    if (newEntry.trim() === "") {
      setValidationError("Entry cannot be empty.");
      return;
    }

    const isDuplicate = activeTab === "Skills"
      ? onAdd.skills.some(skill => skill.skill.toLowerCase() === newEntry.toLowerCase())
      : onAdd.trainings.some(training => training.training.toLowerCase() === newEntry.toLowerCase());

    if (isDuplicate) {
      setValidationError(`${activeTab} already exists.`);
      return;
    }

    onAdd(newEntry);
    setNewEntry("");
    setValidationError("");
  };

  return (
    <Dialog open={onAdd.isDialogOpen} onOpenChange={onAdd.setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setNewEntry("");
            setValidationError("");
            onAdd.setIsDialogOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md flex items-center"
        >
          + Add Data Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-md shadow-lg w-80 mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
            Add New Data Entry
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-2 mb-4">
          <Button
            variant={activeTab === "Skills" ? "default" : "ghost"}
            onClick={() => onAdd.setActiveTab("Skills")}
          >
            Skills
          </Button>
          <Button
            variant={activeTab === "Training" ? "default" : "ghost"}
            onClick={() => onAdd.setActiveTab("Training")}
          >
            Training
          </Button>
        </div>
        <div className="mb-4">
          <label htmlFor="entryInput" className="block mb-2 text-gray-700">
            Enter {activeTab === "Skills" ? "Skills" : "Training"}:
          </label>
          <input
            type="text"
            id="entryInput"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          />
          {validationError && (
            <p className="text-red-400 mt-2">{validationError}</p>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={handleAdd} variant="default">
            Add
          </Button>
          <Button onClick={() => onAdd.setIsDialogOpen(false)} variant="destructive">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
