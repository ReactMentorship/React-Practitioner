import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const PageContainer = styled(Grid)`
  gap: 16px;
  overflow: auto;
  display: flex;
  padding: 32px;
  flex-wrap: nowrap;
  flex-direction: column;
  flex-grow: 1;
`;
