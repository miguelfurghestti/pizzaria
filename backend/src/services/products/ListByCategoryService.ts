import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
}

class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
      select: {
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };
