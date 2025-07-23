// Utility để quản lý category mapping
export const categoryMapping: { [key: string]: string } = {
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

export const getCategoryName = (categoryCode: string): string => {
  return categoryMapping[categoryCode] || categoryCode;
};

export const getAllCategories = (
  products: any[]
): { id: string; name: string }[] => {
  if (!products.length) return [];

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  return uniqueCategories.map((categoryCode) => ({
    id: categoryCode,
    name: getCategoryName(categoryCode),
  }));
};
