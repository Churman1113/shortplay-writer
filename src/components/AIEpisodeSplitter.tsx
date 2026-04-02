import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Sparkles, 
  Scissors, 
  Copy, 
  Check, 
  Loader2,
  AlertCircle,
  Trash2,
  Plus,
  FileText
} from 'lucide-react'

interface Episode {
  id: number
  title: string
  content: string
  wordCount: number
  summary: string
}

interface AIEpisodeSplitterProps {
  onEpisodesGenerated?: (episodes: Episode[], scriptTitle: string) => void
}

export default function AIEpisodeSplitter({ onEpisodesGenerated }: AIEpisodeSplitterProps) {
  const [fullContent, setFullContent] = useState('')
  const [scriptTitle, setScriptTitle] = useState('')
  const [targetEpisodes, setTargetEpisodes] = useState(80)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [error, setError] = useState('')

  // 模拟AI分集逻辑
  const analyzeAndSplit = async () => {
    if (!fullContent.trim()) {
      setError('请输入剧本内容')
      return
    }

    if (!scriptTitle.trim()) {
      setError('请输入剧本标题')
      return
    }

    setError('')
    setIsAnalyzing(true)

    // 模拟AI分析延迟
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 简单的分集逻辑（模拟AI分集）
    const content = fullContent.trim()
    const avgWordsPerEpisode = Math.ceil(content.length / targetEpisodes)
    
    // 按段落分割
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
    const result: Episode[] = []
    
    let currentEpisode = 1
    let currentContent = ''
    let currentWordCount = 0

    paragraphs.forEach((paragraph, index) => {
      currentContent += paragraph + '\n\n'
      currentWordCount += paragraph.length

      // 当字数达到目标或到最后一个段落时创建新集
      if (currentWordCount >= avgWordsPerEpisode || index === paragraphs.length - 1) {
        // 生成剧集标题（模拟AI生成）
        const episodeTitles = [
          '意外相遇', '暗生情愫', '危机四伏', '真相大白', '峰回路转',
          '情深意重', '误会丛生', '化险为夷', '真情流露', '圆满结局',
          '命运转折', '破镜重圆', '携手同行', '风雨同舟', '再续前缘'
        ]
        
        result.push({
          id: currentEpisode,
          title: episodeTitles[(currentEpisode - 1) % episodeTitles.length] + ` (第${currentEpisode}集)`,
          content: currentContent.trim(),
          wordCount: currentWordCount,
          summary: `第${currentEpisode}集：${currentContent.slice(0, 100)}...`
        })

        currentEpisode++
        currentContent = ''
        currentWordCount = 0
      }
    })

    // 如果集数不够目标，添加空集
    while (result.length < targetEpisodes) {
      result.push({
        id: result.length + 1,
        title: `第${result.length + 1}集：待续`,
        content: '',
        wordCount: 0,
        summary: `第${result.length + 1}集内容待补充`
      })
    }

    setEpisodes(result)
    setIsAnalyzing(false)

    if (onEpisodesGenerated) {
      onEpisodesGenerated(result, scriptTitle)
    }
  }

  const copyEpisode = (episode: Episode) => {
    navigator.clipboard.writeText(`【${episode.title}】\n\n${episode.content}`)
    setCopiedId(episode.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const copyAll = () => {
    const allContent = episodes.map(ep => 
      `【${ep.title}】\n\n${ep.content}`
    ).join('\n\n' + '='.repeat(50) + '\n\n')
    
    navigator.clipboard.writeText(allContent)
    setCopiedId(-1)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const reset = () => {
    setFullContent('')
    setScriptTitle('')
    setEpisodes([])
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* 输入区域 */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#134E4A] flex items-center gap-2">
            <Scissors className="h-5 w-5 text-[#F97316]" />
            AI智能分集
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 剧本标题 */}
          <div className="space-y-2">
            <Label htmlFor="script-title" className="text-[#134E4A]">剧本标题</Label>
            <Input
              id="script-title"
              placeholder="例如：霸道总裁的小娇妻"
              value={scriptTitle}
              onChange={(e) => setScriptTitle(e.target.value)}
              className="border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
            />
          </div>

          {/* 目标集数 */}
          <div className="space-y-2">
            <Label htmlFor="target-episodes" className="text-[#134E4A]">目标集数</Label>
            <div className="flex gap-3">
              {[60, 80, 100, 120].map(num => (
                <button
                  key={num}
                  onClick={() => setTargetEpisodes(num)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    targetEpisodes === num
                      ? 'bg-[#0D9488] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num}集
                </button>
              ))}
              <Input
                type="number"
                min={10}
                max={200}
                value={targetEpisodes}
                onChange={(e) => setTargetEpisodes(Number(e.target.value))}
                className="w-24 border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488]"
              />
            </div>
          </div>

          {/* 剧本内容 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="full-content" className="text-[#134E4A]">完整剧本内容</Label>
              <span className="text-xs text-slate-500">
                {fullContent.length.toLocaleString()} 字
              </span>
            </div>
            <Textarea
              id="full-content"
              placeholder="在此粘贴您的完整剧本内容（支持分段粘贴）..."
              value={fullContent}
              onChange={(e) => setFullContent(e.target.value)}
              className="min-h-[300px] border-[#0D9488]/20 focus:border-[#0D9488] focus:ring-[#0D9488] font-mono text-sm"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={analyzeAndSplit}
              disabled={isAnalyzing || !fullContent.trim()}
              className="flex-1 bg-gradient-to-r from-[#0D9488] to-[#134E4A] hover:opacity-90 text-white"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  AI分析中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  开始AI分集
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="border-[#0D9488]/20 text-[#134E4A] hover:bg-[#0D9488]/5"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              清空
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 分集结果 */}
      {episodes.length > 0 && (
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#134E4A] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#0D9488]" />
                分集结果
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge className="bg-[#0D9488] text-white">
                  共{episodes.length}集
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAll}
                  className="border-[#0D9488]/20 text-[#134E4A] hover:bg-[#0D9488]/5"
                >
                  {copiedId === -1 ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  复制全部
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {scriptTitle} - 预计总字数：{(fullContent.length).toLocaleString()}字
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-[#0D9488]/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[#0D9488] border-[#0D9488]/30">
                          第{episode.id}集
                        </Badge>
                        <h4 className="font-medium text-[#134E4A] truncate">{episode.title}</h4>
                        {episode.wordCount > 0 && (
                          <span className="text-xs text-slate-400">
                            {episode.wordCount.toLocaleString()}字
                          </span>
                        )}
                      </div>
                      {episode.content && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {episode.content.slice(0, 200)}...
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyEpisode(episode)}
                      className="flex-shrink-0 text-slate-500 hover:text-[#0D9488]"
                    >
                      {copiedId === episode.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card className="border-0 shadow-md bg-[#F97316]/5">
        <CardContent className="p-4">
          <h4 className="font-medium text-[#134E4A] mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#F97316]" />
            AI分集使用说明
          </h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>1. 输入剧本标题，用于识别和管理</li>
            <li>2. 选择目标集数，系统会根据总字数估算每集长度</li>
            <li>3. 将完整剧本内容粘贴到文本框中，支持多次粘贴追加</li>
            <li>4. 点击"开始AI分集"，系统会自动分析并分割剧集</li>
            <li>5. 分集完成后可单独或批量复制各集内容</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
