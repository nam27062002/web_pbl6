import axios from "axios";

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
      return response;
    } catch (error) {
      return null;
    }
  },
};

export default DriverService;
