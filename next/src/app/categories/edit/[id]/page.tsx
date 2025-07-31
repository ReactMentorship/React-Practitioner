"use client";
import GlobalError from "@/app/error";
import NotFound from "@/app/not-found";
import { CategoryForm } from "@/components/forms/CategoryForm";
import Loading from "@/components/ui/Loading";
import { fetchCategoryById } from "@/lib/api/categoriesApi";
import { useQuery } from "@tanstack/react-query";
import { Usable, use } from "react";

interface EditCategoryProps {
  params: Usable<{ id: string }>;
}

const EditCategory = ({ params }: EditCategoryProps) => {
  const { id } = use(params);

  const {
    data: category,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: fetchCategoryById,
  });

  if (isLoading)
    return (
      <div className="h-[calc(100vh-80px)]">
        <Loading />
      </div>
    );
  if (isError) return <GlobalError error={error} />;
  if (!category) return <NotFound />;

  return <CategoryForm category={category} />;
};

export default EditCategory;
