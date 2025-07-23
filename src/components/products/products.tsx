"use client";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import {
  Card,
  Button,
  Select,
  Row,
  Col,
  Checkbox,
  Collapse,
  Spin,
  Alert,
  Empty,
} from "antd";
import type { CollapseProps } from "antd";
import {
  DownOutlined,
  ShoppingCartOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import type { Product, ProductCategory } from "@/types";
import { fetcher } from "@/lib/api/api";
import { useRouter } from "next/navigation";

const { Option } = Select;

const priceRanges = [
  { id: "under-1m", label: "Dưới 1.000.000", min: 0, max: 1000000 },
  { id: "1m-2m", label: "1 - 2 triệu", min: 1000000, max: 2000000 },
  { id: "2m-3m", label: "2 - 3 triệu", min: 2000000, max: 3000000 },
  {
    id: "over-3m",
    label: "Trên 3 triệu",
    min: 3000000,
    max: Number.POSITIVE_INFINITY,
  },
];

const sortOptions = [
  { value: "price-asc", label: "Giá: tăng dần" },
  { value: "price-desc", label: "Giá: giảm dần" },
  { value: "name-asc", label: "Tên: A → Z" },
  { value: "name-desc", label: "Tên: Z → A" },
  { value: "newest", label: "Mới nhất" },
  { value: "bestseller", label: "Bán chạy nhất" },
];

const categoryMapping: { [key: string]: string } = {
  mouse: "Chuột",
  keyboard: "Bàn phím",
  ram: "RAM",
  storage: "Ổ cứng",
  cpu: "CPU",
  gpu: "Card đồ họa",
  motherboard: "Bo mạch chủ",
  psu: "Nguồn máy tính",
  case: "Vỏ máy tính",
  cooling: "Tản nhiệt",
};

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Fetch products data
  const { data, error, isLoading } = useSWR("/products/getAll", fetcher);

  // Process products data and convert string prices to numbers
  useEffect(() => {
    if (data?.products) {
      const processedProducts = data.products.map((product: any) => ({
        ...product,
        price: Number.parseFloat(product.price),
        originalPrice: product.originalPrice
          ? Number.parseFloat(product.originalPrice)
          : undefined,
        discount: product.discount
          ? Number.parseFloat(product.discount)
          : undefined,
      }));
      setProducts(processedProducts);
    }
  }, [data]);

  // Extract unique categories from products
  const categories: ProductCategory[] = useMemo(() => {
    if (!products.length) return [];
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return uniqueCategories.map((categoryCode) => ({
      id: categoryCode,
      name: categoryMapping[categoryCode] || categoryCode,
    }));
  }, [products]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handlePriceRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, rangeId]);
    } else {
      setSelectedPriceRanges(
        selectedPriceRanges.filter((id) => id !== rangeId)
      );
    }
  };

  const filteredProducts = products.filter((product: Product) => {
    // Filter by category
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    ) {
      return false;
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      const matchesPriceRange = selectedPriceRanges.some((rangeId) => {
        const range = priceRanges.find((r) => r.id === rangeId);
        if (!range) return false;
        return product.price >= range.min && product.price < range.max;
      });
      if (!matchesPriceRange) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.productName.localeCompare(b.productName);
      case "name-desc":
        return b.productName.localeCompare(a.productName);
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case "bestseller":
        return a.isBestSeller ? -1 : b.isBestSeller ? 1 : 0;
      default:
        return 0;
    }
  });

  // Create collapse items for filters
  const collapseItems: CollapseProps["items"] = [
    {
      key: "categories",
      label: "Danh mục sản phẩm",
      children: isLoading ? (
        <div className="flex justify-center">
          <Spin size="small" />
        </div>
      ) : error ? (
        <Alert message="Không thể tải danh mục" type="error" showIcon />
      ) : categories.length === 0 ? (
        <div className="text-gray-500 text-sm">Không có danh mục</div>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <Checkbox
                onChange={(e) =>
                  handleCategoryChange(category.id, e.target.checked)
                }
                checked={selectedCategories.includes(category.id)}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "price",
      label: "Lọc giá",
      children: (
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id}>
              <Checkbox
                onChange={(e) =>
                  handlePriceRangeChange(range.id, e.target.checked)
                }
                checked={selectedPriceRanges.includes(range.id)}
              >
                {range.label}
              </Checkbox>
            </div>
          ))}
        </div>
      ),
    },
  ];

  // Render Products Grid Content
  const renderProductsContent = () => {
    // Show loading state for products grid
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      );
    }

    // Show error state for products grid
    if (error) {
      return (
        <div className="flex justify-center items-center py-20">
          <Alert
            message="Lỗi"
            description="Không thể tải danh sách sản phẩm. Vui lòng thử lại sau."
            type="error"
            showIcon
          />
        </div>
      );
    }

    // Show empty state when no products
    if (products.length === 0) {
      return <Empty description="Không có sản phẩm nào" />;
    }

    // Show empty state when no products match filters
    if (sortedProducts.length === 0) {
      return (
        <div className="text-center py-12">
          <Empty description="Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn." />
        </div>
      );
    }

    // Show products grid
    return (
      <Row gutter={[16, 16]}>
        {sortedProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="h-full relative"
              cover={
                <div className="relative p-4 bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.productName}
                    width={200}
                    height={200}
                    className="w-full h-48 object-contain"
                  />
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round(product.discount)}%
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      MỚI
                    </div>
                  )}
                  {product.isBestSeller && !product.isNew && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      BÁN CHẠY
                    </div>
                  )}
                </div>
              }
              styles={{ body: { padding: "12px" } }}
            >
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
                  {product.productName}
                </h3>
                <div className="space-y-1">
                  <div className="text-lg font-bold text-red-600">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <div className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                </div>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  className="w-full mt-3"
                  size="small"
                  onClick={() =>
                    router.push(`/checkout?productId=${product.id}`)
                  }
                >
                  MUA NGAY
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <FilterOutlined className="mr-2" /> Bộ lọc
        </h2>
        <Collapse
          defaultActiveKey={["categories", "price"]}
          ghost
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          items={collapseItems}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-500">
              LINH KIỆN MÁY TÍNH
            </h1>
            <p className="text-gray-600">
              {isLoading ? "Đang tải..." : `${sortedProducts.length} sản phẩm`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sắp xếp</span>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 200 }}
              suffixIcon={<DownOutlined />}
              disabled={isLoading}
            >
              {sortOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {renderProductsContent()}
      </div>
    </div>
  );
}
