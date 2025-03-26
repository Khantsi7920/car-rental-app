import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

// Define the type of the car object
interface Car {
  name: string;
  model: string;
  year: number;
}

const API_URL = "https://xyz123.execute-api.us-east-1.amazonaws.com/dev/rental";

const App = () => {
  // Specify that cars will be an array of Car objects
  const [cars, setCars] = useState<Car[]>([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get(API_URL);
      setCars(response.data);  // Assuming response.data is an array of Car objects
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <h1>Car Rental Service</h1>
      <Button onClick={fetchCars}>Refresh</Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow key={index}>
                <TableCell>{car.name}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
