const createSetupPin = ({ tessel, log, config, ledGreen }, ifttt) => {
  const emitError = error => {
    if (process.env.NODE_ENV !== 'production') {
      log('Error while emitting to IFTTT', error);
    }
  };

  const emitSuccess = () => {
    if (process.env.NODE_ENV !== 'production') {
      log('Success!');
    }
  };

  const pinFromDesignation = pinDesignation => {
    const [port, pin] = pinDesignation; // ex: "B2" -> "B", "2"
    return tessel.port[port].pin[parseInt(pin, 10)];
  };

  return ({ pin: pinDesignation, pull = 'up', rise = {}, fall = {} }) => {
    const pin = pinFromDesignation(pinDesignation);

    const onPinChange = (value, event) => { // Here when a pin rises or falls.
      if (process.env.NODE_ENV !== 'production') {
        log(`Emitting the "${event}" event to IFTTT`);
      }
      ifttt.emit(event).then(emitSuccess).catch(emitError);
    };

    const onPinReady = () => { // Here when the pull up/down callback happens.
      if (rise.event) {  // Setup rise and fall handlers.
        pin.on('rise', () => { onPinChange(1, rise.event); });
      }
      if (fall.event) {
        pin.on('fall', () => { onPinChange(0, fall.event); });
      }
    };

    pin.pull(`pull${pull}`, onPinReady); // Setup the resistor to pull up (default) or down.
  };
};

export default createSetupPin;
