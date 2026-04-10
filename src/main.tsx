import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 👀 Import QueryClient and QueryClientProvider
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree, basepath: "/shopping-cart" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient(); // 👀 Create a query client

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 👀 Wrap the router with the query client */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
