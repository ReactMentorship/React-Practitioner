import { ButtonGroup } from "@mui/material";

import { Category } from "../../../types";
import { Container, StyledButton } from "./CategoryButtonGroup.styles";

interface CategoryButtonGroupProps {
  categories: Category[];
  selectedCategory: Category | null;
  handleSelectCategory: (category: Category) => void;
}

function CategoryButtonGroup({
  categories,
  selectedCategory,
  handleSelectCategory,
}: CategoryButtonGroupProps) {
  return (
    <Container>
      <ButtonGroup aria-label="category button group" color="inherit">
        {categories.map((category) => (
          <StyledButton
            type="button"
            key={category.id}
            selected={category.name === selectedCategory?.name}
            onClick={() => handleSelectCategory(category)}
          >
            {category.name}
          </StyledButton>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
