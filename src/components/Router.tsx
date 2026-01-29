import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Pages
import HomePage from '@/components/pages/HomePage';
import SignupPage from '@/components/pages/SignupPage';
import OnboardingPage from '@/components/pages/OnboardingPage';
import DashboardPage from '@/components/pages/DashboardPage';
import UniversitiesPage from '@/components/pages/UniversitiesPage';
import UniversityDetailPage from '@/components/pages/UniversityDetailPage';
import GuidancePage from '@/components/pages/GuidancePage';
import ChatPage from '@/components/pages/ChatPage';
import ProfilePage from '@/components/pages/ProfilePage';
import ShortlistPage from '@/components/pages/ShortlistPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "onboarding",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to complete your profile">
            <OnboardingPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "universities",
        element: <UniversitiesPage />,
      },
      {
        path: "universities/:id",
        element: <UniversityDetailPage />,
      },
      {
        path: "guidance",
        element: <GuidancePage />,
      },
      {
        path: "chat",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to chat with AI Counsellor">
            <ChatPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "shortlist",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your shortlist">
            <ShortlistPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
