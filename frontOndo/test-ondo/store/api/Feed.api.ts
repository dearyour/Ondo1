import axios from "axios";

const Feedurl = process.env.BACK_EC2 + "/feed";
const placeHolderurl = process.env.BACK_EC2 + "/feed";
export const GetFeedState = (token: string | null) => {
  return axios({
    method: "GET",
    url: Feedurl,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
