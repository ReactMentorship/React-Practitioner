"use client";

import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

type SeoFriendlyDataGridProps = DataGridProps;

const SeoFriendlyDataGrid = ({
  rows,
  columns,
  ...dataGridProps
}: SeoFriendlyDataGridProps) => {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <noscript>
        <table>
          <thead>
            <tr>
              {(columns as GridColDef[]).map((col) => (
                <th key={col.field}>{col.headerName || col.field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row) => (
              <tr key={row.id}>
                {(columns as GridColDef[]).map((col) => (
                  <td key={col.field}>{row[col.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </noscript>

      <DataGrid
        rows={rows}
        columns={columns}
        {...dataGridProps}
        sx={{ border: 0, ...(dataGridProps.sx || {}) }}
      />
    </Paper>
  );
};

export default SeoFriendlyDataGrid;
