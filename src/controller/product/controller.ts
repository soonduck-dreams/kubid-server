import { RequestHandler } from 'express';
import { BadRequestError } from '../../util/customErrors';

import ProductService from '../../service/product.service';
import BiddingService from '../../service/bidding.service';

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts();

    const ret = await Promise.all(
      products.map(async (product) => {
        const currentHighestPrice =
          await BiddingService.getHighestPriceByProductId(product.id);
        return {
          id: product.id,
          productName: product.productName,
          user_id: product.user.id,
          status: product.status,
          currentHighestPrice: currentHighestPrice,
          upperBound: product.upperBound,
          imageId: product.imageId,
          departmentId: product.department.id,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        };
      }),
    );

    if (!products || !ret)
      throw new BadRequestError('정보를 불러오는데 실패했어요.');

    res.json(ret);
  } catch (error) {
    next(error);
  }
};

export const bidProduct: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new BadRequestError('로그인이 필요합니다.');

    const productId = Number(req.params.id);
    if (!productId) throw new BadRequestError('상품 아이디를 확인해주세요.');

    const price = Number(req.body.biddingPrice);
    if (!price) throw new BadRequestError('입찰 가격을 확인해주세요.');

    const bidding = await BiddingService.bidProductByIds(
      userId,
      productId,
      price,
    );

    res.status(201).json({ bidding });
  } catch (error) {
    next();
  }
};
