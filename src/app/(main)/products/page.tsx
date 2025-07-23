import Products from "@/components/products/products";

export default function ProductsPage() {
  return (
    <div className="my-4">
      <div className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Sản phẩm của chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp những thiết bị, linh kiện điện tử
          </p>
        </div>
        <Products />
      </div>
    </div>
  );
}
