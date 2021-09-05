import { QueryClientProvider } from "react-query";
import Main from "./pages/Main";
import { queryClient } from "./services/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
