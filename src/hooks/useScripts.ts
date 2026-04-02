/**
 * 剧本数据管理
 * 根据登录状态返回虚拟数据或真实数据
 */
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export interface Script {
  id: string
  title: string
  genre: string
  synopsis: string
  episodes: number
  completedEpisodes: number
  lastEdited: string
  status: 'draft' | 'completed' | 'submitted'
  content?: string
  createdAt?: string
}

// 虚拟剧本数据
const mockScripts: Script[] = [
  {
    id: 'mock-1',
    title: '霸道总裁的小娇妻',
    genre: '甜宠',
    synopsis: '讲述都市白领与霸道总裁之间的甜蜜爱情故事...',
    episodes: 80,
    completedEpisodes: 45,
    lastEdited: '2小时前',
    status: 'draft'
  },
  {
    id: 'mock-2',
    title: '重生之我是王妃',
    genre: '古装',
    synopsis: '现代女子重生为古代王妃，逆袭人生...',
    episodes: 100,
    completedEpisodes: 100,
    lastEdited: '1天前',
    status: 'completed'
  },
  {
    id: 'mock-3',
    title: '都市神医',
    genre: '都市',
    synopsis: '神秘青年凭借高超医术，都市崛起...',
    episodes: 60,
    completedEpisodes: 60,
    lastEdited: '3天前',
    status: 'submitted'
  },
  {
    id: 'mock-4',
    title: '战神归来',
    genre: '战神',
    synopsis: '战场战神回归都市，掀起腥风血雨...',
    episodes: 85,
    completedEpisodes: 20,
    lastEdited: '5天前',
    status: 'draft'
  },
]

export interface UserStats {
  totalScripts: number
  completedScripts: number
  submittedScripts: number
  totalWords: number
}

// 虚拟统计数据
const mockStats: UserStats = {
  totalScripts: 12,
  completedScripts: 8,
  submittedScripts: 3,
  totalWords: 580000
}

/**
 * 获取剧本列表
 */
export function useScripts() {
  const { user } = useAuth()
  const [scripts, setScripts] = useState<Script[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      // 游客 - 显示虚拟数据
      setScripts(mockScripts)
      setIsLoading(false)
    } else {
      // 登录用户 - 从localStorage获取真实数据
      const storedScripts = localStorage.getItem(`shortplay_scripts_${user.id}`)
      if (storedScripts) {
        setScripts(JSON.parse(storedScripts))
      } else {
        setScripts([])
      }
      setIsLoading(false)
    }
  }, [user])

  // 保存剧本到localStorage
  const saveScript = (script: Script) => {
    if (!user) return

    const storedScripts = JSON.parse(localStorage.getItem(`shortplay_scripts_${user.id}`) || '[]')
    const existingIndex = storedScripts.findIndex((s: Script) => s.id === script.id)

    if (existingIndex >= 0) {
      storedScripts[existingIndex] = { ...script, lastEdited: new Date().toLocaleString('zh-CN') }
    } else {
      storedScripts.push({
        ...script,
        id: `script_${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toLocaleString('zh-CN')
      })
    }

    localStorage.setItem(`shortplay_scripts_${user.id}`, JSON.stringify(storedScripts))
    setScripts(storedScripts)
  }

  // 删除剧本
  const deleteScript = (scriptId: string) => {
    if (!user) return

    const storedScripts = JSON.parse(localStorage.getItem(`shortplay_scripts_${user.id}`) || '[]')
    const filtered = storedScripts.filter((s: Script) => s.id !== scriptId)
    localStorage.setItem(`shortplay_scripts_${user.id}`, JSON.stringify(filtered))
    setScripts(filtered)
  }

  // 获取单个剧本
  const getScript = (scriptId: string): Script | undefined => {
    if (!user) {
      return scripts.find(s => s.id === scriptId)
    }
    const storedScripts = JSON.parse(localStorage.getItem(`shortplay_scripts_${user.id}`) || '[]')
    return storedScripts.find((s: Script) => s.id === scriptId)
  }

  return { scripts, isLoading, saveScript, deleteScript, getScript }
}

/**
 * 获取用户统计数据
 */
export function useUserStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<UserStats>(mockStats)

  useEffect(() => {
    if (!user) {
      setStats(mockStats)
    } else {
      const storedScripts = JSON.parse(localStorage.getItem(`shortplay_scripts_${user.id}`) || '[]')
      const completed = storedScripts.filter((s: Script) => s.status === 'completed').length
      const submitted = storedScripts.filter((s: Script) => s.status === 'submitted').length
      const totalWords = storedScripts.reduce((acc: number, s: Script) => {
        // 估算字数：每集约2000字
        return acc + (s.completedEpisodes * 2000)
      }, 0)

      setStats({
        totalScripts: storedScripts.length || 12,
        completedScripts: completed || 8,
        submittedScripts: submitted || 3,
        totalWords: totalWords || 580000
      })
    }
  }, [user])

  return stats
}

/**
 * 获取最近创作的剧本
 */
export function useRecentScripts(limit = 3) {
  const { scripts } = useScripts()
  return scripts.slice(0, limit)
}
