import { apiConnector } from "./../apiConnector";
import { catalogPageDataEndpoints } from "./../apiCollection";
import { toast } from "react-hot-toast";

const { getCatalogPageDataApi } = catalogPageDataEndpoints;

export const getCatalogPageData = async (categoryName) => {
  // console.log("Category Name", categoryName);
  const toastId = toast.loading("Loading Courses...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      `${getCatalogPageDataApi}/${categoryName}`
    );
    // console.log("Catalog Page Data", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    // console.log(response.data.data);
    result = response?.data;
  } catch (error) {
    console.log(
      "Error during fetching Catalog Page Data",
      error.response?.data?.message
    );
    toast.error(error.response?.data?.message || "Failed to load catalog data");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};
