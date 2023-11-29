import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useMember = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending: isMemberLoading, refetch } = useQuery({
    queryKey: [user?.email, 'isMember'],
    enabled: !!user,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/member/${user?.email}`);
        // console.log(res.data); 

        // Ensure that the expected property is present in the response
        const userBadge = res.data?.badge;
        if (userBadge !== undefined) {
          // Log the extracted badge to check its value
        //   console.log('Extracted Badge:', userBadge);

          // Check if the user has a gold badge to determine membership
          return userBadge;
        } else {
          console.warn('Badge information not found in the response');
          return null;
        }
      } catch (error) {
        console.error('Error fetching member status:', error);
        throw error; // Rethrow the error to let React Query handle it
      }
    }
  });


  return [data, isMemberLoading, refetch];
};

export default useMember;
