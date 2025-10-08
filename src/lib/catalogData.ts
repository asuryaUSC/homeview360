import catalogJson from '@/../public/assets/catalog.json';
import { CatalogData, CatalogItem } from '@/types/catalog';

export function getCatalogData(): CatalogData {
  return catalogJson as CatalogData;
}

export function getCatalogItems(): CatalogItem[] {
  return getCatalogData().items;
}

export function getCatalogItemById(id: string): CatalogItem | undefined {
  return getCatalogItems().find(item => item.id === id);
}
