'use client'
import { useState } from "react";
import DataTable from "@/components/DataTable";
import DialogForm from "@/components/DialogForm";
import { Button } from "@/components/ui/button"; // Importing Button from ShadCN

export default function Home() {
  const [activeTab, setActiveTab] = useState("Skills");
  const [skills, setSkills] = useState([
    { id: "0001", skill: "Project Management" },
    { id: "0002", skill: "Data Visualization" },
    { id: "0003", skill: "Data Analysis" },
    { id: "0004", skill: "Computer Literacy" },
    { id: "0005", skill: "Organizational Skills" },
    { id: "0006", skill: "Technical Aptitude" },
    { id: "0007", skill: "Machine Learning" },
    { id: "0008", skill: "Leadership" },
  ]);

  const [trainings, setTrainings] = useState([
    { id: "0001", training: "Human Resources Manager" },
    { id: "0002", training: "Event Coordinator" },
    { id: "0003", training: "Project Manager" },
    { id: "0004", training: "Sales Trainer" },
    { id: "0005", training: "Technical Trainer" },
    { id: "0006", training: "Operation Trainer" },
    { id: "0007", training: "Sales and Marketing Trainer" },
    { id: "0008", training: "Retail Training Manager" },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdd = (newEntry) => {
    const newEntryItem = { id: (skills.length + 1).toString().padStart(4, "0"), skill: newEntry };
    if (activeTab === "Skills") {
      setSkills([...skills, newEntryItem]);
    } else {
      setTrainings([...trainings, { ...newEntryItem, training: newEntryItem.skill }]);
    }
    setIsDialogOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    if (activeTab === "Skills") {
      setEditEntry(skills[index].skill);
    } else {
      setEditEntry(trainings[index].training);
    }
  };

  const saveEdit = () => {
    if (activeTab === "Skills") {
      const updatedSkills = skills.map((skill, index) =>
        index === editIndex ? { ...skill, skill: editEntry } : skill
      );
      setSkills(updatedSkills);
    } else {
      const updatedTrainings = trainings.map((training, index) =>
        index === editIndex ? { ...training, training: editEntry } : training
      );
      setTrainings(updatedTrainings);
    }
    setEditIndex(null);
    setEditEntry("");
  };

  const handleDelete = (index) => {
    if (activeTab === "Skills") {
      setSkills(skills.filter((_, i) => i !== index));
    } else {
      setTrainings(trainings.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="bg-green-100 shadow-lg rounded-lg w-11/12 md:w-8/12">
        <div className="p-5 flex justify-between items-center border-b-4 border-green-700">
          <h1 className="text-4xl font-bold text-green-700">Data Entry</h1>
          <DialogForm activeTab={activeTab} onAdd={{ skills, trainings, setIsDialogOpen, setActiveTab, isDialogOpen }} />
        </div>
        <div className="p-5">
          <div className="mb-6 flex justify-start space-x-4">
            <Button
              variant={activeTab === "Skills" ? "default" : "outline"}
              onClick={() => setActiveTab("Skills")}
            >
              Skills
            </Button>
            <Button
              variant={activeTab === "Training" ? "default" : "outline"}
              onClick={() => setActiveTab("Training")}
            >
              Training
            </Button>
          </div>
          <DataTable
            activeTab={activeTab}
            data={activeTab === "Skills" ? skills : trainings}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            onSave={saveEdit}
            onDelete={handleDelete}
            onEdit={handleEdit}
            editEntry={editEntry}
            setEditEntry={setEditEntry}
          />
        </div>
      </div>
    </div>
  );
}
