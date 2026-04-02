/**
 * CloudBase AI 服务 - 短剧编剧助手
 * AI 调用全部走后端 /api/ai/* 代理接口
 * Access Key 不再暴露在前端代码中
 */

const API_BASE = import.meta.env.VITE_API_URL || ''

async function callAI(path: string, body: Record<string, unknown>): Promise<string> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(`AI调用失败: ${res.status}`)
  const data = await res.json()
  return data.result || ''
}

export async function generateOutline(params: {
  genre: string; theme: string; episodes: string;
  targetAudience: string; keyElements: string; style: string;
}): Promise<string> {
  return callAI('/api/ai/outline', params)
}

export async function generateScript(params: {
  outline: string; episodeRange: string;
  focusPoints: string; cliffhangerStyle: string;
}): Promise<string> {
  return callAI('/api/ai/script', params)
}

export async function polishDialogue(params: {
  originalText: string; style: string; emotion: string; target: string;
}): Promise<string> {
  return callAI('/api/ai/polish', params)
}

export async function generateCharacter(params: {
  name: string; role: string; personality: string; background: string;
}): Promise<string> {
  return callAI('/api/ai/character', params)
}

export async function generatePlotSuggestions(params: {
  currentPlot: string; episodeNumber: number; targetEmotion: string;
}): Promise<string> {
  return callAI('/api/ai/plot', params)
}
