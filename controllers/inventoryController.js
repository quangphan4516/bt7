const Inventory = require('../models/Inventory');

// get all, get inventory by ID (có join với product)
exports.getAll = async (req, res) => {
    try {
        const inventories = await Inventory.find().populate('product');
        res.status(200).json(inventories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id).populate('product');
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add_stock ({product, quantity} - POST tăng stock tương ứng với quantity)
exports.addStock = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        if (!quantity || quantity <= 0) return res.status(400).json({ message: "Quantity must be > 0" });
        
        let inventory = await Inventory.findOne({ product });
        if (!inventory) return res.status(404).json({ message: "Inventory not found for this product" });
        
        inventory.stock += Number(quantity);
        await inventory.save();
        res.status(200).json({ message: "Stock added successfully", inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove_stock ({product, quantity} - POST giảm stock tương ứng với quantity)
exports.removeStock = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        if (!quantity || quantity <= 0) return res.status(400).json({ message: "Quantity must be > 0" });
        
        let inventory = await Inventory.findOne({ product });
        if (!inventory) return res.status(404).json({ message: "Inventory not found for this product" });
        
        if (inventory.stock < quantity) return res.status(400).json({ message: "Not enough stock to remove" });

        inventory.stock -= Number(quantity);
        await inventory.save();
        res.status(200).json({ message: "Stock removed successfully", inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// reservation ({product, quantity} - POST giảm stock và tăng reserved tương ứng với quantity)
exports.reservation = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        if (!quantity || quantity <= 0) return res.status(400).json({ message: "Quantity must be > 0" });
        
        let inventory = await Inventory.findOne({ product });
        if (!inventory) return res.status(404).json({ message: "Inventory not found for this product" });
        
        if (inventory.stock < quantity) return res.status(400).json({ message: "Not enough stock to reserve" });

        inventory.stock -= Number(quantity);
        inventory.reserved += Number(quantity);
        await inventory.save();
        res.status(200).json({ message: "Reserved successfully", inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// sold ({product, quantity} - POST giảm reservation và tăng soldCount tương ứng với quantity)
exports.sold = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        if (!quantity || quantity <= 0) return res.status(400).json({ message: "Quantity must be > 0" });
        
        let inventory = await Inventory.findOne({ product });
        if (!inventory) return res.status(404).json({ message: "Inventory not found for this product" });
        
        if (inventory.reserved < quantity) return res.status(400).json({ message: "Not enough reserved stock to sell" });

        inventory.reserved -= Number(quantity);
        inventory.soldCount += Number(quantity);
        await inventory.save();
        res.status(200).json({ message: "Sold successfully", inventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
