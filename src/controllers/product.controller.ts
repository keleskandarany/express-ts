import { ProductService } from '../services/product.service';
import { ProductRequest } from '../requests/product.request';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConflictException } from '../exceptions/conflict-exception';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async index() {
    return await this.productService.getAllProducts();
  }

  async create(req: any) {
    const productRequest: ProductRequest = plainToInstance(
      ProductRequest,
      req.body,
    );
    const errors = await validate(productRequest);

    if (errors.length > 0) {
      return { status: 400, response: errors };
    }

    try {
      const createdProduct =
        await this.productService.createProduct(productRequest);
      return { status: 201, response: createdProduct };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          status: error.statusCode,
          response: { message: error.message },
        };
      }
      return { status: 500, response: { message: 'Internal Server Error' } };
    }
  }
}
