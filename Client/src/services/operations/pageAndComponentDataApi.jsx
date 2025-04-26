
import { apiConnector } from './../apiConnector';
import { catalogPageDataEndpoints } from './../apiCollection';
import { toast } from 'react-hot-toast';

const {
  getCatalogPageDataApi,
} = catalogPageDataEndpoints;

export const getCatalogPageData = async (categoryName) => {
  const toastId = toast.loading("Loading Courses...");
  let result=[];
  try {
    const response = await apiConnector("GET", `${getCatalogPageDataApi}/${categoryName}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    // console.log(response.data.data);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during fetching Catalog Page Data", error.message);
    toast.error(error.message || "Failed to load catalog data");
  } finally{
    toast.dismiss(toastId);
    return result;
  }
};


