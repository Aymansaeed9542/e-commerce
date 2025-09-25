
import getAllProducts from "./../apis/allProducts"
import { getAllCategories } from "@/apis/allCategories"
import CategoriesSlides from "./_components/categoriesSlides/categoriesSlides";
import HomeCard from "./_components/HomeCard/HomeCard";
import MainSlider from "./_components/MainSlider/MainSlider";

type Product = {
  imageCover: string;
  category: { name: string };
  title: string;
  price: number;
  ratingsAverage: number;
  id: number;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export default async function Home() {
 const products = await getAllProducts()
 const categoriesData = await getAllCategories()
 const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : []

 // Group products by category
 const productsByCategory = categories.reduce((acc: Record<string, Product[]>, category: Category) => {
   acc[category.name] = products.filter((product: Product) => product.category?.name === category.name)
   return acc
 }, {})

 // Sort products within each category by rating (highest first)
 Object.keys(productsByCategory).forEach(categoryName => {
   productsByCategory[categoryName].sort((a: Product, b: Product) => b.ratingsAverage - a.ratingsAverage)
 })

 console.log('Products by category:', productsByCategory);
 
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <MainSlider />
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our carefully curated categories to find exactly what you are looking for
            </p>
          </div>
          <CategoriesSlides />
        </div>
      </section>

      {/* Products by Category Sections */}
      {Object.entries(productsByCategory).map(([categoryName, categoryProducts]) => {
        const products = categoryProducts as Product[]
        return products.length > 0 && (
          <section key={categoryName} className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">{categoryName}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Top rated products in {categoryName.toLowerCase()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {products.slice(0, 8).map((product: Product, idx: number) => (
                  <HomeCard key={`${categoryName}-${idx}`} product={product} />
                ))}
              </div>
              
              {/* Removed per request: View All button */}
            </div>
          </section>
        )
      })}

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handpicked products just for you. Quality guaranteed with fast delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.slice(0, 8).map((product: Product, idx: number) => (
              <HomeCard key={`featured-${idx}`} product={product} />
            ))}
          </div>
          
          {/* Removed per request: View All Products CTA */}
        </div>
      </section>
    </main>
  );
}
