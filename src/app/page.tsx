
import getAllProducts from "./../apis/allProducts"
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

  return (


      <section className=" w-full my-10  mx-auto md:w-[90%] sm:px-2">
            <MainSlider />
        <div className="flex flex-wrap">

      {data.map((product: Product, idx: number) => <HomeCard key={idx} product={product}/>)}
        </div>


      </section>
  );
}
