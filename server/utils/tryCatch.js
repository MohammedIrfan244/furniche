// to handle the errors in the controllers

const tryCatch = (func) => async (req, res, next) => {
  try {
    //  take the fuc with the req,res and next function
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default tryCatch;
