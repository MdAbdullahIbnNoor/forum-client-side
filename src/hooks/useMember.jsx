import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useMember = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/member/${user?.email}`);
            // console.log(res.data);
            return res.data?.Member;
        }

    })
    return [isMember, isMemberLoading]
}

export default useMember;