import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export const Container = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'auto',
}));
