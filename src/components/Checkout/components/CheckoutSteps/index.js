import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import PickupAddress from '../PickupAddress';
import UserForm from '../UserForm';

const CheckoutSteps = ({
    address,
    userData,
    paymentMethod,
    setUserData,
    setAddress,
    setPaymentMethod,
    dispatchType,
    userClient,
    setIsLoading,
    finishOrder
  }) => {
  const [activeStep, setActiveStep] = useState(0);
  const forwardStep = () => {
    if (activeStep === 2) {
      finishOrder();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep+1);
  }

  const backStep = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep-1);
  }

  const getStep = (index) => {
    switch (index) {
      case 0:
        return (<UserForm
          userData={userData}
          setUserData={setUserData}
          setIsLoading={setIsLoading}
          userClient={userClient}
        />)
      case 1:
        if (dispatchType === 'delivery') {
          return (<AddressForm
            address={address}
            setAddress={setAddress}
          />)
        }
        if (dispatchType === 'pickup') {
          return (<PickupAddress />)
        }
        break;
      case 2:
        return (<PaymentForm
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />)
      default:
        return 'Unk';
    }
  }

  const canContinue = (index) => {
    switch (index) {
      case 0:
        return !userData.email;
      default:
        return false;
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step key="1">
              <StepLabel>
                <Box display={{ xs: 'none', sm: 'block'}}>Identificación</Box>
              </StepLabel>
            </Step>
            <Step key="2">
              <StepLabel>
              <Box display={{ xs: 'none', sm: 'block'}}>Entrega</Box>
              </StepLabel>
            </Step>
            <Step key="3">
              <StepLabel>
                <Box display={{ xs: 'none', sm: 'block'}}>Pago</Box>
              </StepLabel>
            </Step>
          </Stepper>
        </Grid>
      </Grid>
      <Box py={2}>
        <Grid container justify="center">
          {getStep(activeStep)}
        </Grid>
      </Box>
      <Grid container justify="space-evenly" align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => backStep()}
          disabled={activeStep===0}
        >
          <ArrowBackIosIcon />
          Volver
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => forwardStep()}
          disabled={canContinue(activeStep)}
        >
          {activeStep === 2 ?
          (<>Finalizar&nbsp;<ReceiptOutlinedIcon/></>) :
          (<>Avanzar&nbsp;<ArrowForwardIosIcon /></>)}
        </Button>
      </Grid>
    </>
  )
}

export default CheckoutSteps;
