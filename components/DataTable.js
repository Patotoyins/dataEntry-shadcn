import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  
  export default function DataTable({ activeTab, data, editIndex, setEditIndex, onSave, onDelete, onEdit, editEntry, setEditEntry }) {
    return (
      <Table>
        <TableCaption>List of {activeTab}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Data ID</TableHead>
            <TableHead>Data {activeTab}</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editEntry}
                    onChange={(e) => setEditEntry(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300"
                  />
                ) : (
                  item[activeTab.toLowerCase()]
                )}
              </TableCell>
              <TableCell className="flex space-x-2">
                {editIndex === index ? (
                  <>
                    <Button onClick={onSave} variant="default">
                      Save
                    </Button>
                    <Button onClick={() => setEditIndex(null)} variant="destructive">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => onEdit(index)} variant="default">
                      Edit
                    </Button>
                    <Button onClick={() => onDelete(index)} variant="destructive">
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  