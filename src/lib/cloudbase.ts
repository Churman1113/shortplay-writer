/**
 * 腾讯云 CloudBase 服务集成
 * 使用 REST API 直接调用，无需安装额外 SDK
 *
 * 配置步骤：
 * 1. 腾讯云控制台 → 打开"登录授权" → 开启"匿名授权"
 * 2. 打开"云数据库" → 创建 scripts 和 users 集合
 * 3. 在"安全配置"中允许客户端访问
 */

// CloudBase 配置
const CLOUDBASE_CONFIG = {
  env: 'cloud1-9g2sgrzmc39fa2a5',
  // API 地址（云开发底座统一接口）
  baseUrl: 'https://cloud1-9g2sgrzmc39fa2a5.ap-shanghai.app.tcloudbase.com',
}

// 数据库集合名称
export const COLLECTIONS = {
  SCRIPTS: 'scripts',
  USERS: 'users',
  COLLABORATIONS: 'collaborations',
}

// 剧本数据结构
export interface Script {
  _id?: string
  title: string
  owner: string
  collaborators: string[]
  content: string
  episodes: Episode[]
  createdAt: number | Date
  updatedAt: number | Date
  version: number
}

export interface Episode {
  id: number
  title: string
  content: string
  wordCount: number
}

// 用户数据结构
export interface User {
  _id?: string
  openid?: string
  name: string
  avatar?: string
  email?: string
  role?: string
  createdAt?: number
}

// 协作记录
export interface Collaboration {
  _id?: string
  scriptId: string
  userId: string
  action: 'join' | 'leave' | 'edit'
  timestamp: number
}

// 通用云函数调用
async function callCloudBase(action: string, data: Record<string, unknown> = {}) {
  const response = await fetch(`${CLOUDBASE_CONFIG.baseUrl}/tcb/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-cloudbase-env': CLOUDBASE_CONFIG.env,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`CloudBase API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// CloudBase 数据库服务
class CloudBaseService {
  /**
   * 保存剧本（新增或更新）
   */
  async saveScript(script: Script): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const payload = {
        query: script._id
          ? `db.collection("${COLLECTIONS.SCRIPTS}").doc("${script._id}").update`
          : `db.collection("${COLLECTIONS.SCRIPTS}").add`,
        ...(script._id
          ? { data: { ...script, updatedAt: Date.now() } }
          : { data: { ...script, createdAt: Date.now(), updatedAt: Date.now() } }),
      }

      const result = await callCloudBase('tcb/databaseUpdate', payload)

      // 新增时返回 id
      if (!script._id && result.data?.ids) {
        return { success: true, id: result.data.ids[0] }
      }

      return { success: true, id: script._id }
    } catch (error) {
      console.error('❌ 保存剧本失败:', error)
      return { success: false, error: String(error) }
    }
  }

  /**
   * 查询单个剧本
   */
  async getScript(id: string): Promise<Script | null> {
    try {
      const result = await callCloudBase('tcb/databaseQuery', {
        query: `db.collection("${COLLECTIONS.SCRIPTS}").doc("${id}").get()`,
      })

      if (result.data?.data?.[0]) {
        return result.data.data[0] as Script
      }
      return null
    } catch (error) {
      console.error('❌ 获取剧本失败:', error)
      return null
    }
  }

  /**
   * 查询用户的剧本列表
   */
  async getUserScripts(userId: string): Promise<Script[]> {
    try {
      const result = await callCloudBase('tcb/databaseQuery', {
        query: `db.collection("${COLLECTIONS.SCRIPTS}").where({owner: "${userId}"}).get()`,
      })

      if (result.data?.data) {
        return result.data.data as Script[]
      }
      return []
    } catch (error) {
      console.error('❌ 获取剧本列表失败:', error)
      return []
    }
  }

  /**
   * 删除剧本
   */
  async deleteScript(id: string): Promise<boolean> {
    try {
      await callCloudBase('tcb/databaseDelete', {
        query: `db.collection("${COLLECTIONS.SCRIPTS}").doc("${id}").remove()`,
      })
      return true
    } catch (error) {
      console.error('❌ 删除剧本失败:', error)
      return false
    }
  }

  /**
   * 添加协作者
   */
  async addCollaborator(scriptId: string, userId: string): Promise<boolean> {
    try {
      const script = await this.getScript(scriptId)
      if (!script) return false

      const collaborators = [...new Set([...(script.collaborators || []), userId])]

      await callCloudBase('tcb/databaseUpdate', {
        query: `db.collection("${COLLECTIONS.SCRIPTS}").doc("${scriptId}").update`,
        data: { collaborators, version: (script.version || 0) + 1 },
      })
      return true
    } catch (error) {
      console.error('❌ 添加协作者失败:', error)
      return false
    }
  }

  /**
   * 记录协作操作
   */
  async logCollaboration(collaboration: Omit<Collaboration, '_id'>): Promise<void> {
    try {
      await callCloudBase('tcb/databaseAdd', {
        query: `db.collection("${COLLECTIONS.COLLABORATIONS}").add`,
        data: { ...collaboration, timestamp: Date.now() },
      })
    } catch (error) {
      console.error('❌ 记录协作失败:', error)
    }
  }
}

// 导出单例
export const cloudbaseService = new CloudBaseService()
