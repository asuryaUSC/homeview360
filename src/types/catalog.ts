export interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  type: string;
  description: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  models: {
    glb: string;
    glb_size_mb: number;
    usdz: string;
    usdz_size_mb: number;
    vertices: number;
    faces: number;
  };
  thumbnail: string | null;
  tags: string[];
  ar_compatible: boolean;
  in_stock: boolean;
}

export interface CatalogData {
  metadata: {
    version: string;
    generated: string;
    collection: string;
    total_items: number;
    formats: string[];
  };
  statistics: {
    total_items: number;
    by_category: Record<string, number>;
    by_type: Record<string, number>;
    price_range: {
      min: number;
      max: number;
    };
  };
  items: CatalogItem[];
}
