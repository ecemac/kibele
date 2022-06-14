import { AuthProvider } from "./AuthProvider";
import { Navigation } from "./Navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
