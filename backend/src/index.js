const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Sale = require('./models/Sale');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_sales';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));



// Helper function to parse date "YYYY-MM-DD"
const parseDate = (dateStr) => new Date(dateStr);

app.get('/api/sales', async (req, res) => {
    try {
        let {
            page = 1,
            limit = 10,
            search = '',
            region,
            gender,
            age_min,
            age_max,
            category,
            payment_method,
            date_start,
            date_end,
            sort_by,
            sort_order = 'asc',
            tags
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {};

        // 1. Search
        if (search) {
            query.$or = [
                { 'Customer Name': { $regex: search, $options: 'i' } },
                { 'Phone Number': { $regex: search, $options: 'i' } }
            ];
        }

        // 2. Filters
        if (region) query['Customer Region'] = { $in: region.split(',') };
        if (gender) query['Gender'] = { $in: gender.split(',') };
        if (category) query['Product Category'] = { $in: category.split(',') };
        if (payment_method) query['Payment Method'] = { $in: payment_method.split(',') };

        if (age_min || age_max) {
            query['Age'] = {};
            if (age_min) query['Age'].$gte = parseInt(age_min);
            if (age_max) query['Age'].$lte = parseInt(age_max);
        }

        if (date_start || date_end) {
            query['Date'] = {};
            if (date_start) query['Date'].$gte = parseDate(date_start);
            if (date_end) query['Date'].$lte = parseDate(date_end);
        }

        if (tags) {
            const tagList = tags.split(',').map(t => new RegExp(t.trim(), 'i'));
            query['Tags'] = { $in: tagList }; // Simple regex match for tags string
        }

        // 3. Sorting
        const sort = {};
        if (sort_by) {
            sort[sort_by] = sort_order === 'asc' ? 1 : -1;
        } else {
            sort['Date'] = -1;
        }

        // 4. Pagination
        const total = await Sale.countDocuments(query);
        const data = await Sale.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/filters', async (req, res) => {
    try {
        const [regions, genders, categories, payment_methods, allTags] = await Promise.all([
            Sale.distinct('Customer Region'),
            Sale.distinct('Gender'),
            Sale.distinct('Product Category'),
            Sale.distinct('Payment Method'),
            Sale.distinct('Tags') // This might return comma-separated strings, need processing?
        ]);

        // Process tags if they are stored as comma-separated strings
        // Since distinct returns the exact field values, we might get "Tag1, Tag2".
        // For a cleaner approach with 1M rows, doing this in memory after distinct is okay-ish if unique combinations aren't huge.
        // Or we can just return them as is if the frontend handles it, but frontend expects individual tags.
        // Let's try to split them.
        const uniqueTags = [...new Set(allTags.flatMap(t => t ? t.split(',').map(tag => tag.trim()) : []))].sort();

        res.json({
            regions: regions.sort(),
            genders: genders.sort(),
            categories: categories.sort(),
            payment_methods: payment_methods.sort(),
            tags: uniqueTags
        });
    } catch (error) {
        console.error('Error fetching filters:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/health', async (req, res) => {
    try {
        const count = await Sale.countDocuments();
        res.json({ status: 'ok', count });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Export for Vercel
module.exports = app;

// Start server if running directly
if (require.main === module) {
    const startServer = async () => {
        try {
            // await seedData(); // Seeding removed
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    };
    startServer();
}
