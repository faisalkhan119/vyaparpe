import { redirect } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    // Redirect requests for specific categories to the unified products page with the category filter
    // e.g., /category/electronics -> /products?category=electronics

    // We decode the slug (e.g. from /category/Home%20&%20Kitchen) to ensure proper query param encoding
    const decodedSlug = decodeURIComponent(params.slug);
    redirect(`/products?category=${encodeURIComponent(decodedSlug)}`);
}
