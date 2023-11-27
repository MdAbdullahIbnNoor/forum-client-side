import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAnnouncements = () => {
  const axiosPublic = useAxiosPublic();

  const { data: announcements = [], isPending: loading, refetch } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcements'); // Update the URL accordingly
      return res.data;
    },
  });

  // Return the necessary values
  return { announcements, loading, refetch };
};

export default useAnnouncements;
