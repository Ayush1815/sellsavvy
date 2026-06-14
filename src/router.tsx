import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./layouts/AppShell";
import { RouteLoader } from "./components/loaders/RouteLoader";
import { RootErrorBoundary } from "./components/ui/RootErrorBoundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ChannelLanderPage = lazy(() => import("./pages/ChannelLanderPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "about", element: withSuspense(<AboutUsPage />) },
      { path: "services", element: withSuspense(<ServicesPage />) },
      { path: "services/:channelSlug", element: withSuspense(<ChannelLanderPage />) },
      { path: "faq", element: withSuspense(<FaqPage />) },
      { path: "contact", element: withSuspense(<ContactPage />) },
      { path: "privacy", element: withSuspense(<PrivacyPolicyPage />) },
      { path: "terms", element: withSuspense(<TermsPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
