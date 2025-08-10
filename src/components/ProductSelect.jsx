import { useEffect, useState } from "react";
import { Select } from "@shopify/polaris";
import { Controller } from "react-hook-form";
import { baseUrl } from "../constants/const";

function ProductSelect({ control, errors }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`, {
          method: "GET",
        });
        const data = await res.json();

        setOptions(
          data.map((prod) => ({
            label: prod.title,
            value: prod.id,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Controller
      name="productId"
      control={control}
      render={({ field }) => (
        <Select
          label="Select Product"
          options={options}
          {...field}
          error={errors.productId?.message}
        />
      )}
    />
  );
}

export default ProductSelect;
