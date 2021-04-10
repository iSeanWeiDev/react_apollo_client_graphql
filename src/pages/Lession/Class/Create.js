import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Stepper,
  Step,
  StepButton,
  Typography
} from '@material-ui/core';
import useStyles from './style';

function getSteps() {
  return ['Basic Info *', 'Add educator', 'Add Student'];
}

const CreateResource = ({ open, onChange }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  const handleClose = () => {
    onChange(false);
  };

  const handleChange = () => {
    onChange(true, {});
  };

  return (
    <Dialog maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialogTitle} onClose={handleClose}>
        Create New Class
      </DialogTitle>
      <DialogContent className={classes.steperRoot}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const buttonProps = {};
            if (isStepOptional(index)) {
              buttonProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
      <DialogActions>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.steperButton}
            >
              Back
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
            {isStepOptional(activeStep) && !completed.has(activeStep) && (
              <Button
                color="primary"
                onClick={handleSkip}
                className={classes.button}
              >
                Skip
              </Button>
            )}

            {activeStep !== steps.length && (
              <Button color="primary" onClick={handleComplete}>
                {completedSteps() === totalSteps() - 1
                  ? 'Finish'
                  : 'Complete Step'}
              </Button>
            )}
          </div>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateResource;
