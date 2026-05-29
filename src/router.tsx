import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./layouts/AppShell";
import { RouteLoader } from "./components/loaders/RouteLoader";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const GrowthSystemPage = lazy(() => import("./pages/GrowthSystemPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));
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
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "services", element: withSuspense(<ServicesPage />) },
      { path: "services/:channelSlug", element: withSuspense(<ChannelLanderPage />) },
      { path: "growth-system", element: withSuspense(<GrowthSystemPage />) },
      { path: "case-studies", element: withSuspense(<CaseStudiesPage />) },
      { path: "case-studies/:slug", element: withSuspense(<CaseStudyDetailPage />) },
      { path: "faq", element: withSuspense(<FaqPage />) },
      { path: "contact", element: withSuspense(<ContactPage />) },
      { path: "privacy", element: withSuspense(<PrivacyPolicyPage />) },
      { path: "terms", element: withSuspense(<TermsPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
