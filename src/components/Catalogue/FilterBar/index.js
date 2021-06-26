import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

const FilterBar = ({ setSortMethod }) => {
  const [sort, setSort] = useState(undefined);
  const priceLower = (a, b) => {
    return a.price - b.price;
  }
  const sortBy = (sortMethod) => {
    setSort(sortMethod);
    switch (sortMethod) {
      case 'PRICE_LOW_HIGH':
        setSortMethod({func: priceLower});
        break;
      default:
        break;
    }
  }

  return (
    <Paper>
      <Box p={3}>
        <FormControl>
          <InputLabel id="sort-by-label">Orden</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sort}
            onClick={(e) => sortBy(e.target.value)}
          >
            <MenuItem value='PRICE_LOW_HIGH'>Precio menor a mayor</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
};

export default FilterBar;
