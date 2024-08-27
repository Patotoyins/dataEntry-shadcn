'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [activeTab, setActiveTab] = useState('Skills');
  const [newEntry, setNewEntry] = useState("");
  const [skills, setSkills] = useState([
    { id: '0001', skill: 'Project Management' },
    { id: '0002', skill: 'Data Visualization' },
    { id: '0003', skill: 'Data Analysis' },
    { id: '0004', skill: 'Computer Literacy' },
    { id: '0005', skill: 'Organizational Skills' },
    { id: '0006', skill: 'Technical Aptitude' },
    { id: '0007', skill: 'Machine Learning' },
    { id: '0008', skill: 'Leadership' },
  ]);

  const [trainings, setTrainings] = useState([
    { id: '0001', training: 'Human Resources Manager' },
    { id: '0002', training: 'Event Coordinator' },
    { id: '0003', training: 'Project Manager' },
    { id: '0004', training: 'Sales Trainer' },
    { id: '0005', training: 'Technical Trainer' },
    { id: '0006', training: 'Operation Trainer' },
    { id: '0007', training: 'Sales and Marketing Trainer' },
    { id: '0008', training: 'Retail Training Manager' },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editSkill, setEditSkill] = useState("");
  const [editTraining, setEditTraining] = useState("");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleAdd = () => {
    if (newEntry.trim() !== "") {
      const newEntryItem = { id: (skills.length + 1).toString().padStart(4, '0'), skill: newEntry };
      if (activeTab === 'Skills') {
        setSkills([...skills, newEntryItem]);
      } else {
        setTrainings([...trainings, { ...newEntryItem, training: newEntryItem.skill }]);
      }
      setNewEntry(""); // Reset input after adding
      setIsDialogOpen(false); // Close the dialog
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    if (activeTab === 'Skills') {
      setEditSkill(skills[index].skill);
    } else {
      setEditTraining(trainings[index].training);
    }
  };

  const saveEdit = () => {
    if (activeTab === 'Skills') {
      const updatedSkills = skills.map((skill, index) =>
        index === editIndex ? { ...skill, skill: editSkill } : skill
      );
      setSkills(updatedSkills);
    } else {
      const updatedTrainings = trainings.map((training, index) =>
        index === editIndex ? { ...training, training: editTraining } : training
      );
      setTrainings(updatedTrainings);
    }
    setEditIndex(null);
    setEditSkill("");
    setEditTraining("");
  };

  const handleDelete = (index) => {
    if (activeTab === 'Skills') {
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setIsDialogOpen(true)} // Open the dialog when clicking the button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md flex items-center"
              >
                <span>+ Add Data Entry</span>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-green-600 text-white p-6 rounded-md shadow-lg w-80 mx-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold border-b-2 border-white pb-2 mb-4">Add New Data Entry</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center space-x-2 mb-4">
                <button
                  className={`${
                    activeTab === 'Skills' ? 'bg-white text-green-600' : 'bg-green-500 text-white'
                  } py-2 px-4 rounded-md`}
                  onClick={() => setActiveTab('Skills')}
                >
                  Skills
                </button>
                <button
                  className={`${
                    activeTab === 'Training' ? 'bg-white text-green-600' : 'bg-green-500 text-white'
                  } py-2 px-4 rounded-md`}
                  onClick={() => setActiveTab('Training')}
                >
                  Training
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="entryInput" className="block mb-2 text-white">
                  Enter {activeTab === 'Skills' ? 'Skills' : 'Training'}:
                </label>
                <input
                  type="text"
                  id="entryInput"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  className="w-full p-2 rounded-md bg-green-700 text-white border border-green-500"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleAdd}
                  className="bg-white text-green-600 py-2 px-4 rounded-md"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsDialogOpen(false)} // Close the dialog on cancel
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-5">
          <div className="mb-6 flex justify-start space-x-4">
            <button
              className={`${
                activeTab === 'Skills' ? 'bg-green-600 text-white' : 'bg-white text-green-600'
              } border-2 border-green-600 py-2 px-4 rounded-md`}
              onClick={() => setActiveTab('Skills')}
            >
              Skills
            </button>
            <button
              className={`${
                activeTab === 'Training' ? 'bg-green-600 text-white' : 'bg-white text-green-600'
              } border-2 border-green-600 py-2 px-4 rounded-md`}
              onClick={() => setActiveTab('Training')}
            >
              Training
            </button>
          </div>

          {/* Conditional Rendering for Tabs */}
          {activeTab === 'Skills' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="px-4 py-3">Data ID</th>
                  <th className="px-4 py-3">Data Skills</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={skill.id} className="bg-green-200 hover:bg-green-300">
                    <td className="border px-4 py-3">{skill.id}</td>
                    <td className="border px-4 py-3">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editSkill}
                          onChange={(e) => setEditSkill(e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-300"
                        />
                      ) : (
                        skill.skill
                      )}
                    </td>
                    <td className="border px-4 py-3 flex space-x-2">
                      {editIndex === index ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                            onClick={saveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                            onClick={() => setEditIndex(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="px-4 py-3">Data ID</th>
                  <th className="px-4 py-3">Data Training</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training, index) => (
                  <tr key={training.id} className="bg-green-200 hover:bg-green-300">
                    <td className="border px-4 py-3">{training.id}</td>
                    <td className="border px-4 py-3">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editTraining}
                          onChange={(e) => setEditTraining(e.target.value)}
                          className="w-full p-2 rounded-md border border-gray-300"
                        />
                      ) : (
                        training.training
                      )}
                    </td>
                    <td className="border px-4 py-3 flex space-x-2">
                      {editIndex === index ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                            onClick={saveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                            onClick={() => setEditIndex(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
