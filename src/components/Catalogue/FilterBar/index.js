import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  select: {
    minWidth: 120
  }
}));

const stringToInt = (str) => {
  let result = '';
  str.split('').forEach(c => result += `${c.charCodeAt(0)}`.padStart(3,'0'));
  console.log(result);
  return parseInt(result);
}

const strDiff = (a, b) => {
  const str1 = a.toLowerCase().replace(/[^a-z0-9]+/gi, '');
  const str2 = b.toLowerCase().replace(/[^a-z0-9]+/gi, '');
  const strSize = Math.min(str1.length, str2.length);
  return stringToInt(str1.slice(0, strSize)) - stringToInt(str2.slice(0, strSize));
}

const sortingMethods = {
  'PRICE_LOW_HIGH': {
    label: 'Precio menor a mayor',
    func: (a, b) => (a.price - b.price)
  },
  'PRICE_HIGH_LOW': {
    label: 'Precio mayor a menor',
    func: (a, b) => (b.price - a.price)
  },
  'NAME_A_Z': {
    label: 'Nombre A-Z',
    func: (a, b) => strDiff(a.name, b.name)
  },
  'NAME_Z_A': {
    label: 'Nombre Z-A',
    func: (a, b) => strDiff(b.name, a.name)
  },
};

const FilterBar = ({ setSortMethod }) => {
  const [sort, setSort] = useState('');
  const classes = useStyles();
  const sortBy = (sortMethod) => {
    setSort(sortMethod);
    const method = sortingMethods[sortMethod];
    setSortMethod(method);
  }

  return (
    <Paper>
      <Box p={3}>
        <FormControl className={classes.select}>
          <InputLabel id="sort-by-label">Orden</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sort}
            onClick={(e) => sortBy(e.target.value)}
          >
            {Object.entries(sortingMethods).map(([key, method]) => (
            <MenuItem value={key} key={key}>{method.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  )
};

export default FilterBar;
