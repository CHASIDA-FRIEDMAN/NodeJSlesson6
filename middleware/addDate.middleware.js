const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date();
    // console.log('Current Date:', req.currentDate);
    next();
}

export default addCurrentDate;