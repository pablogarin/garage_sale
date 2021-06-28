import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const UserForm = ({ userClient, userData, setUserData, setIsLoading }) => {
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phone, setPhone] = useState(userData.phone);

  useEffect(() => {
    setUserData(userData => ({
      ...userData,
      email,
      name,
      lastName,
      phone
    }))
  }, [setUserData, email, name, lastName, phone]);

  useEffect(() => {
    const typingTimeout = setTimeout(() => searchUser(email), 500);
    const searchUser = async (email) => {
      if (!email) return;
      setIsLoading(true)
      try {
        const client = await userClient.find(email)
        setUserData(userData => ({ ...userData, id: client.id }))
        setName(client.firstName);
        setLastName(client.lastName);
        setPhone(client.phone);
        setIsLoading(false);
      } catch (err) {
        setUserData(userData => ({ ...userData, id: null }));
        setName(name => name ? name : '');
        setLastName(lastName => lastName ? lastName : '');
        setPhone(phone => phone ? phone : '');
        setIsLoading(false);
      }
    }
    return () => clearTimeout(typingTimeout);
  }, [email, userClient, setIsLoading, setUserData]);


  const handleInputChange = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Typography variant="h5">
        Datos del comprador.
      </Typography>
      <form>
        <TextField
          id="outlined-email"
          label="E-Mail"
          name="email"
          value={email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-name"
          label="Nombre"
          name="name"
          value={name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={!email}
        />
        <TextField
          id="outlined-lastname"
          label="Apellido"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={!email}
        />
        <TextField
          id="outlined-phone"
          label="Teléfono"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={!email}
        />
      </form>
    </>
  )
}

export default UserForm;
