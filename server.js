const express = require('express');
const mongoose = require('mongoose');
const Complaint = require('./path/to/complaintModel'); // Adjust the path as needed

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crime_management', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route to submit a complaint
app.post('/submitComplaint', async (req, res) => {
    const { description, date, time, location, evidence, latitude, longitude } = req.body;

    try {
        const complaint = new Complaint({ 
            description, 
            date, 
            time, 
            location, 
            evidence, 
            latitude, 
            longitude 
        });
        await complaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting complaint', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
