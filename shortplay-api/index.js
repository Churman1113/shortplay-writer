/**
 * 短剧编剧助手 - 云函数
 * 管理员账户：Churman1113@outlook.com / a123456789.
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'shortplay-secret-key-2025'

// 内存存储（云函数每次调用都是新的实例）
const users = new Map()
const scripts = new Map()
let userIdCounter = 1
let scriptIdCounter = 1
let initialized = false

// 初始化管理员
async function initAdmin() {
  if (initialized) return
  
  const adminEmail = 'Churman1113@outlook.com'
  if (![...users.values()].find(u => u.email === adminEmail)) {
    const hashedPassword = await bcrypt.hash('a123456789.', 10)
    const adminUser = {
      id: userIdCounter++,
      name: '管理员',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      avatar: null,
      created_at: new Date().toISOString()
    }
    users.set(adminUser.id, adminUser)
    console.log('管理员账户已创建')
  }
  initialized = true
}

// 生成token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// 验证token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

// 云函数入口
exports.main = async (event, context) => {
  // 初始化
  await initAdmin()

  const { path, httpMethod, headers, queryStringParameters, body, queryString } = event

  // CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' }
  }

  // 解析body
  let reqBody = {}
  if (body) {
    try {
      reqBody = typeof body === 'string' ? JSON.parse(body) : body
    } catch (e) {}
  }

  // 从多个可能的位置获取路径
  let url = path || queryString?.path || queryStringParameters?.path || '/'

  // 移除 /api 前缀（如果路由已配置 /api 映射）
  if (url.startsWith('/api')) {
    url = url.substring(4)
  }

  // 如果移除 /api 后为空，则设为 /
  if (!url) url = '/'

  console.log('原始路径:', path, '-> 处理后:', url)
  const method = (httpMethod || 'GET').toLowerCase()

  try {
    // 登录
    if (url === '/auth/login' && method === 'post') {
      const { email, password } = reqBody

      if (!email || !password) {
        return {
          statusCode: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '请填写邮箱和密码' })
        }
      }

      const user = [...users.values()].find(u => u.email === email)
      if (!user) {
        return {
          statusCode: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '邮箱或密码错误' })
        }
      }

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        return {
          statusCode: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '邮箱或密码错误' })
        }
      }

      const token = generateToken(user)

      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
          token
        })
      }
    }

    // 获取当前用户
    if (url === '/auth/me' && method === 'get') {
      const token = headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return {
          statusCode: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '请先登录' })
        }
      }

      const decoded = verifyToken(token)
      if (!decoded) {
        return {
          statusCode: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'token无效' })
        }
      }

      const user = users.get(decoded.id)
      if (!user) {
        return {
          statusCode: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: '用户不存在' })
        }
      }

      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { id: user.id, name: user.name, email: user.email, role: user.role }
        })
      }
    }

    // 获取用户列表
    if (url === '/users' && method === 'get') {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token) {
        return { statusCode: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '请先登录' }) }
      }

      const decoded = verifyToken(token)
      if (!decoded || decoded.role !== 'admin') {
        return { statusCode: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '需要管理员权限' }) }
      }

      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          users: [...users.values()].map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, created_at: u.created_at }))
        })
      }
    }

    // 注册
    if (url === '/auth/register' && method === 'post') {
      const { name, email, password } = reqBody

      if (!name || !email || !password) {
        return { statusCode: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '请填写所有字段' }) }
      }

      if ([...users.values()].find(u => u.email === email)) {
        return { statusCode: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '该邮箱已被注册' }) }
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = {
        id: userIdCounter++,
        name, email, password: hashedPassword,
        role: 'writer',
        created_at: new Date().toISOString()
      }
      users.set(newUser.id, newUser)

      const token = generateToken(newUser)

      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { id: newUser.id, name, email, role: 'writer' },
          token
        })
      }
    }

    // 剧本接口
    if (url === '/scripts' && method === 'get') {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token) {
        return { statusCode: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '请先登录' }) }
      }
      const decoded = verifyToken(token)
      if (!decoded) {
        return { statusCode: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'token无效' }) }
      }
      const userScripts = [...scripts.values()].filter(s => s.userId === decoded.id)
      return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ scripts: userScripts }) }
    }

    if (url === '/scripts' && method === 'post') {
      const token = headers.authorization?.replace('Bearer ', '')
      if (!token) {
        return { statusCode: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: '请先登录' }) }
      }
      const decoded = verifyToken(token)
      if (!decoded) {
        return { statusCode: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'token无效' }) }
      }
      const { title, genre, logline } = reqBody
      const newScript = {
        id: scriptIdCounter++,
        userId: decoded.id,
        title: title || '未命名剧本',
        genre: genre || '其他',
        logline: logline || '',
        content: '',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      scripts.set(newScript.id, newScript)
      return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ script: newScript }) }
    }

    return {
      statusCode: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '接口不存在' })
    }

  } catch (err) {
    console.error('错误:', err)
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: '服务器错误: ' + err.message })
    }
  }
}
