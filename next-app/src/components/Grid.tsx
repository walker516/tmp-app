import { IOlympicData } from "@/types/IOlympicData";
import { ColDef, ColGroupDef, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useCallback, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";

const MainContent = styled(Box)(
  () => `
    width: 100%;
    height: 80vh;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const Grid = () => {
  const gridStyle = useMemo(() => ({ width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Athlete Details",
      children: [
        {
          field: "athlete",
          width: 180,
          filter: "agTextColumnFilter",
        },
        {
          field: "age",
          width: 90,
          filter: "agNumberColumnFilter",
        },
        { headerName: "Country", field: "country", width: 140 },
      ],
    },
    {
      headerName: "Sports Results",
      children: [
        { field: "sport", width: 140 },
        {
          columnGroupShow: "closed",
          field: "total",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "gold",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "silver",
          width: 100,
          filter: "agNumberColumnFilter",
        },
        {
          columnGroupShow: "open",
          field: "bronze",
          width: 100,
          filter: "agNumberColumnFilter",
        },
      ],
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);
  return (
    <MainContent style={gridStyle}>
      <MainContent className="ag-theme-alpine">
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </MainContent>
    </MainContent>
  );
};

export default Grid;
