import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import Transactions from "../pages/transactions/Transactions";
import Documents from "../pages/documents/Documents";

import Analytics from "../pages/analytics/Analytics";
import Subscriptions from "../pages/subscriptions/Subscriptions";

import SuccessStories from "../pages/successStories/SuccessStories";
import StoryAnalytics from "../pages/successStories/StoryAnalytics";

import Settings from "../pages/settings/Settings";
import AdminProfile from "../pages/profile/AdminProfile";

import AdminRoute from "./AdminRoute";
import UserDetails from "../pages/users/UserDetails";
import EditUser from "../pages/users/EditUser";
import TransactionDetails from "../pages/transactions/TransactionDetails";
import KnowledgeCenter from "../pages/knowledgeCenter/KnowledgeCenter";
import NewsletterSubscribers from "../pages/newsletter/NewsletterSubscribers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      {/* Users */}
      <Route
        path="/users"
        element={
          <AdminRoute>
            <Users />
          </AdminRoute>
        }
      />

      <Route
        path="/users/:id"
        element={
          <AdminRoute>
            <UserDetails />
          </AdminRoute>
        }
      />

      <Route
        path="/users/edit/:id"
        element={
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        }
      />
      {/* Transactions */}
      <Route
        path="/transactions"
        element={
          <AdminRoute>
            <Transactions />
          </AdminRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <AdminRoute>
            <TransactionDetails />
          </AdminRoute>
        }
      />

      {/* Documents */}
      <Route
        path="/documents"
        element={
          <AdminRoute>
            <Documents />
          </AdminRoute>
        }
      />

      {/* Subscription Plans */}
      <Route
        path="/subscriptions"
        element={
          <AdminRoute>
            <Subscriptions />
          </AdminRoute>
        }
      />

      {/* Success Stories */}
      <Route
        path="/success-stories"
        element={
          <AdminRoute>
            <SuccessStories />
          </AdminRoute>
        }
      />

      <Route
        path="/success-stories/analytics"
        element={
          <AdminRoute>
            <StoryAnalytics />
          </AdminRoute>
        }
      />

      {/* Knowledge Center */}
      <Route
        path="/knowledge-center"
        element={
          <AdminRoute>
            <KnowledgeCenter />
          </AdminRoute>
        }
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        }
      />

      {/* NewsLetter*/}
      <Route
        path="/newsletter"
        element={
          <AdminRoute>
            <NewsletterSubscribers />
          </AdminRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <AdminRoute>
            <Settings />
          </AdminRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
