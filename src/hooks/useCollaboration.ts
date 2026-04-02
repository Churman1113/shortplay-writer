import { useEffect, useState, useRef, useCallback } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

export interface CollaborationUser {
  id: string;
  name: string;
  color: string;
  cursor?: { index: number; length: number };
}

export interface UseCollaborationOptions {
  roomId: string;
  userName: string;
  serverUrl?: string;
}

export interface UseCollaborationReturn {
  // 编辑器内容
  content: string;
  setContent: (content: string) => void;
  
  // 连接状态
  isConnected: boolean;
  isSynced: boolean;
  
  // 在线用户
  users: CollaborationUser[];
  
  // 当前用户
  currentUser: CollaborationUser;
  
  // 连接方法
  connect: () => void;
  disconnect: () => void;
}

// 用户颜色池
const userColors = [
  '#F97316', // 橙色
  '#8B5CF6', // 紫色
  '#EC4899', // 粉色
  '#14B8A6', // 青色
  '#EAB308', // 黄色
  '#6366F1', // 靛蓝
  '#EF4444', // 红色
  '#22C55E', // 绿色
];

// 生成随机用户
const generateUser = (name: string): CollaborationUser => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  color: userColors[Math.floor(Math.random() * userColors.length)],
});

export function useCollaboration({
  roomId,
  userName,
  serverUrl = 'ws://localhost:1234',
}: UseCollaborationOptions): UseCollaborationReturn {
  // Y.js 文档
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);
  const persistenceRef = useRef<IndexeddbPersistence | null>(null);
  const ytextRef = useRef<Y.Text | null>(null);
  
  // 状态
  const [isConnected, setIsConnected] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [users, setUsers] = useState<CollaborationUser[]>([]);
  const [currentUser] = useState<CollaborationUser>(() => generateUser(userName));
  const [content, setContentState] = useState('');

  // 连接
  const connect = useCallback(() => {
    if (providerRef.current) return;

    // 创建 Y.Doc
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    
    // 获取文本
    const ytext = ydoc.getText('content');
    ytextRef.current = ytext;

    // 本地持久化（IndexedDB）
    const persistence = new IndexeddbPersistence(`shortplay-${roomId}`, ydoc);
    persistenceRef.current = persistence;

    persistence.on('synced', () => {
      console.log('Local content loaded');
    });

    // WebSocket 连接
    const provider = new WebsocketProvider(serverUrl, roomId, ydoc, {
      connect: true,
    });
    providerRef.current = provider;

    // 设置用户信息
    provider.awareness.setLocalStateField('user', currentUser);

    // 连接状态监听
    provider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    // 同步状态
    provider.on('sync', (synced: boolean) => {
      setIsSynced(synced);
    });

    // 监听文本变化
    ytext.observe(() => {
      setContentState(ytext.toString());
    });

    // 监听用户变化
    const updateUsers = () => {
      const states = provider.awareness.getStates();
      const userList: CollaborationUser[] = [];
      states.forEach((state) => {
        if (state.user) {
          userList.push(state.user as CollaborationUser);
        }
      });
      setUsers(userList);
    };

    provider.awareness.on('change', updateUsers);
    updateUsers();
  }, [roomId, serverUrl, currentUser]);

  // 断开连接
  const disconnect = useCallback(() => {
    if (providerRef.current) {
      providerRef.current.disconnect();
      providerRef.current.destroy();
      providerRef.current = null;
    }
    if (persistenceRef.current) {
      persistenceRef.current.destroy();
      persistenceRef.current = null;
    }
    if (ydocRef.current) {
      ydocRef.current.destroy();
      ydocRef.current = null;
    }
    setIsConnected(false);
    setIsSynced(false);
    setUsers([]);
  }, []);

  // 设置内容
  const setContent = useCallback((newContent: string) => {
    if (ytextRef.current) {
      ydocRef.current?.transact(() => {
        ytextRef.current!.delete(0, ytextRef.current!.length);
        ytextRef.current!.insert(0, newContent);
      });
    }
    setContentState(newContent);
  }, []);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    content,
    setContent,
    isConnected,
    isSynced,
    users,
    currentUser,
    connect,
    disconnect,
  };
}
