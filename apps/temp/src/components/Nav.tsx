import { fetchCategories } from "@/actions/category";
import Navbar from "./Navbar";

export default async function Nav({ params }: any) {
  //   const { storeName } = params;

  console.log("Received params:", params);
  const { category } = await fetchCategories(params);
  console.log("category", category);

  return (
    <>
      <Navbar category={category} />
    </>
  );
}
