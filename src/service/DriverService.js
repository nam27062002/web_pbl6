import axios from "axios";
import util from '../util';
const DriverService = {
  getVerify: async (token, driverId) => {
    try {
      console.log(driverId + " " + token);
      const response = await axios.get(
        `http://ridewizard.pro:9000/api/v1/drivers/identification/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!(response.statusCode === 200)) {
        util.showToastWarning(response.data.message);
      }
      return response;
    } catch (error) {
      util.showToastWarning(error.message);
      return null;
    }
  },
};

export default DriverService;
