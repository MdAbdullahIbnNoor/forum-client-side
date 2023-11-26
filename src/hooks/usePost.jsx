import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePost = () => {
    const axiosPublic = useAxiosPublic();
  
    const { data: posts = [], isPending: loading, refetch } = useQuery({
      queryKey: ['posts'],
      queryFn: async ({ queryKey }) => {
        const [, query] = queryKey;
        const res = await axiosPublic.get(`/posts?sortOption=${query}`);
        return res.data;
      },
    });
  
    // Return the necessary values
    return { posts, loading, refetch };
  };
  
  export default usePost;
  