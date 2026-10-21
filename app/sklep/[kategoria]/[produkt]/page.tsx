import { notFound } from "next/navigation";
import { CATEGORIES, findProduct } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    c.products.map((p) => ({ kategoria: c.slug, produkt: p.slug }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { kategoria: string; produkt: string };
}) {
  const found = findProduct(params.kategoria, params.produkt);
  return {
    title: found ? `${found.product.name} – Royal Flowers` : "Sklep – Royal Flowers",
  };
}

export default function ProduktPage({
  params,
}: {
  params: { kategoria: string; produkt: string };
}) {
  const found = findProduct(params.kategoria, params.produkt);
  if (!found) notFound();

  return <ProductDetail category={found.category} product={found.product} />;
}
