import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()

// CloudBase AI 配置（从环境变量读取，Access Key 不再暴露在前端）
const CLOUDBASE_ACCESS_KEY = process.env.CLOUDBASE_ACCESS_KEY || ''
const CLOUDBASE_ENV_ID = process.env.CLOUDBASE_ENV_ID || 'cloud1-9g2sgrzmc39fa2a5'
const PORT = process.env.PORT || 80
const JWT_SECRET = process.env.JWT_SECRET || 'shortplay-secret-key-2025'

// 内存存储
const users = new Map()
const scripts = new Map()
let userIdCounter = 1
let scriptIdCounter = 1

app.use(cors())
app.use(express.json())

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ error: '需要登录' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Token无效' })
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ==================== 认证接口 ====================

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: '请填写所有必填项' })
  if (password.length < 6) return res.status(400).json({ error: '密码长度至少为6位' })
  if ([...users.values()].find(u => u.email === email)) return res.status(400).json({ error: '该邮箱已被注册' })
  const hashedPassword = await bcrypt.hash(password, 10)
  const id = userIdCounter++
  const user = { id, name, email, password: hashedPassword, role: 'writer', avatar: null, created_at: new Date().toISOString() }
  users.set(id, user)
  const userData = { id, name, email, role: 'writer' }
  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, message: '注册成功', user: userData, token })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = [...users.values()].find(u => u.email === email)
  if (!user) return res.status(401).json({ error: '邮箱或密码错误' })
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) return res.status(401).json({ error: '邮箱或密码错误' })
  const userData = { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, message: '登录成功', user: userData, token })
})

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.get(req.user.id)
  if (!user) return res.status(404).json({ error: '用户不存在' })
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, created_at: user.created_at } })
})

// ==================== 剧本接口 ====================

app.get('/api/scripts', authenticateToken, (req, res) => {
  const userScripts = [...scripts.values()].filter(s => s.user_id === req.user.id)
  res.json({ scripts: userScripts })
})

app.post('/api/scripts', authenticateToken, (req, res) => {
  const { title, description, genre, content, status } = req.body
  const id = scriptIdCounter++
  const script = { id, user_id: req.user.id, title: title || '未命名剧本', description: description || '', genre: genre || '', content: content || '', status: status || 'draft', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  scripts.set(id, script)
  res.json({ success: true, script })
})

app.put('/api/scripts/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id)
  const script = scripts.get(id)
  if (!script || script.user_id !== req.user.id) return res.status(404).json({ error: '剧本不存在或无权修改' })
  const { title, description, genre, content, status } = req.body
  script.title = title ?? script.title
  script.description = description ?? script.description
  script.genre = genre ?? script.genre
  script.content = content ?? script.content
  script.status = status ?? script.status
  script.updated_at = new Date().toISOString()
  scripts.set(id, script)
  res.json({ success: true, script })
})

app.delete('/api/scripts/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id)
  const script = scripts.get(id)
  if (!script || script.user_id !== req.user.id) return res.status(404).json({ error: '剧本不存在或无权删除' })
  scripts.delete(id)
  res.json({ success: true, message: '删除成功' })
})

// ==================== AI 代理接口 ====================
// AI 调用走后端代理，Access Key 不暴露在前端代码中

async function callCloudBaseAI(systemPrompt, userPrompt, model = 'hunyuan-turbos-latest') {
  const { CloudBase } = await import('@cloudbase/js-sdk')
  const app = CloudBase.init({
    env: CLOUDBASE_ENV_ID,
    accessKey: CLOUDBASE_ACCESS_KEY
  })
  const auth = app.auth({ persistence: 'local' })
  await auth.signInAnonymously()
  const ai = app.ai()
  const modelInstance = ai.createModel('hunyuan-exp')
  const res = await modelInstance.text({ model, messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ] })
  return res?.text || res?.content || res || ''
}

