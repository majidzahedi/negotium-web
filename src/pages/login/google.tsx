import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
const Google = () => {
  const params = window.location.href;
  const {} = useQuery({
    queryKey: ['login'],
    queryFn: () =>
      api.get(params.replace('http://localhost:5173', 'http://localhost:4000')),
    select: (data) => data.data,
  });

  return null;
};

export default Google;
