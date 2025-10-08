import { notFound } from "next/navigation";
import { getCatalogItemById } from "@/lib/catalogData";
import ProductPage from "@/components/product/ProductPage";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getCatalogItemById(id);

  if (!product) {
    return {
      title: "Product Not Found - HomeView360",
      description: "The requested product could not be found.",
      metadataBase: new URL('https://homeview360.app'),
    };
  }

  return {
    title: `${product.name} - HomeView360`,
    description: product.description,
    metadataBase: new URL('https://homeview360.app'),
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.thumbnail ? [
        {
          url: `/${product.thumbnail}`,
          width: 800,
          height: 600,
          alt: product.name,
        }
      ] : [],
    },
  };
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getCatalogItemById(id);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}