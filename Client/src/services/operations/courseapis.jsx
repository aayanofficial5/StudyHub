
import { toast } from 'react-hot-toast';
import { apiConnector } from './../apiConnector';
import { courses } from '../apiCollection';

// category APIs

// getCourseCategories
export const getCourseCategories = async()=>{
    const toastId = toast.loading("Loading...");
    try{
      const response = await apiConnector("GET",courses.getCourseCategories);
      // console.log("Fetching Course Categories Response: ",response);
      if(!response?.data?.success){
        throw new Error(response?.data?.message);
      }
      toast.dismiss(toastId);
      // console.log(response.data.data);
      return response?.data?.data;
    }catch(error){
      console.log("Error during fetching Categories"+error.message)
      toast.error(error.message || "Failed to load categories.");
      return [];
    }
}