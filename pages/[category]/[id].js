import React from "react";
import { useRouter } from "next/router";

const ProductSearch = () => {
  const router = useRouter();
  const { category, id } = router.query;
  console.log("******************************", category, id);
  return <div>Product Search</div>;
};

export default ProductSearch;
