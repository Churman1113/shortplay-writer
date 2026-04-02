import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'writer' | 'studio' | 'admin'
  createdAt?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE = import.meta.env.VITE_API_URL || 'https://cloud1-9g2sgrzmc39fa2a5-1352360859.ap-shanghai.app.tcloudbase.com'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的登录状态
    const storedToken = localStorage.getItem('shortplay_token')
    const storedUser = localStorage.getItem('shortplay_user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      
      // 验证Token是否有效
      verifyToken(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem('shortplay_user', JSON.stringify(data.user))
      } else {
        // Token无效，清除存储
        logout()
      }
    } catch {
      // 网络错误时保持当前状态，不静默假设已登录
      console.warn('Token 验证请求失败，保持本地登录状态')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }
      
      // 保存用户信息
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('shortplay_token', data.token)
      localStorage.setItem('shortplay_user', JSON.stringify(data.user))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }
      
      // 保存用户信息
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('shortplay_token', data.token)
      localStorage.setItem('shortplay_user', JSON.stringify(data.user))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('shortplay_token')
    localStorage.removeItem('shortplay_user')
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 导出token供其他组件使用
export function useAuthToken() {
  const { token } = useAuth()
  return token
}