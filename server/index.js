const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbconnect = require('./services/dbconnect');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
dbconnect();

const addevent = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start: { // Use `startd` consistently
        type: Date,
        required: true
    },
    end: { // Use `startd` consistently
        type: Date,
        required: true
    }
}, { collection: "event" });

const addeventschema = mongoose.model("event", addevent);

// Route to fetch events
app.get('/event', async (req, resp) => {
    try {
        const data = await addeventschema.find();
        resp.status(200).json(data);
    } catch (error) {
        console.error('Error fetching events:', error);
        resp.status(500).json({ message: 'Error fetching events', error });
    }
});

// Route to add a new event
app.post('/addevent', async (req, resp) => {
    
    const { title,  startDateTime, endDateTime } = req.body;
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const newevent = new addeventschema({
        title,
        start: startDate,
        end:endDate
    });
    try {
        const eventadded = await newevent.save();
        resp.status(201).json(eventadded);
    } catch (error) {
        console.error('Error saving item:', error);
        resp.status(500).json({ message: 'Error saving item', error });
    }
});

// Start the server
app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
