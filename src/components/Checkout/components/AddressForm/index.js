import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const AddressForm = ({ address, setAddress }) => {
  const [fullAddress, setFullAddress] = useState(address.fullAddress);
  const [addressLine2, setAddressLine2] = useState(address.addressLine2);
  const [commune, setCommune] = useState(address.commune);
  const [region, setRegion] = useState(address.region);

  useEffect(() => {
    setAddress({
      fullAddress,
      addressLine2,
      commune,
      region
    })
  }, [setAddress, fullAddress, addressLine2, commune, region]);
  
  const handleInputChange = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;
    switch (field) {
      case 'fullAddress':
        setFullAddress(value);
        break;
      case 'addressLine2':
        setAddressLine2(value);
        break;
      case 'commune':
        setCommune(value);
        break;
      case 'region':
        setRegion(value);
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Typography variant="h5">
        Dirección de Despacho
      </Typography>
      <form>
        <TextField
          id="outlined-fullAddress"
          label="Dirección"
          name="fullAddress"
          value={fullAddress}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-addressLine2"
          label="Oficina/Depto"
          name="addressLine2"
          value={addressLine2}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-commune"
          label="Comuna"
          name="commune"
          value={commune}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-region"
          label="Región"
          name="region"
          value={region}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </form>
    </>
  )
}

export default AddressForm;
