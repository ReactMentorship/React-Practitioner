"use client";
import { fetchCategories } from "@/lib/api/categoriesApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

import GlobalError from "@/app/error";
import { deleteCategory } from "@/lib/api/categoriesApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import EmptyContentPlaceholder from "./ui/EmptyContentPlaceholder";
import Loading from "./ui/Loading";
import SeoFriendlyDataGrid from "./ui/SeoFriendlyDataGrid";

const paginationModel = { page: 0, pageSize: 5 };

const Categories = () => {
  const queryClient = useQueryClient();

  const {
    data: allCategories,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: true,
  });
  const router = useRouter();

  const { mutate: mutateDeleteCategory, isPending: deletingCategory } =
    useMutation({
      mutationFn: deleteCategory,
      onSuccess: async (id) => {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        await queryClient.invalidateQueries({ queryKey: ["category", id] });
      },
      onError: (error) => {
        // Optionally handle error
        console.error("Failed to delete category:", error);
      },
    });

  const handleDelete = (categoryID: string) => {
    mutateDeleteCategory(categoryID);
  };

  const handleOpenForm = (categoryID?: string) => {
    if (categoryID) {
      router.push(`/categories/edit/${categoryID}`);
    } else {
      router.push(`/categories/create`);
    }
  };

  const categoryColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={`edit-${params.id}`}
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpenForm(String(params.id))}
          showInMenu
        />,
        <GridActionsCellItem
          key={`delete-${params.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(String(params.id))}
          showInMenu
        />,
      ],
    },
  ];

  const categoryRows = useMemo(
    () =>
      allCategories?.map(
        (cat: {
          id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
        }) => ({
          id: cat.id,
          name: cat.name,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
        })
      ) || [],
    [allCategories]
  );

  if (isLoading || deletingCategory)
    return (
      <div className="h-[calc(100vh-80px)]">
        <Loading />
      </div>
    );

  if (isError) return <GlobalError error={error} />;

  return (
    <div className="flex flex-col gap-4 p-8 flex-grow h-full bg-[#f2f4f7] overflow-auto">
      <div className="flex justify-end">
        <IconButton onClick={() => handleOpenForm()}>
          <AddCircleIcon />
        </IconButton>
      </div>
      <div className="flex-grow">
        {categoryRows && categoryRows.length > 0 ? (
          <Paper sx={{ height: 400, width: "100%" }}>
            <SeoFriendlyDataGrid
              rows={categoryRows}
              columns={categoryColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>
        ) : (
          <EmptyContentPlaceholder
            missingItem="category"
            missingItems="categories"
            onClick={handleOpenForm}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
