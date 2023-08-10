import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "82c5323ca1124feab62f4b03929584c3",
  },
});