// 生成故事大纲
app.post('/api/ai/outline', authenticateToken, async (req, res) => {
  try {
    const { genre, theme, episodes, targetAudience, keyElements, style } = req.body
    const systemPrompt = `你是一个专业的短剧编剧助手，擅长创作各类爆款短剧剧本。\n1. 人物设定（主角、配角、反派）\n2. 故事梗概\n3. 付费卡点设计（第10集、第30集、第60集等）\n4. 分集概要（按阶段划分）\n风格：节奏快、冲突强、情绪张力大，每集结尾留有悬念或卡点。`
    const userPrompt = `题材类型：${genre || '都市言情'}，故事主题：${theme}，集数：${episodes}集，风格：${style}，目标受众：${targetAudience || '18-35岁女性'}，核心元素：${keyElements || '复仇、甜宠、豪门'}`
    const result = await callCloudBaseAI(systemPrompt, userPrompt)
    res.json({ success: true, result })
  } catch (error) {
    console.error('AI大纲生成错误:', error)
    res.status(500).json({ error: 'AI服务调用失败' })
  }
})

// 生成分集脚本
app.post('/api/ai/script', authenticateToken, async (req, res) => {
  try {
    const { outline, episodeRange, focusPoints, cliffhangerStyle } = req.body
    const systemPrompt = `你是一个专业的短剧编剧助手，擅长创作高能反转的短剧剧本。\n场景描述用【】包裹，角色台词用【角色名】：格式，旁白/内心OS用（内心OS）：格式，每集结尾设置悬念卡点，节奏要快，对话口语化。`
    const userPrompt = `根据以下大纲，生成第${episodeRange}集的分集脚本。故事大纲：${outline}，卡点风格：${cliffhangerStyle}，重点场景：${focusPoints || '无特别要求'}`
    const result = await callCloudBaseAI(systemPrompt, userPrompt)
    res.json({ success: true, result })
  } catch (error) {
    console.error('AI脚本生成错误:', error)
    res.status(500).json({ error: 'AI服务调用失败' })
  }
})

// 润色台词
app.post('/api/ai/polish', authenticateToken, async (req, res) => {
  try {
    const { originalText, style, emotion, target } = req.body
    const systemPrompt = `你是一个专业的短剧编剧，擅长润色和优化台词。语言风格：${style || '口语化'}，情绪强度：${emotion || '中等'}，优化目标：${target || '增强冲突感'}，每句台词控制在15字以内。`
    const result = await callCloudBaseAI(systemPrompt, `请帮我润色以下台词/场景描述：${originalText}`)
    res.json({ success: true, result })
  } catch (error) {
    console.error('AI润色错误:', error)
    res.status(500).json({ error: 'AI服务调用失败' })
  }
})

// 生成角色设定
app.post('/api/ai/character', authenticateToken, async (req, res) => {
  try {
    const { name, role, personality, background } = req.body
    const systemPrompt = `你是一个专业的短剧编剧助手，擅长创作立体鲜活的角色。包含：姓名、年龄、外貌特征、性格特点（内外反差）、背景故事、与其他角色的关系、在剧情中的作用、金句/口头禅。`
    const result = await callCloudBaseAI(systemPrompt, `角色姓名：${name}，角色定位：${role}，性格特点：${personality}，背景故事：${background}`)
    res.json({ success: true, result })
  } catch (error) {
    console.error('AI角色生成错误:', error)
    res.status(500).json({ error: 'AI服务调用失败' })
  }
})

// 生成剧情建议
app.post('/api/ai/plot', authenticateToken, async (req, res) => {
  try {
    const { currentPlot, episodeNumber, targetEmotion } = req.body
    const systemPrompt = `你是一个专业的短剧编剧助手，擅长设计高能剧情。剧情要有反转、有爆点，每50字左右设置一个小高潮，符合目标受众的审美，节奏紧凑。`
    const result = await callCloudBaseAI(systemPrompt, `当前剧情发展到第${episodeNumber}集：${currentPlot}，目标情绪：${targetEmotion}`)
    res.json({ success: true, result })
  } catch (error) {
    console.error('AI剧情建议错误:', error)
    res.status(500).json({ error: 'AI服务调用失败' })
  }
})

// ==================== 管理员接口 ====================

app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '需要管理员权限' })
  res.json({ users: [...users.values()].map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, created_at: u.created_at })) })
})

app.get('/api/admin/stats', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '需要管理员权限' })
  res.json({ stats: { totalUsers: users.size, totalScripts: scripts.size, publishedScripts: [...scripts.values()].filter(s => s.status === 'published').length, pendingScripts: [...scripts.values()].filter(s => s.status === 'pending').length } })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
