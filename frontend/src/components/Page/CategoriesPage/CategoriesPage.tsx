import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createCategoryQuery } from "../../../api/queries/categories/createCategory";
import { deleteCategoryQuery } from "../../../api/queries/categories/deleteCategory";
import { fetchCategories } from "../../../api/queries/categories/getCategories";
import { updateCategoryQuery } from "../../../api/queries/categories/updateCategory";
import { useNotificationStore } from "../../../stores/notificationStore";
import { Category, GenericObject, Inputs } from "../../../types";
import Modal from "../../UI/Forms/Modal";
import Loading from "../../UI/Loading";
import { PageContainer } from "./CategoriesPage.styles";

const INPUTS: Inputs = [
  {
    id: "name_id",
    name: "name",
    label: "Name",
    type: "text",
  },
];

const EMPTY_INPUTS = { name: "", description: "", id: "" };

const DG_PAGE_SIZE_OPTIONS = [5, 10];
const DG_SX = { border: 0 };
const DG_INITIAL_STATE = {
  pagination: {
    paginationModel: { page: 0, pageSize: 5 },
  },
};

function CategoriesPage() {
  const notify = useNotificationStore((state) => state.notify);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [initialState, setInitialState] = useState<Category | undefined>();
  const [allCategories, setAllCategories] = useState<undefined | Category[]>();

  const handleOpenModal = () => setOpenModal(true);

  const handleClose = () => {
    setOpenModal(false);
    setInitialState(undefined);
  };

  const onLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const getCategoriesList = useCallback(async () => {
    const onSuccess = (data: Category[]) => {
      setAllCategories(data);
    };

    const onError = () => {
      notify("Something went wrong.", "error");
    };

    await fetchCategories({ onSuccess, onError, onLoading });
  }, [notify]);

  const handleSubmit = async (formData: GenericObject) => {
    const category = { ...formData } as Category;

    const onSuccess = async () => {
      handleClose();
      await getCategoriesList();
      notify(
        `Category successfully ${initialState ? "updated" : "uploaded"}.`,
        "success"
      );
    };

    const onError = () => {
      notify("Something went wrong while trying to upload the category.", "error");
    };

    if (!initialState) {
      await createCategoryQuery({
        categoryName: category.name,
        onSuccess,
        onError,
        onLoading,
      });
    } else {
      await updateCategoryQuery({
        updatedCategory: category,
        onSuccess,
        onError,
        onLoading,
      });
    }
  };

  const handleEditItem = useCallback((item: Category) => {
    setInitialState(item);
    setOpenModal(true);
  }, []);

  const removeCategory = useCallback(
    async (categoryID: string) => {
      const onSuccess = async () => {
        await getCategoriesList();
        notify("Category deleted succesfully", "success");
      };

      const onError = () => notify("Something went wrong while trying to delete the category.", "error");

      await deleteCategoryQuery({ categoryID, onSuccess, onError, onLoading });
    },
    [notify, getCategoriesList]
  );

  const columns: GridColDef[] = useMemo(
    () => [
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
            onClick={() => handleEditItem(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            key={`delete-${params.id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => removeCategory(String(params.id))}
            showInMenu
          />,
        ],
      },
    ],
    [removeCategory, handleEditItem]
  );

  const rows = useMemo(
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

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  if (loading || !rows) return <Loading />;

  return (
    <PageContainer container>
      <Grid sx={{ justifyContent: "flex-end", display: "flex" }}>
        <IconButton onClick={handleOpenModal}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      <Grid sx={{ flexGrow: 1 }}>
        <Paper elevation={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={DG_INITIAL_STATE}
            pageSizeOptions={DG_PAGE_SIZE_OPTIONS}
            sx={DG_SX}
          />
        </Paper>
      </Grid>
      <Modal
        inputs={INPUTS}
        open={openModal}
        emptyInputs={EMPTY_INPUTS}
        initialState={initialState}
        title={`${initialState ? "Update" : "Create"} Category`}
        cancelButtonProps={{ name: "Cancel" }}
        submitButtonProps={{ name: initialState ? "Update" : "Create" }}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </PageContainer>
  );
}

export default CategoriesPage;
