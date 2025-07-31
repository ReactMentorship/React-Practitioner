import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchCategories } from "../../../api/queries/categories/getCategories";
import { usePostsByCategoryQuery } from "../../../api/queries/posts/usePostsByCategoryQuery";
import { usePostsQuery } from "../../../api/queries/posts/usePostsQuery";
import { useNotificationStore } from "../../../stores/notificationStore";
import { Category, Post } from "../../../types";
import CategoryButtonGroup from "../../UI/CategoryButtonGroup";
import CreatePostButton from "../../UI/CreatePostButton";
import EmptyContentPlaceholder from "../../UI/EmptyContentPlaceholder/EmptyContentPlaceholder";
import Form from "../../UI/Forms/PostForm";
import Loading from "../../UI/Loading";
import PostList from "../../UI/PostList";
import { Container } from "./HomePage.styles";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: allPosts, isLoading: loadingAllPosts } = usePostsQuery(
    selectedCategory?.name ?? ""
  );
  const { data: postsByCategory, isLoading: loadingPosts } =
    usePostsByCategoryQuery(selectedCategory?.name ?? "");

  const postList = useMemo(() => {
    const list = selectedCategory ? postsByCategory : allPosts;
    return list && list.length > 0 ? list : null;
  }, [postsByCategory, allPosts, selectedCategory]);

  const notify = useNotificationStore((state) => state.notify);
  const [open, setOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const handleOpenForm = useCallback((defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  }, []);

  const handleSelectCategory = useCallback(
    async (category: Category) => {
      const isCategoryAlreadySelected = category.id === selectedCategory?.id;
      setSelectedCategory(isCategoryAlreadySelected ? null : category);
    },
    [selectedCategory]
  );

  const getCategoriesList = useCallback(async () => {
    const onSuccess = (data: Category[]) => {
      setCategories(data);
    };

    const onError = () => notify("Something went wrong.", "error");

    const onLoading = (isLoading: boolean) => {
      setLoadingCategories(isLoading);
    };

    await fetchCategories({ onSuccess, onError, onLoading });
  }, [notify]);

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  if (loadingPosts || loadingCategories || loadingAllPosts)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <>
      <Container>
        <CreatePostButton handleOpenForm={handleOpenForm} />
        {categories && (
          <CategoryButtonGroup
            categories={categories}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
        )}
        {!postList ? (
          <EmptyContentPlaceholder
            missingItem="post"
            onClick={() => handleOpenForm()}
          />
        ) : (
          <>
            <PostList posts={postList} handleOpenForm={handleOpenForm} />
          </>
        )}
      </Container>
      <Form
        open={open}
        post={selectedPost}
        categories={categories}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
