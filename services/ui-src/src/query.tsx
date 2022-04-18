import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: any) => {
  queryClient.setDefaultOptions({
    queries: {
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
