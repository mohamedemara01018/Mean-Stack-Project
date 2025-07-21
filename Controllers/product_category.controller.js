import product_category_model from "../Models/product_category.model.js"


const getAllProductCategory = async (req, res) => {
    try {
        const product_category = await product_category_model
            .find()
            .populate('product', 'name description -_id')
            .populate('category', 'name description -_id');

        res.status(200).json({ message: 'success', product_category });
    } catch (error) {
        res.status(400).json({ message: 'failed', error: error.message });
    }
}



const getProductCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const product_category = await product_category_model
            .findById(id)
            .populate('product', 'name description -_id')
            .populate('category', 'name description -_id');
        if (!product_category) {
            return res.status(404).json({ message: 'not found' })
        }
        res.status(200).json({ message: 'success', product_category })
    } catch (error) {
        res.status(400).json({ message: 'fail', error: error.message })
    }
}

const createNewProductCategory = async (req, res) => {
    const { product, category } = req.body;
    try {
        if (!product || !category) {
            return res.status(403).json({ message: 'must provide product and category' })
        }
        const newProductCategory = await product_category_model.create({ product, category })
        res.status(200).json({ message: 'success', newProductCategory })

    } catch (error) {
        res.status(400).json({ message: 'fail', error: error.message })
    }
}

const updateProductCategory = async (req, res) => {
    const { id } = req.params;
    const updatedProductCategory = req.body;
    try {
        if (!updatedProductCategory) {
            return res.status(403).json({ message: 'must proive body params' })
        }
        const newUpdatedProductCategory = await product_category_model
            .findByIdAndUpdate(id, updatedProductCategory, { new: true })
            .populate('product', 'name description -_id')
            .populate('category', 'name description -_id');


        res.status(200).json({ message: 'success', newUpdatedProductCategory })
    } catch (error) {
        res.status(400).json({ message: 'fail', error: error.message })
    }
}

const deleteProductCategory = async (req, res) => {
    const { id } = req.params
    try {
        await product_category_model.findByIdAndDelete(id)
        res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: 'fail', error: error.message })
    }
}



export { getAllProductCategory, getProductCategoryById, createNewProductCategory, updateProductCategory, deleteProductCategory }