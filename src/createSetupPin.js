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
    const pin = pinFromDesignation(pinDesignation); // ex: "B2" to a tessel pin object

    const onPinChange = value => {
      const { event, value1, value2, value3 } = value ? rise : fall;
      if (event) {
        if (process.env.NODE_ENV !== 'production') {
          const edge = value ? 'rise' : 'fall';
          log(`${pinDesignation}:${edge} - Emitting the "${event}" event to IFTTT`);
        }
        const body = { value1, value2, value3 };
        ifttt.emit(event, { body }).then(emitSuccess).catch(emitError);
      }
    };

    const onPinReady = () => { // Here when the pull up/down callback happens.
      pin.on('change', onPinChange);
    };

    pin.pull(`pull${pull}`, onPinReady); // Setup the resistor to pull up (default) or down.
  };
};

export default createSetupPin;
