export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

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
  finalPrice: string
  creatorId: string
  productId: string
  winnerId: string
  createdAt: string
  updatedAt: string
}
