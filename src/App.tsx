import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import Editor from '@/pages/Editor'
import AICreation from '@/pages/AICreation'
import Submission from '@/pages/Submission'
import Copyright from '@/pages/Copyright'
import Learning from '@/pages/Learning'
import Profile from '@/pages/Profile'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Scripts from '@/pages/Scripts'
import WeeklyStats from '@/pages/WeeklyStats'
import CommunityNewbieZone from '@/components/CommunityNewbieZone'
import AchievementSystem from '@/components/AchievementSystem'
// 管理后台页面
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminScripts from '@/pages/admin/AdminScripts'
import AdminAnalytics from '@/pages/admin/AdminAnalytics'
import AdminDatabase from '@/pages/admin/AdminDatabase'
import AdminSecurity from '@/pages/admin/AdminSecurity'
import AdminSettings from '@/pages/admin/AdminSettings'
import './App.css'

// 管理员路由保护组件
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  // 未登录用户跳转到登录页
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 只有管理员才能访问管理后台
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shortplay-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="editor" element={<Editor />} />
              <Route path="editor/:scriptId" element={<Editor />} />
              <Route path="ai-assistant" element={<AICreation />} />
              <Route path="submission" element={<Submission />} />
              <Route path="copyright" element={<Copyright />} />
              <Route path="learning" element={<Learning />} />
              <Route path="profile" element={<Profile />} />
              <Route path="scripts" element={<Scripts />} />
              <Route path="weekly-stats" element={<WeeklyStats />} />
              <Route path="community" element={<CommunityNewbieZone />} />
              <Route path="achievements" element={<AchievementSystem />} />
            </Route>
            {/* 管理后台路由 */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
            <Route path="/admin/scripts" element={
              <AdminRoute>
                <AdminScripts />
              </AdminRoute>
            } />
            <Route path="/admin/analytics" element={
              <AdminRoute>
                <AdminAnalytics />
              </AdminRoute>
            } />
            <Route path="/admin/database" element={
              <AdminRoute>
                <AdminDatabase />
              </AdminRoute>
            } />
            <Route path="/admin/security" element={
              <AdminRoute>
                <AdminSecurity />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
