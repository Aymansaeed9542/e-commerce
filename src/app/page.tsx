
import getAllProducts from "./../apis/allProducts"
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




export default async function Home() {
 const data = await getAllProducts()

 console.log(data);
 
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

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Handpicked products just for you. Quality guaranteed with fast delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
            {data.map((product: Product, idx: number) => (
              <HomeCard key={idx} product={product} />
            ))}
          </div>
          
          {/* View All Products CTA */}
          <div className="text-center mt-12">
            <a 
              href="/products" 
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-animate"
            >
              View All Products
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors btn-animate">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
