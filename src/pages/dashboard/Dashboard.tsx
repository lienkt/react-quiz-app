import React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import type { ICategory } from "../../types";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState<ICategory[]>([])

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const resp = await fetch('https://opentdb.com/api_category.php');
        const data = await resp.json();
        setCategories(data.trivia_categories)
      } catch (err) {
        console.log('can not fetch categories')
      }
    }
    fetchCategories();
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate('/question')
  }


  return (
    <>
      <Typography 
      variant="h3" 
        gutterBottom 
        sx={{
          textAlign: 'center'
        }}
      >
        Quiz App
      </Typography>

      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="Category"
          >
            {categories.map(cat => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br /><br />

        <FormControl fullWidth>
          <InputLabel id="difficulty">Difficulty</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty"
            label="Difficulty"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <br /><br />

        <FormControl fullWidth>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="type"
          >
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True/False</MenuItem>
          </Select>
        </FormControl>
        <br /><br />

        <TextField id="amount" label="Amount" variant="outlined" fullWidth />
        
        <Box
          sx={{
            textAlign: 'center',
            mt: 3
          }}
        >
          <Button variant="contained" type="submit">GET STARTED</Button>
        </Box>
        
      </form>
    </>
  );
}
