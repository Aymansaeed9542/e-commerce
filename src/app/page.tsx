
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
      <>
        <section className="w-full my-0">
          <MainSlider />
          <CategoriesSlides />
        </section>

        <section className="w-full my-10 mx-auto md:w-[90%] sm:px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((product: Product, idx: number) => (
              <HomeCard key={idx} product={product} />
            ))}
          </div>
        </section>
      </>
  );
}
