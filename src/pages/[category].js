import React, { useRef, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CategoryContent from "./components/CategoryContent";
import { useRouter } from "next/router";
import Loading from "./components/Loading";

const CategoryData = () => {
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category]);

  return (
    <div>
      {loading ? <Loading></Loading> : null}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CategoryContent category={category}></CategoryContent>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      category: query.category,
    },
  };
};

export default CategoryData;
