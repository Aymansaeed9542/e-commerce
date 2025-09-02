import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card"
import getAllProducts from "./../apis/allProducts"

type Product = {
  imageCover: string;
  category: { name: string };
  title: string;
  price: number;
  ratingsAverage: number;
};



export default async function Home() {
 const data = await getAllProducts()

  return (
      <section className=" w-full my-10  mx-auto md:w-[90%] sm:px-2">
        <div className="flex flex-wrap">

      {data.map((product: Product, idx: number) => <div key={idx} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4  xl:w-1/4 2xl:w-1/5 p-3 ">
       <div  className="inner">
            <Card className="p-2">
  <CardHeader className="p-0 ">
    <img src={product.imageCover} alt="..." className="w-full" />
  </CardHeader>
  <CardContent className="p-0 ">
    <p className="text-green-500">{product.category.name}</p>
    <p className=" line-clamp-1">{product.title}</p>
  </CardContent>
  <CardFooter className="p-0">
    <div className="w-full flex justify-between items-center">
      <p> {product.price}EGP</p>
      <p><i className="fas fa-star text-yellow-400"></i>{product.ratingsAverage}</p>
    </div>
  </CardFooter>
</Card>

          </div>
          </div>)}
        </div>


      </section>
  );
}
