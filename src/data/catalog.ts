import raw from "../../public/assets/catalog.json";

export type CatalogItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  price?: number;
  tags?: string[];
  image?: string;
  thumbnail?: string;
};

// Map the JSON structure to a simple array of items usable by the app
type RawCatalog = {
  items?: Array<{
    id: string;
    sku?: string;
    name?: string;
    category?: string;
    description?: string;
    price?: number;
    tags?: string[];
    thumbnail?: string;
    models?: { glb?: string };
  }>;
};

const json = raw as unknown as RawCatalog;

export const catalogItems: CatalogItem[] = (json.items || []).map((it) => ({
  id: it.id,
  sku: it.sku || "",
  name: it.name || "",
  category: it.category || "",
  description: it.description || "",
  price: it.price ?? 0,
  tags: it.tags || [],
  image: it.thumbnail ? `/${it.thumbnail}` : it.models?.glb ? `/${it.models.glb}` : "/icons/favicon-32.png",
  thumbnail: it.thumbnail ? `/${it.thumbnail}` : undefined,
}));

export default catalogItems;
