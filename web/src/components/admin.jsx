import React, { useEffect, useState } from "react";
import axios from 'axios';

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDateTime: "",
    endDateTime: ""
  });
  const [events, setEvents] = useState([]);

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_EVENT_API}/addevent`, formData);
      alert("New Event Added");
      setFormData({
        title: "",
        startDateTime: "",
        endDateTime: ""
      })
      setEvents([...events, response.data]);
      toggleModal();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Fetch events data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_EVENT_API}/event`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Remove event
  // const handleRemoveEvent = async (id) => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_EVENT_API}/delete/?${id}`);
  //     setEvents(events.filter(event => event._id !== id));
  //   } catch (error) {
  //     console.error("Error removing event:", error);
  //   }
  // };

  return (
    <>
      <header className="w-full px-4 md:px-8 lg:px-16 py-4 bg-[#003366] text-white">
        <div className="max-w-[650px] mx-auto flex items-center justify-between font-sans">
          <h1 className="text-xl md:text-2xl font-semibold tracking-wide">Hello Admin</h1>
          <div className="flex space-x-4">
            <button onClick={toggleModal} className="bg-[#0056b3] text-white px-4 py-2 rounded hover:bg-[#004080] transition">
              Add Event
            </button>
            <button className="bg-[#ff6600] text-white px-4 py-2 rounded hover:bg-[#cc5200] transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 lg:p-16 font-sans bg-[#f5f5f5] min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">All Events</h2>
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100">
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">S.no.</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Event Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Start Date</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">End Date</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{event.title}</td>
                  <td className="py-3 px-4">{new Date(event.start).toLocaleString()}</td>
                  <td className="py-3 px-4">{new Date(event.end).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {new Date(event.end) > new Date() ? "Upcoming" : "Completed"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemoveEvent(event._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
                <form onSubmit={handleSubmit}>
                  <label className="block mb-2">
                    Event Title:
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Start Date & Time:
                    <input
                      type="datetime-local"
                      name="startDateTime"
                      value={formData.startDateTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded"
                      required
                    />
                  </label>
                  <label className="block mb-4">
                    End Date & Time:
                    <input
                      type="datetime-local"
                      name="endDateTime"
                      value={formData.endDateTime}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border rounded"
                      required
                    />
                  </label>
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={toggleModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[#0056b3] text-white rounded hover:bg-[#004080]">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
