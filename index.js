import React, { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('itax');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const notices = [
    {
      clientName: 'ABC Pvt Ltd',
      pan: 'AABCA1234F',
      type: '142(1)',
      dueDate: '2025-07-10',
      status: 'Pending',
      email: 'abc@example.com',
      whatsapp: '+919999999999'
    }
  ];

  const sendReminder = async (notice) => {
    try {
      const response = await fetch('/api/send-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
      });
      const data = await response.json();
      alert(data.message || 'Reminder sent');
    } catch (error) {
      console.error(error);
      alert('Failed to send reminder');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Bulk Reminder Dashboard</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setTab('itax')}>Income Tax</button>
        <button onClick={() => setTab('gst')}>GST</button>
        <button onClick={() => setTab('tds')}>TDS</button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={(e) => setReminderEnabled(e.target.checked)}
          /> Enable Auto Reminders
        </label>
      </div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Client</th>
            <th>PAN</th>
            <th>Notice</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((n, idx) => (
            <tr key={idx}>
              <td>{n.clientName}</td>
              <td>{n.pan}</td>
              <td>{n.type}</td>
              <td>{n.dueDate}</td>
              <td>{n.status}</td>
              <td>
                <button onClick={() => sendReminder(n)}>Send Reminder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}