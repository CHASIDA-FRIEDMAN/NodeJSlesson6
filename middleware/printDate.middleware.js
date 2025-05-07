const printGetRequests = (req, res, next) => {
    if (req.method === 'GET') {
      console.log(`GET request received at ${req.path} - Current Date: ${req.currentDate}`);
    }
    next();
  };
  
  export default printGetRequests;
  