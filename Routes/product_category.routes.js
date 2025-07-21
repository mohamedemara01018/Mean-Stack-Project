import express from 'express'
import {
    getAllProductCategory,
    getProductCategoryById,
    createNewProductCategory,
    updateProductCategory,
    deleteProductCategory,
} from '../Controllers/product_category.controller.js';

const router = express.Router();

router.get('/', getAllProductCategory);
router.get('/:id', getProductCategoryById);
router.post('/', createNewProductCategory);
router.patch('/:id', updateProductCategory);
router.delete('/:id', deleteProductCategory);


export default router