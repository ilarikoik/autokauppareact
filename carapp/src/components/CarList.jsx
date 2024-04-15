import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
/* import "ag-grid-community/styles/ag-theme-material.css";  */
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
  // per car objektilla on kaikki seuraavat osat
  const [cars, setCars] = useState([
    {
      brand: "",
      model: "",
      color: "",
      fuel: "",
      year: "",
      price: 0,
    },
  ]);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [msgSnackBar, setMsgSnackBar] = useState("");
  const [refresh, setRefresh] = useState(0);

  // hakee tiedot ku sivu avataa
  useEffect(() => {
    const fetchCars = () => {
      fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data); // tallenetaa vaa cars array
          setCars(data._embedded.cars);
        })
        .catch((error) => console.log(error));
    };
    fetchCars();
  }, [refresh]);

  // agGrid
  const [columnsDef, setColumnDef] = useState([
    {
      headerName: "Merkki",
      field: "brand",
      filter: true,
      /* checkboxSelection: true,  */ cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Malli",
      field: "model",
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Väri",
      field: "color",
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Polttoaine",
      field: "fuel",
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Vuosimalli",
      field: "modelYear",
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      headerName: "Hinta",
      field: "price",
      filter: true,
      cellStyle: { textAlign: "left" },
    },
    {
      cellRenderer: (row) => (
        <EditCar car={row.data} updateCar={updateCar}></EditCar>
      ),
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={() => deleteCar(params)}
        >
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  // lisää msgSnackBar viestiin malli ja merki
  const rowIndex = (event) => {
    const rowIndex = event.rowIndex;
    console.log("Clicked row index:", rowIndex);
    const model = cars[rowIndex].model;
    const brand = cars[rowIndex].brand;
    console.log(model, brand);
    setMsgSnackBar(`Success: ${brand} ${model} deleted`); // ottaa vastaa vaa yhe argumenti joten pitää kirjottaa tollei yhellä vedolla
  };

  const deleteCar = (params) => {
    console.log(params.data._links.car.href);
    fetch(params.data._links.car.href, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setOpenSnackBar(true);
          /* setMsgSnackBar('success') */
          setRefresh((a) => a - 1);
          rowIndex(); // näyttää message mihi saahaa malli ja merkki mukaa
        } else {
          window.alert("NO delete");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSave = (car) => {
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        if (res.ok) {
          setRefresh((a) => a + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        if (res.ok) {
          setRefresh(a => a +1);
          fetchCars();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AddCar handleSave={handleSave}></AddCar>
      <div
        className="ag-theme-alpine-dark"
        style={{ width: 1200, height: 600 }}
      >
        <AgGridReact
          rowData={cars}
          columnDefs={columnsDef}
          animateRows={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={100}
          paginationPageSizeSelector={[10, 20, 50]}
          onRowClicked={rowIndex} // ag gridi joku oma event listeneri?
        ></AgGridReact>

        <Snackbar
          open={openSnackBar}
          message={msgSnackBar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackBar(false)}
        ></Snackbar>
      </div>
    </div>
  );
}
