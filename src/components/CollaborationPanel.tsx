import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Users, Wifi, WifiOff, Link, Copy, Check, 
  Settings, Trash2, UserPlus, Crown, Edit3
} from 'lucide-react';
import type { CollaborationUser } from '@/hooks/useCollaboration';

interface CollaborationPanelProps {
  isConnected: boolean;
  isSynced: boolean;
  users: CollaborationUser[];
  currentUser: CollaborationUser;
  roomId: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onShare: (roomId: string) => void;
}

export default function CollaborationPanel({
  isConnected,
  isSynced,
  users,
  currentUser,
  roomId,
  onConnect,
  onDisconnect,
  onShare,
}: CollaborationPanelProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [customRoomId, setCustomRoomId] = useState(roomId);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const shareLink = `${window.location.origin}/editor?room=${roomId}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartCollaboration = () => {
    if (customRoomId && customRoomId !== roomId) {
      onShare(customRoomId);
    }
    onConnect();
    setShowSettings(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* 连接状态 */}
      <div className="flex items-center gap-2">
        {isConnected ? (
          <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 gap-1">
            <Wifi className="w-3 h-3" />
            已连接
            {isSynced && <span className="text-xs">(已同步)</span>}
          </Badge>
        ) : (
          <Badge variant="outline" className="border-slate-400 text-slate-500 gap-1">
            <WifiOff className="w-3 h-3" />
            未连接
          </Badge>
        )}
      </div>

      {/* 在线用户 */}
      {isConnected && users.length > 0 && (
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {users.slice(0, 4).map((user) => (
              <div
                key={user.id}
                className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.name.charAt(0)}
              </div>
            ))}
          </div>
          {users.length > 4 && (
            <span className="text-xs text-slate-500 ml-1">+{users.length - 4}</span>
          )}
        </div>
      )}

      {/* 协作设置按钮 */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Users className="w-4 h-4" />
            协作
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0D9488]" />
              实时协作设置
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* 当前状态 */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">房间ID</span>
                <code className="text-xs bg-white px-2 py-1 rounded border">{roomId}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">在线人数</span>
                <Badge variant="outline">{users.length} 人</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">你的角色</span>
                <Badge className="bg-[#0D9488]">{currentUser.name}</Badge>
              </div>
            </div>

            <Separator />

            {/* 自定义房间 */}
            <div className="space-y-2">
              <Label htmlFor="roomId">协作房间ID</Label>
              <Input
                id="roomId"
                value={customRoomId}
                onChange={(e) => setCustomRoomId(e.target.value)}
                placeholder="输入房间ID开始协作"
              />
              <p className="text-xs text-slate-500">
                相同房间ID的用户可以看到彼此的编辑
              </p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2">
              {!isConnected ? (
                <Button 
                  className="flex-1 bg-[#0D9488] hover:bg-[#0f766e]"
                  onClick={handleStartCollaboration}
                >
                  <Link className="w-4 h-4 mr-2" />
                  开始协作
                </Button>
              ) : (
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={onDisconnect}
                >
                  <WifiOff className="w-4 h-4 mr-2" />
                  断开连接
                </Button>
              )}
            </div>

            {/* 分享链接 */}
            {isConnected && (
              <div className="space-y-2">
                <Label>分享链接</Label>
                <div className="flex gap-2">
                  <Input
                    value={`${window.location.origin}/editor?room=${roomId}`}
                    readOnly
                    className="text-sm"
                  />
                  <Button size="sm" variant="outline" onClick={handleCopyLink}>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  复制链接给其他人，他们加入同一房间即可协作编辑
                </p>
              </div>
            )}

            {/* 用户列表 */}
            {isConnected && users.length > 0 && (
              <div className="space-y-2">
                <Label>在线用户</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-slate-50"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: user.color }}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500">
                          {user.id === currentUser.id ? '（你）' : '在线'}
                        </div>
                      </div>
                      {user.id === currentUser.id && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
