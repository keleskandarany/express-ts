import { ProductDto } from '../dto/product-dto';
import { ProductDatabaseGateway } from '../gateways/database/product-database-gateway';
import { ProductResponseList } from '../responses/product-response-list';
import { ProductRequest } from '../requests/product.request';
import { ProductResponse } from '../responses/product-response';

export class ProductService {
  constructor(private readonly productsDbGateway: ProductDatabaseGateway) {}

  async getAllProducts(): Promise<ProductResponseList> {
    const productDtos: ProductDto[] = await this.productsDbGateway.fetchAll();

    return {
      data: productDtos.map((dto) => ({
        id: dto.id,
        name: dto.name,
        price: dto.price,
        description: dto.description,
      })),
    };
  }

  async createProduct(productData: ProductRequest): Promise<ProductResponse> {
    const productDto = await this.productsDbGateway.create(productData);
    return {
      id: productDto.id,
      name: productDto.name,
      price: productDto.price,
      description: productDto.description,
    };
  }
}
