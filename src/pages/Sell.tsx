import { Button } from "@/components/retroui/Button";
import { CONDITION } from "@/constants/types";
import { useGetAllCategories } from "@/hooks/admin/useAdmin";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export const Sell = () => {
  const { data: allCategories, isLoading: categoryLoading } =
    useGetAllCategories();
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {submitted ? (
          <div className="text-center py-12">
            <div className="bg-accent border-4 border-black p-8 inline-block">
              <h1 className="text-4xl font-black text-black mb-4">SUCCESS!</h1>
              <p className="text-lg font-bold text-black mb-6">
                Your item has been listed for auction
              </p>
              <p className="text-sm text-black mb-8">
                Our team will review your listing and it will go live within 24
                hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-black text-accent border-3 border-black px-6 py-3 font-black hover:bg-accent hover:text-black transition"
              >
                List Another Item
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-5xl font-black text-black mb-2">
                List Your Item
              </h1>
              <p className="text-lg font-bold text-black border-b-4 border-black pb-4">
                Join thousands of sellers on the world's most trusted auction
                platform
              </p>
            </div>

            <form className="space-y-8">
              {/* Item Details Section */}
              <div className="border-4 border-black p-6 bg-white">
                <h2 className="text-2xl font-black text-black mb-6 border-b-3 border-black pb-3">
                  Item Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-black text-black mb-2">
                      Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      //   value={formData.itemName}
                      //   onChange={handleInputChange}
                      required
                      placeholder="Enter item name"
                      className="w-full px-4 py-3 border-3 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      //   value={formData.description}
                      //   onChange={handleInputChange}
                      required
                      placeholder="Describe your item in detail"
                      rows={5}
                      className="w-full px-4 py-3 border-3 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-black text-black mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        // value={formData.category}
                        // onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-3 border-black bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select a category</option>
                        {allCategories &&
                          allCategories.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-black text-black mb-2">
                        Condition <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="condition"
                        // value={formData.condition}
                        // onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-3 border-black bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select condition</option>
                        {Object.entries(CONDITION).map(([key, value]) => (
                          <option key={key} value={value}>
                            {value}
                          </option>
                        ))}
                        {/* <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option> */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="border-4 border-black p-6 bg-white">
                <h2 className="text-2xl font-black text-black mb-6 border-b-3 border-black pb-3">
                  Pricing
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-black mb-2">
                      Starting Bid <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 border-3 border-r-0 border-black bg-accent font-black text-black">
                        $
                      </span>
                      <input
                        type="number"
                        name="startingBid"
                        // value={formData.startingBid}
                        // onChange={handleInputChange}
                        required
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="flex-1 px-4 py-3 border-3 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2">
                      Buy Now Price (Optional)
                    </label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 border-3 border-r-0 border-black bg-accent font-black text-black">
                        $
                      </span>
                      <input
                        type="number"
                        name="buyNowPrice"
                        // value={formData.buyNowPrice}
                        // onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="flex-1 px-4 py-3 border-3 border-black bg-white text-black placeholder-gray-500 font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Auction Duration Section */}
              <div className="border-4 border-black p-6 bg-white">
                <h2 className="text-2xl font-black text-black mb-6 border-b-3 border-black pb-3">
                  Auction Duration
                </h2>

                <div>
                  <label className="block text-sm font-black text-black mb-2">
                    How long should the auction run?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="auctionDuration"
                    // value={formData.auctionDuration}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-3 border-3 border-black bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="10">10 Days</option>
                    <option value="14">14 Days</option>
                  </select>
                </div>
              </div>

              {/* Images Section */}
              <div className="border-4 border-black p-6 bg-white">
                <h2 className="text-2xl font-black text-black mb-6 border-b-3 border-black pb-3">
                  Images
                </h2>

                <div className="mb-6">
                  <label className="block border-4 border-dashed border-black p-8 text-center cursor-pointer hover:bg-accent/10 transition">
                    <FiUpload className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="font-black text-black mb-1">
                      Click to upload images
                    </p>
                    <p className="text-sm font-bold text-gray-600">
                      or drag and drop
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                {/* {imagePreview.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {imagePreview.map((preview, index) => (
              <div key={index} className="relative border-3 border-black">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center font-black border-2 border-black hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )} */}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-accent text-accent-foreground border-4 border-black font-black text-lg py-6 hover:bg-yellow-400"
                >
                  List Item for Auction
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white text-black border-4 border-black font-black text-lg py-6 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};
