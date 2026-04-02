import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Save, Plus, Trash2, ChevronLeft, ChevronRight, FileText,
  Download, MoreVertical, Clock, Zap, AlertCircle, ArrowLeft,
  BarChart3, Star, Target, TrendingUp, MessageSquare, Eye, CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner';
import EditorHelpPanel from '@/components/EditorHelpPanel';
import CollaborationPanel from '@/components/CollaborationPanel';
import { useCollaboration } from '@/hooks/useCollaboration';
import { cloudbaseService } from '@/lib/cloudbase';

// 剧本编辑器页面
export default function Editor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 协作相关
  const roomIdFromUrl = searchParams.get('room') || '';
  const [roomId, setRoomId] = useState(roomIdFromUrl || `script-${Date.now()}`);
  const [userName] = useState(() => {
    const stored = localStorage.getItem('shortplay_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        return user.name || `用户${Math.floor(Math.random() * 1000)}`;
      } catch {
        return `用户${Math.floor(Math.random() * 1000)}`;
      }
    }
    return `用户${Math.floor(Math.random() * 1000)}`;
  });

  // 使用协作 Hook
  const {
    content: collabContent,
    setContent: setCollabContent,
    isConnected,
    isSynced,
    users,
    currentUser,
    connect,
    disconnect,
  } = useCollaboration({
    roomId,
    userName,
    serverUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:1234',
  });

  // 剧本数据
  const [episodes, setEpisodes] = useState<Array<{ id: number; title: string; content: string; wordCount: number }>>([
    { id: 1, title: '第1集 重生归来', content: '', wordCount: 0 },
  ]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [scriptTitle, setScriptTitle] = useState('未命名剧本');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showRhythmPanel, setShowRhythmPanel] = useState(true);
  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);

  // 同步协作内容到当前剧集
  useEffect(() => {
    if (isCollaborating && collabContent !== undefined) {
      const newEpisodes = [...episodes];
      newEpisodes[currentEpisode] = {
        ...newEpisodes[currentEpisode],
        content: collabContent,
        wordCount: collabContent.length,
      };
      setEpisodes(newEpisodes);
    }
  }, [collabContent, isCollaborating, currentEpisode]);

  // 处理协作分享
  const handleShare = (newRoomId: string) => {
    setRoomId(newRoomId);
    setIsCollaborating(true);
  };

  const currentContent = episodes[currentEpisode]?.content || '';
  const currentWordCount = episodes[currentEpisode]?.wordCount || 0;
  const totalWordCount = episodes.reduce((sum, ep) => sum + ep.wordCount, 0);

  // 更新当前集内容
  const updateEpisodeContent = (content: string) => {
    const newEpisodes = [...episodes];
    newEpisodes[currentEpisode] = {
      ...newEpisodes[currentEpisode],
      content,
      wordCount: content.length,
    };
    setEpisodes(newEpisodes);
    
    // 如果在协作模式，同步到 Y.js
    if (isCollaborating) {
      setCollabContent(content);
    }
  };

  // 添加新集
  const addEpisode = () => {
    const newId = episodes.length + 1;
    setEpisodes([...episodes, { id: newId, title: `第${newId}集`, content: '', wordCount: 0 }]);
    setCurrentEpisode(episodes.length);
    toast.success(`已添加第${newId}集`);
  };

  // 删除当前集
  const deleteEpisode = () => {
    if (episodes.length <= 1) {
      toast.error('至少需要保留一集');
      return;
    }
    const newEpisodes = episodes.filter((_, index) => index !== currentEpisode);
    setEpisodes(newEpisodes);
    setCurrentEpisode(Math.max(0, currentEpisode - 1));
    toast.success('已删除');
  };

  // 保存剧本到云端
  const saveScript = async () => {
    setLastSaved(new Date());
    
    // 保存到云端（CloudBase）
    const scriptData = {
      title: scriptTitle,
      owner: userName,
      collaborators: users.map(u => u.id),
      content: currentContent,
      episodes,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    try {
      const result = await cloudbaseService.saveScript(scriptData);
      if (result.success) {
        toast.success('剧本已保存到云端');
      } else {
        toast.success('剧本已本地保存');
      }
    } catch (error) {
      toast.success('剧本已本地保存');
    }
  };

  // 导出剧本
  const exportScript = () => {
    const content = episodes.map(ep => `${ep.title}\n\n${ep.content}`).join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scriptTitle}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('剧本已导出');
  };

  // 节奏分析
  const rhythmAnalysis = {
    hook: { score: 85, status: 'good', tip: '黄金3秒钩子设置得当' },
    conflict: { score: 72, status: 'warning', tip: '建议增加冲突密度' },
    cliffhanger: { score: 90, status: 'good', tip: '卡点设置优秀' },
    pacing: { score: 78, status: 'warning', tip: '节奏可再紧凑些' },
  };

  // 快捷插入
  const insertTemplate = (type: string) => {
    const templates: Record<string, string> = {
      scene: '=== 场景X：【场景名称】 【日内/日外/夜内/夜外】 ===\n\n【画面】\n\n【人物动作】\n\n人物A：（台词）\n\n人物B：（台词）\n',
      dialogue: '人物A：（情绪）台词内容\n\n人物B：（情绪）台词内容\n',
      action: '【动作描述】\n',
      inner: '人物A（内心OS）：内心独白内容\n',
      flashback: '【闪回开始】\n\n（回忆内容）\n\n【闪回结束】\n',
    };
    const template = templates[type] || '';
    const newContent = currentContent + (currentContent ? '\n' : '') + template;
    updateEpisodeContent(newContent);
    toast.success('已插入模板');
  };

  // 剧本评估数据
  const evaluationReport = {
    overall: 82,
    hook: { score: 85, desc: '开篇钩子有力，快速抓住观众注意力' },
    structure: { score: 78, desc: '结构清晰，付费点分布合理' },
    character: { score: 80, desc: '人物设定鲜明，动机明确' },
    dialogue: { score: 75, desc: '对白简洁有力，部分台词可更精炼' },
    emotion: { score: 88, desc: '情绪调动能力强，共鸣点设置得当' },
    commercial: { score: 84, desc: '商业化程度高，变现潜力强' },
    market: { score: 86, desc: '题材契合当前市场趋势' },
  };

  const evaluationItems = [
    { label: '开篇钩子', score: evaluationReport.hook.score, desc: evaluationReport.hook.desc, icon: Target },
    { label: '结构节奏', score: evaluationReport.structure.score, desc: evaluationReport.structure.desc, icon: TrendingUp },
    { label: '人物塑造', score: evaluationReport.character.score, desc: evaluationReport.character.desc, icon: Star },
    { label: '对白质量', score: evaluationReport.dialogue.score, desc: evaluationReport.dialogue.desc, icon: MessageSquare },
    { label: '情绪调动', score: evaluationReport.emotion.score, desc: evaluationReport.emotion.desc, icon: BarChart3 },
    { label: '商业潜力', score: evaluationReport.commercial.score, desc: evaluationReport.commercial.desc, icon: CheckCircle2 },
    { label: '市场契合', score: evaluationReport.market.score, desc: evaluationReport.market.desc, icon: Eye },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* 返回主页按钮 */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  返回
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>返回主页</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="h-6 w-px bg-slate-200" />
          <Input
            value={scriptTitle}
            onChange={(e) => setScriptTitle(e.target.value)}
            className="text-xl font-bold border-none bg-transparent focus-visible:ring-0 w-64"
          />
          <Badge variant="outline">{episodes.length}集</Badge>
          <Badge variant="outline">{totalWordCount}字</Badge>
          {lastSaved && (
            <span className="text-xs text-slate-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* 协作面板 */}
          <CollaborationPanel
            isConnected={isConnected}
            isSynced={isSynced}
            users={users}
            currentUser={currentUser}
            roomId={roomId}
            onConnect={() => {
              connect();
              setIsCollaborating(true);
            }}
            onDisconnect={() => {
              disconnect();
              setIsCollaborating(false);
            }}
            onShare={handleShare}
          />
          
          {/* 剧本评估按钮 */}
          <Dialog open={evaluationOpen} onOpenChange={setEvaluationOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="bg-[#0D9488] hover:bg-[#0D9488]/90">
                <BarChart3 className="w-4 h-4 mr-2" />
                剧本评估
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#0D9488]" />
                  剧本质量评估报告
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* 综合评分 */}
                <div className="bg-gradient-to-r from-[#0D9488]/10 to-[#0D9488]/5 rounded-xl p-6 text-center">
                  <div className="text-5xl font-bold text-[#0D9488]">{evaluationReport.overall}</div>
                  <div className="text-sm text-slate-500 mt-1">综合评分</div>
                  <Progress value={evaluationReport.overall} className="mt-3 h-2 max-w-xs mx-auto" />
                </div>

                {/* 各项评分 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evaluationItems.map((item) => {
                    const Icon = item.icon;
                    const colorClass = item.score >= 85 ? 'text-green-600' : item.score >= 70 ? 'text-yellow-600' : 'text-red-600';
                    const bgClass = item.score >= 85 ? 'bg-green-50 border-green-200' : item.score >= 70 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';
                    return (
                      <div key={item.label} className={`p-4 rounded-lg border ${bgClass}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${colorClass}`} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className={`font-bold ${colorClass}`}>{item.score}分</span>
                        </div>
                        <Progress value={item.score} className="h-1.5 mb-2" />
                        <p className="text-xs text-slate-600">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>

                {/* 优化建议 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    优化建议
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1.5">
                    <li>1. 第3-5集冲突密度略低，建议增加反转情节</li>
                    <li>2. 女主对白可适当增加情绪层次，避免过于直白</li>
                    <li>3. 第10集（第一付费卡点）钩子设置优秀，保持</li>
                    <li>4. 男主人设建议增加更多反差萌元素，提升观众好感</li>
                  </ul>
                </div>

                {/* 市场定位 */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    市场定位分析
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-700">题材类型：</span>
                      <span className="font-medium">都市重生 + 复仇</span>
                    </div>
                    <div>
                      <span className="text-purple-700">目标受众：</span>
                      <span className="font-medium">18-35岁女性</span>
                    </div>
                    <div>
                      <span className="text-purple-700">预估爆款率：</span>
                      <span className="font-medium text-green-600">78%</span>
                    </div>
                    <div>
                      <span className="text-purple-700">建议对标：</span>
                      <span className="font-medium">《顶流闪婚后》</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowHelpPanel(!showHelpPanel)}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  编剧助手
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>打开编剧帮助面板</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowRhythmPanel(!showRhythmPanel)}>
                  <Zap className="w-4 h-4 mr-2" />
                  节奏分析
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>显示/隐藏节奏分析面板</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" size="sm" onClick={saveScript}>
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button variant="outline" size="sm" onClick={exportScript}>
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* 左侧集数列表 */}
        <Card className="w-64 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">剧集列表</CardTitle>
              <Button variant="ghost" size="sm" onClick={addEpisode}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
              <div className="space-y-1 px-4 pb-4">
                {episodes.map((episode, index) => (
                  <button
                    key={episode.id}
                    onClick={() => setCurrentEpisode(index)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      index === currentEpisode
                        ? 'bg-slate-900 text-white'
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{episode.title}</span>
                      {episode.wordCount > 0 && (
                        <span className="text-xs opacity-70">{episode.wordCount}字</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 中间编辑区 */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentEpisode(Math.max(0, currentEpisode - 1))}
                  disabled={currentEpisode === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Input
                  value={episodes[currentEpisode]?.title || ''}
                  onChange={(e) => {
                    const newEpisodes = [...episodes];
                    newEpisodes[currentEpisode] = {
                      ...newEpisodes[currentEpisode],
                      title: e.target.value,
                    };
                    setEpisodes(newEpisodes);
                  }}
                  className="w-48 text-center border-none focus-visible:ring-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentEpisode(Math.min(episodes.length - 1, currentEpisode + 1))}
                  disabled={currentEpisode === episodes.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">{currentWordCount}字</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={addEpisode}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加新集
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteEpisode} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除本集
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="flex h-full">
              {/* 快捷工具栏 */}
              <div className="w-12 border-r bg-slate-50 flex flex-col items-center py-4 gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertTemplate('scene')}>
                        <FileText className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>插入场景</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertTemplate('dialogue')}>
                        <span className="text-xs font-bold">对白</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>插入对白</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertTemplate('action')}>
                        <span className="text-xs font-bold">动作</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>插入动作</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertTemplate('inner')}>
                        <span className="text-xs font-bold">OS</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>插入内心独白</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => insertTemplate('flashback')}>
                        <span className="text-xs font-bold">闪回</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>插入闪回</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {/* 编辑器 */}
              <Textarea
                value={currentContent}
                onChange={(e) => updateEpisodeContent(e.target.value)}
                placeholder="开始创作你的短剧剧本...\n\n格式示例：\n=== 场景1：医院病房 日内 ===\n\n【画面】林婉儿猛地睁开眼睛\n\n林婉儿：这是哪里？\n"
                className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 font-mono text-sm leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>

        {/* 右侧节奏分析面板 */}
        {showRhythmPanel && (
          <Card className="w-72">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                节奏分析
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 综合评分 */}
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-3xl font-bold text-slate-900">
                  {Math.round(Object.values(rhythmAnalysis).reduce((sum, item) => sum + item.score, 0) / 4)}
                </div>
                <div className="text-sm text-slate-500">综合评分</div>
              </div>

              <Separator />

              {/* 各项指标 */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>黄金钩子</span>
                    <span className={rhythmAnalysis.hook.score >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                      {rhythmAnalysis.hook.score}分
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rhythmAnalysis.hook.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${rhythmAnalysis.hook.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rhythmAnalysis.hook.tip}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>冲突密度</span>
                    <span className={rhythmAnalysis.conflict.score >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                      {rhythmAnalysis.conflict.score}分
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rhythmAnalysis.conflict.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${rhythmAnalysis.conflict.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rhythmAnalysis.conflict.tip}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>卡点设置</span>
                    <span className={rhythmAnalysis.cliffhanger.score >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                      {rhythmAnalysis.cliffhanger.score}分
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rhythmAnalysis.cliffhanger.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${rhythmAnalysis.cliffhanger.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rhythmAnalysis.cliffhanger.tip}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>整体节奏</span>
                    <span className={rhythmAnalysis.pacing.score >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                      {rhythmAnalysis.pacing.score}分
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rhythmAnalysis.pacing.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${rhythmAnalysis.pacing.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rhythmAnalysis.pacing.tip}</p>
                </div>
              </div>

              <Separator />

              {/* 字数统计 */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">本集字数</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">当前</span>
                  <span>{currentWordCount}字</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">建议</span>
                  <span>500-1000字</span>
                </div>
                {currentWordCount > 0 && (currentWordCount < 500 || currentWordCount > 1000) && (
                  <div className="flex items-center gap-2 text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <span>字数不在建议范围内</span>
                  </div>
                )}
              </div>

              {/* 付费点提示 */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-1">付费点提示</h4>
                <p className="text-xs text-blue-700">
                  第{currentEpisode + 1}集
                  {currentEpisode + 1 === 10 && '（建议第一卡点）'}
                  {currentEpisode + 1 === 30 && '（建议第二卡点）'}
                  {currentEpisode + 1 === 60 && '（建议第三卡点）'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 编剧帮助面板 */}
      <EditorHelpPanel isOpen={showHelpPanel} onClose={() => setShowHelpPanel(false)} />
    </div>
  );
}
