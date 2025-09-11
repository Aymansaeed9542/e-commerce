import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from "next/link"

type Product = {
  imageCover: string
  category: { name: string }
  title: string
  price: number
  ratingsAverage: number
  id : number
}


const HomeCard =({ product }: { product: Product })  => {
  console.log(product);
  
  return (
    <div className="group h-full">
      <div className="bg-white dark:bg-black/20 dark:backdrop-blur-md rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-white/10 h-full flex flex-col">
        <Link href={`/productDetails/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={product.imageCover} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                {product.category?.name || ""}
              </span>
            </div>
          </div>
        </Link>
        
        <div className="p-4 flex-1 flex flex-col">
          <Link href={`/productDetails/${product.id}`} className="block">
            <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-primary">
              {product.price} EGP
            </span>
            <div className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400 text-sm"></i>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.ratingsAverage}
              </span>
            </div>
          </div>
          
          <div className="mt-auto">
            <Link 
              href="/cart" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard