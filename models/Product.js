const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    images: [String]
}, { timestamps: true });

// Middleware to automatically create inventory when a product is created
productSchema.post('save', async function(doc) {
    try {
        const Inventory = mongoose.model('Inventory');
        const existing = await Inventory.findOne({ product: doc._id });
        if (!existing) {
            await Inventory.create({
                product: doc._id,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            console.log(`Inventory auto-created for Product: ${doc._id}`);
        }
    } catch (error) {
        console.error("Error creating inventory:", error);
    }
});

module.exports = mongoose.model('Product', productSchema);
