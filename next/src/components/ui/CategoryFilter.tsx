"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { CategoriesResponse } from "@/lib/definitions";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api/categoriesApi";
import { Autocomplete, TextField } from "@mui/material";

function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const selectedCategory = categories?.find(
    (category) => category.name === searchParams?.get("category")
  )  ?? null

  const handleSelectCategory = (category: CategoriesResponse | null) => {
    if (!category) return router.push(pathname);

    const currentCategoryName = searchParams.get("category");
    const params = new URLSearchParams(searchParams?.toString());
    params.set("category", category.name);
    const newRoute =
      currentCategoryName === category.name ? pathname : `${pathname}?${params}`;
    router.push(newRoute);
  };

  if (!categories) return <></>;

  return (
    <Autocomplete
      options={categories}
      sx={{ width: 300 }}
      value={selectedCategory}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Category" />}
      onChange={(_, newValue: CategoriesResponse | null) => {
        handleSelectCategory(newValue);
      }}
    />
  );
}

export default CategoryFilter;
