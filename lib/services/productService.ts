import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import ProductModel, { Product } from '@/lib/models/ProductModel'
import SocialModel, { Social } from '@/lib/models/SocialModel'
import BannerModel, { Banner } from '../models/BannerModel'
import FaqModel, { Faq } from '../models/FaqModel'
import PhotoModel, { Photo } from '../models/PhotoModel'

export const revalidate = 3600

const getLatest = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(10).lean()
  const conversion = products as unknown
  return conversion as Product[]
})

const getPhotos = cache(async () => {
  await dbConnect()
  const photos = await PhotoModel.find({}).sort({ _id: -1 }).lean()
  const conversion = photos as unknown;
  return conversion as Photo[]
})

const getFeatured = cache(async () => {
  await dbConnect()
  const products = await ProductModel.find({ isFeatured: true }).limit(3).lean()
  const conversion = products as unknown;
  return conversion as Product[]
})

const getFaq = cache(async () => {
  await dbConnect()
  const faqs = await FaqModel.find({}).sort({ _id: -1 }).limit(6).lean()
  const conversion = faqs as unknown;
  return conversion as Faq[]
})

const getBySlug = cache(async (slug: string) => {
  await dbConnect()
  const product = await ProductModel.findOne({ slug }).lean()
  const conversion = product as unknown;
  return conversion as Product
})

const getPhotoById = cache(async (id: number) => {
  await dbConnect()
  const photo = await PhotoModel.findOne({ id }).lean()
  const conversion = photo as unknown;
  return conversion as Photo
})

const PAGE_SIZE = 3
const getByQuery = cache(
  async ({
    q,
    category,
    sort,
    price,
    rating,
    page = '1',
  }: {
    q: string
    category: string
    price: string
    rating: string
    sort: string
    page: string
  }) => {
    await dbConnect()

    const queryFilter =
      q && q !== 'all'
        ? {
            name: {
              $regex: q,
              $options: 'i',
            },
          }
        : {}
    const categoryFilter = category && category !== 'all' ? { category } : {}
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {}
    // 10-50
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {}
    const order: Record<string, 1 | -1> =
      sort === 'lowest'
        ? { price: 1 }
        : sort === 'highest'
        ? { price: -1 }
        : sort === 'toprated'
        ? { rating: -1 }
        : { _id: -1 }

    const categories = await ProductModel.find().distinct('category')
    const products : unknown = await ProductModel.find(
      {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
      '-reviews'
    )
      .sort(order)
      .skip(PAGE_SIZE * (Number(page) - 1))
      .limit(PAGE_SIZE)
      .lean()

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })

    return {
      products: products as Product[],
      countProducts,
      page,
      pages: Math.ceil(countProducts / PAGE_SIZE),
      categories,
    }
  }
)

const getCategories = cache(async () => {
  await dbConnect()
  const categories = await ProductModel.find().distinct('category')
  return categories
})

const getSocialMedia = cache(async () => {
  await dbConnect()
  const socials: unknown = await SocialModel.find({}).sort({ _id: -1 }).limit(6).lean()
  return socials as Social[]
})

const getBanners = cache(async () => {
  await dbConnect()
  const banners: unknown = await BannerModel.find({}).sort({ _id: -1 }).limit(6).lean()
  return banners as Banner[]
})

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getFaq,
  getCategories,
  getSocialMedia,
  getBanners,
  getPhotos,
  getPhotoById,
}
export default productService
