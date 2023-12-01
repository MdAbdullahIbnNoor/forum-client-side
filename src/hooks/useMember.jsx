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
        const res = await axiosSecure.get(`/users/membership/${user?.email}`);
        const userBadge = res.data?.badge;
        const userPostCount = res.data?.postCount;
    
        if (userBadge !== undefined && userPostCount !== undefined) {
          return { badge: userBadge, postCount: userPostCount };
        } else {
          console.warn('Badge or Post Count information not found in the response');
          // Handle the case where information is not found (e.g., user not found)
          return { badge: 'None', postCount: 0 };
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 response
          console.warn('User not found:', error.response.data);
          return { badge: 'None', postCount: 0 };
        } else {
          console.error('Error fetching member status:', error);
          throw error;
        }
      }
    } // Add the missing closing parenthesis here
  });

  console.log(data);
  console.log(isMemberLoading);

  return [data, isMemberLoading, refetch];
};

export default useMember;
