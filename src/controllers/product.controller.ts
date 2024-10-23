import { ProductService } from '../services/product.service';
import { ProductRequest } from '../requests/product.request';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ConflictException } from '../exceptions/conflict-exception';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import express from 'express';

@controller('/api/products')
export class ProductController {
  constructor(
    @inject(ProductService) private readonly productService: ProductService,
  ) {}

  @httpGet('/')
  async index() {
    return await this.productService.getAllProducts();
  }

  @httpPost('/')
  async create(
    @request() req: express.Request,
    @response() res: express.Response,
  ) {

    //todo check if it can be passed to args
    const productRequest = plainToInstance(ProductRequest, req.body);
    const errors = await validate(productRequest);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const createdProduct =
        await this.productService.createProduct(productRequest);
      return res.status(201).json({ data: createdProduct });
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
