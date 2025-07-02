// TODO:********** have to update this so that the routine came in full page ************
import React, { useState } from 'react';
import { Input } from '../../index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function TimeTable() {
  const [subjectName, setSubjectName] = useState('');
  const [thead, setThead] = useState(['Day']);
  const [subject, setSubject] = useState('');
  const [dailyRoutine, setDailyRoutine] = useState([]);
  const [day, setDay] = useState('');
  const [allSubject, setAllSubject] = useState([]);

  const handleHeader = (e) => {
    e.preventDefault();
    if (!subjectName) return;
    setThead((prev) => [...prev, subjectName]);
    setSubjectName('');
  };

  const handleDailyRoutine = (e) => {
    e.preventDefault();
    if (!day || dailyRoutine.length !== thead.length - 1) {
      alert('Enter all subjects for the day (including the day name)');
      return;
    }
    setAllSubject((prev) => [...prev, [day, ...dailyRoutine]]);
    setDailyRoutine([]);
    setDay('');
  };

  const handleAddSubjectToRow = (e) => {
    e.preventDefault();
    if (!subject) return;
    setDailyRoutine((prev) => [...prev, subject]);
    setSubject('');
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    doc.setFontSize(18);
    doc.text('Weekly Study Routine', 105, 20, { align: 'center' }); // Centered title

    autoTable(doc, {
      startY: 30,
      head: [thead],
      body: allSubject,
      theme: 'grid',
      tableWidth: 'auto', // You can try 'wrap' or '100%' if needed
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        halign: 'center',
      },
      bodyStyles: {
        halign: 'center',
      },
      margin: { left: 10, right: 10 }, // consistent margins
    });

    doc.save('study-routine.pdf');
  };

  return (
    <div className="mt-10 px-4">
      {/* Add subject headers */}
      <form onSubmit={handleHeader} className="mb-4">
        <Input
          label="Add Subject Header"
          placeholder="e.g. Maths"
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded-md mt-2" type="submit">
          Add Header
        </button>
      </form>

      {/* Input for day and subjects */}
      <form onSubmit={handleDailyRoutine} className="mb-4 space-y-3">
        <Input
          label="Day"
          placeholder="e.g. Monday"
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <Input
            label="Add Subject for the Day"
            placeholder="e.g. Physics"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md mt-6"
            onClick={handleAddSubjectToRow}
          >
            Add Subject
          </button>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Subjects added for {day}: {dailyRoutine.join(', ')}
        </div>
        <button className="bg-green-600 text-white p-2 rounded-md" type="submit">
          Submit Day's Routine
        </button>
      </form>

      {/* Display table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              {thead.map((head, index) => (
                <th key={index} className="border px-4 py-2">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSubject.map((row, i) => (
              <tr key={i}>
                {row.map((item, j) => (
                  <td key={j} className="border px-4 py-2">
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <button
        onClick={exportToPDF}
        className="bg-red-500 text-white px-4 py-2 mt-6 rounded-md cursor-pointer"
      >
        Export to PDF
      </button>
    </div>
  );
}

export default TimeTable;
