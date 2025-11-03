import type {
  Auction,
  Bid,
  Category,
  Pagination,
  Product,
  User,
} from "@/constants/types";
import { axiosInstance } from "@/lib/axios";

export const apiService = {
  default: {
    upload: (body: { files: File[] }) => {
      const formData = new FormData();
      body.files.forEach((file) => {
        formData.append("files", file);
      });
      return axiosInstance.post("upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    delete: (imageId: string) => axiosInstance.delete(`upload/${imageId}`),
  },
  user: {
    getUser: (): Promise<User> => axiosInstance.get("/auth/me"),
  },

  sellRequest: {
    createSellRequest: (body: {
      productName: string;
      description: string;
      categoryId: string;
      condition: string;
      startPrice: number;
      buyNowPrice: number;
      duration: string;
      images?: string[];
    }) => axiosInstance.post("sell-request/create", body),
    getAllSellRequest: (): Promise<any> => axiosInstance.get("sell-request/").then((res) => res.data)
  },

  admin: {
    createAuction: (body: {
      title: string;
      description: string;
      startPrice: number;
      buyNowPrice: number;
      startTime: string;
      endTime: string;
      productId: string;
    }) => axiosInstance.post("auctions/", body),
    updateAuction: (
      id: string,
      body: {
        title: string;
        description: string;
        startPrice: number;
        buyNowPrice: number;
        startTime: string;
        endTime: string;
        productId: string;
      }
    ) => axiosInstance.put(`auctions/${id}`, body),
    deleteAuction: (id: string) => axiosInstance.delete(`auctions/${id}`),
    createCategory: (body: { name: string; description: string }) =>
      axiosInstance.post("category/", body),
    getAllCategories: (): Promise<Category[]> =>
      axiosInstance.get("category/").then((res) => res.data),
    getCategoryById: (params: { id: string }): Promise<Category> =>
      axiosInstance.get(`category/${params.id}`).then((res) => res.data),
    getProductsByCategoryId: (params: { id: string }): Promise<Product[]> =>
      axiosInstance
        .get(`category/${params.id}/products`)
        .then((res) => res.data),
    getAuctionsByCategoryId: (params: { id: string }): Promise<Auction[]> =>
      axiosInstance
        .get(`category/${params.id}/auctions`)
        .then((res) => res.data),
    getUsers: (): Promise<User[]> =>
      axiosInstance.get("users/").then((res) => res.data),
    changeAuctionStatus: (id: string, body: { status: string }) =>
      axiosInstance.patch(`auctions/${id}`, body),
  },

  auction: {
    getAllAuctions: (query: {
      page: number;
      limit: number;
      category?: string;
      search?: string;
      status?: string;
      sortBy?: string;
      sortOrder?: string;
    }): Promise<{
      data: Auction[];
      pagination: Pagination;
    }> =>
      axiosInstance.get("auctions/", { params: query }).then((res) => res.data),
    getAuctionById: (params: { id: string }): Promise<Auction> =>
      axiosInstance.get(`auctions/${params.id}`),
  },

  products: {
    createProduct: (body: {
      categoryId: string;
      title: string;
      description: string;
      images: string[];
    }) => axiosInstance.post("products/", body),
    updateProduct: (
      productId: string,
      body: {
        categoryId: string;
        title: string;
        description: string;
        images?: string[];
      }
    ) => axiosInstance.put(`products/${productId}`, body),
    deleteProduct: (productId: string) =>
      axiosInstance.delete(`products/${productId}`),
    getProductById: (productId: string): Promise<Product> =>
      axiosInstance.get(`products/${productId}`).then((res) => res.data),
  },

  bid: {
    createBid: (
      auctionId: string,
      body: {
        amount: number;
        isAutoBid: boolean;
        maxAmount: number;
      }
    ) => axiosInstance.post(`bids/auction/${auctionId}`, body),
    getBidByAuctionId: (
      auctionId: string,
      query: {
        page: number;
        limit: number;
      }
    ): Promise<{
      data: Bid[];
      pagination: Pagination;
    }> =>
      axiosInstance
        .get(`bids/auction/${auctionId}`, { params: query })
        .then((res) => res.data),
    buyNow: (auctionId: string) =>
      axiosInstance.post(`bids/auction/${auctionId}/buy-now`),
  },
};
