import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '', fuel: '', year:0, price:0
    });

    const handleClickOpen = () => {
        console.log(props.car)
        console.log('----' + props.car.modelYear)
        setCar({brand: props.car.brand, model:props.car.model, color: props.car.color, price:props.car.price,fuel: props.car.fuel, year: props.car.modelYear})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        const value = event.target.name.toLowerCase() === 'year' ? parseInt(event.target.value) : event.target.value;
        setCar({...car, [event.target.name]: value})
    };
    
    
    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href);
        handleClose();
    }
    return (
        <div>
        
      <Button size='small' variant="contained" color='primary' onClick={handleClickOpen}>
        Edit Car
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>{/* 
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={e => handleInputChange(e)}
            label="Brand"
            variant="standard"
          />
            <TextField
              autoFocus
              required
              margin="dense"
              name="model"
              value={car.model}
              onChange={e => handleInputChange(e)}
              label="Model"
              variant="standard"
            />
          <TextField
            autoFocus
            required
            margin="dense"
            name="color"
            value={car.color}
            onChange={e => handleInputChange(e)}
            label="Color"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={e => handleInputChange(e)}
            label="Fuel"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="price"
            value={car.price}
            onChange={e => handleInputChange(e)}
            label="Price"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="year"
            value={car.year}
            onChange={e => handleInputChange(e)}
            label="Year"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCar}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}