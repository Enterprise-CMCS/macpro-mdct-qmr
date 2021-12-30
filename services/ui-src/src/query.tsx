import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

export const QueryProvider = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
