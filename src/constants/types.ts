export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatarUrl?: string;
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
  id: string;
  title: string;
  description: string;
  startPrice: string;
  currentPrice: string;
  buyNowPrice: string;
  startTime: string;
  endTime: string;
  status: string;
  finalPrice: any;
  creatorId: string;
  productId: string;
  winnerId: any;
  createdAt: string;
  updatedAt: string;
  creator: Creator;
  product: Product;
  bids: Bid[];
  _count: Count;
}

export interface Bid {
  id: string
  amount: string
  bidderId: string
  auctionId: string
  isAutoBid: boolean
  maxAmount: string
  createdAt: string
  bidder: Bidder
}

export interface Bidder {
  id: string
  username: string
}

export interface Creator {
  id: string;
  username: string;
}

export interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Count {
  bids: number;
  watchlist: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
