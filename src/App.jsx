import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import { Layout, Page } from "@shopify/polaris";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Page title="Countdown Timer Dashboard">
              <Layout>
                <Home />
              </Layout>
            </Page>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
