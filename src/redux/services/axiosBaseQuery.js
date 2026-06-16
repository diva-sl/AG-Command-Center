import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const result = await axios({
        url: `${baseUrl}${url}`,
        method,
        data,
        params,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      return {
        data: result.data,
      };
    } catch (error) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || {
            message: "Server Error",
          },
        },
      };
    }
  };

export default axiosBaseQuery;
