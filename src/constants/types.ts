export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// export interface Auction {
//   id: string
//   title: string
//   description: string
//   startPrice: string
//   currentPrice: string
//   buyNowPrice: string
//   startTime: string
//   endTime: string
//   status: string
//   finalPrice: string
//   creatorId: string
//   productId: string
//   winnerId: string
//   createdAt: string
//   updatedAt: string
// }

export interface Auction {
  id: string
  title: string
  description: string
  startPrice: string
  currentPrice: string
  buyNowPrice: string
  startTime: string
  endTime: string
  status: string
  finalPrice: any
  creatorId: string
  productId: string
  winnerId: any
  createdAt: string
  updatedAt: string
  creator: Creator
  product: Product
  bids: any[]
  _count: Count
}

export interface Creator {
  id: string
  username: string
}

export interface Product {
  id: string
  sellerId: string
  categoryId: string
  title: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Count {
  bids: number
  watchlist: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}