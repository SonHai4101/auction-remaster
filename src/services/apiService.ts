import type {
  Auction,
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
  },
  user: {
    getUser: (): Promise<User> => axiosInstance.get("/auth/me"),
  },
  //   auction: {
  //     getAllAuctions: ()
  //   }

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
  },

  auction: {
    getAllAuctions: (query: {
      page: number;
      limit: number;
      category?: string;
      search?: string;
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
  },
};
