# Favicon Status

一个用于动态更新网站 favicon 状态的轻量级库。支持原生 JavaScript、Vue 和 React。

## 灵感来源

这个项目的灵感来源于 Vercel 部署平台的一个精致的产品细节 - 在项目部署过程中,浏览器标签页的 favicon 会动态显示不同状态:部署中显示为黄色,部署成功显示为绿色,部署失败显示为红色。这种视觉反馈让用户无需切换到部署页面就能实时了解部署状态。

## 特性

- 🎨 支持自定义状态颜色
- 🔄 实时更新 favicon 状态
- 📦 支持 Vue 和 React 组件
- 🎯 TypeScript 支持
- 🪶 轻量级，无依赖

## 安装

```bash
npm install favicon-status
# 或
yarn add favicon-status
```

## 基础使用

```typescript
import { FaviconStatus } from 'favicon-status';

const favicon = new FaviconStatus({
  originalFaviconUrl: '/favicon.ico',
  size: 32,
  dotSize: 12,        // 状态点大小
  dotPosition: { x: 26, y: 26 }  // 状态点位置
});

// 更新状态
favicon.updateStatus('pending'); // 显示加载状态
favicon.updateStatus('success'); // 显示成功状态
favicon.updateStatus('error');   // 显示错误状态
```

## Vue 使用示例

```vue
<template>
  <FaviconStatus 
    :status="status"
    :options="faviconOptions"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FaviconStatus } from 'favicon-status/vue';

const status = ref('success');
const faviconOptions = {
  originalFaviconUrl: '/favicon.ico',
  size: 32,
  dotSize: 12,
  dotPosition: { x: 26, y: 26 }
};
</script>
```

## React 使用示例

```tsx
import { useState } from 'react';
import { FaviconStatus } from 'favicon-status/react';

function App() {
  const [status, setStatus] = useState('success');
  
  const faviconOptions = {
    originalFaviconUrl: '/favicon.ico',
    size: 32,
    dotSize: 12,
    dotPosition: { x: 26, y: 26 }
  };

  return (
    <FaviconStatus 
      status={status}
      options={faviconOptions}
    />
  );
}
```

## API

### FaviconOptions

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| originalFaviconUrl | string | - | 原始favicon的URL（必填）。支持相对路径和绝对路径。如果使用跨域资源，需确保服务器允许跨域访问。 |
| size | number | 32 | favicon的尺寸 |
| dotSize | number | 12 | 状态点的尺寸 |
| dotPosition | { x: number, y: number } | { x: 26, y: 26 } | 状态点的位置 |
| statusColors | object | 见下方 | 状态颜色配置 |

默认状态颜色：
```typescript
{
  pending: '#FFA500',  // 橙色
  success: '#4CAF50',  // 绿色
  error: '#f44336'     // 红色
}
```

### 方法

#### updateStatus(status: StatusType)
更新favicon的状态

#### updateOptions(options: Partial<FaviconOptions>)
更新配置选项

#### destroy()
清理资源并恢复原始favicon

#### getOptions()
获取当前配置

## 浏览器支持

- Chrome
- Firefox
- Safari
- Edge
- IE11+

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## License

MIT © [Bazinga]

## 贡献

欢迎提交 Issue 和 Pull Request！

## 注意事项

1. **路径设置**
   - 使用相对路径时，路径是相对于当前 HTML 文件的位置
   - 建议使用绝对路径（以 / 开头）以避免路径解析问题
   - 确保 favicon 文件存在且可访问

2. **跨域访问**
   - 如果 favicon 位于不同域名下，需要确保服务器允许跨域访问
   - 服务器需要设置正确的 CORS 头部

3. **浏览器兼容性**
   - 在 IE11 中可能需要额外的 polyfill 支持
   - 某些旧版浏览器可能不支持动态更新 favicon

4. **性能考虑**
   - favicon 图片建议不要太大，推荐尺寸 32x32
   - 状态更新频率不要太高，避免频繁重绘


