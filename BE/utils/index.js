import moment from "moment";

export default {
  timestampValid: (req) => {
    const userTime = req.body.sync;

    if (userTime) {
      const oneMinute = { minutes: 1 };
      const inputTime = moment(userTime).format();
      const currentTime = moment().format();
      const laterTime = moment(currentTime).add(oneMinute).format();
      const earlierTime = moment(currentTime).subtract(oneMinute).format();
  
      if (moment(inputTime).isBefore(laterTime) && moment(inputTime).isAfter(earlierTime)) {
        return true;
      }
    }
  },

  isGetRequest: (req) => {
    return req.method === "GET"
  },

  isEmail: (email) => {

  },

  isInt: (value) => {

  },

  isPhoneNumber: (value) => {

  },


}