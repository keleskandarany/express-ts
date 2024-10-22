import { Router } from 'express';
import { ProductService } from '../services/product.service';
import { ProductDatabaseGateway } from '../gateways/database/product-database-gateway';
import { ProductController } from '../controllers/product.controller';

const router = Router();

const productService = new ProductService(new ProductDatabaseGateway());
const productController = new ProductController(productService);
router.get('/products', async (req, res) => {
  res.status(200).json(await productController.index());
});

router.post('/products', async (req, res) => {
  const createResult = await productController.create(req);
  res.status(createResult.status).json(createResult.response);
});

export default router;
