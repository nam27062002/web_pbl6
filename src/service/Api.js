
import axios from 'axios';

const BASE_URL = axios.create({
  baseURL: 'http://ridewizard.pro:9000/', // Điền URL của API của bạn
});

export default BASE_URL