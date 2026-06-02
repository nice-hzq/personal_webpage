# 个人生活记录网页（GitHub Pages 版本）

这个仓库包含一个个人生活记录静态网站，已经准备好在 GitHub Pages 上部署。

## 已完成内容

- `life-website/`：项目源文件目录，包含完整网页代码。
- `docs/`：GitHub Pages 站点目录，内容已复制并可直接部署。
- `docs/.nojekyll`：禁用 Jekyll 处理，确保纯静态文件能正常显示。

## 如何在 GitHub Pages 上发布

1. 将仓库推送到 GitHub。
2. 打开仓库设置（Settings）。
3. 找到 `Pages` 或 `GitHub Pages` 配置。
4. 在 `Source` 处选择 `Deploy from a branch`。
5. 选择 `main` 或默认分支，然后选择 `docs/` 文件夹作为发布目录。
6. 保存后等待几分钟，GitHub 会自动生成静态站点。

站点 URL 通常为：

```
https://<你的用户名>.github.io/<仓库名>/
```

## 站点目录说明

- `docs/index.html`：入口页面
- `docs/assets/css/style.css`：样式文件
- `docs/assets/js/main.js`：页面交互脚本
- `docs/assets/images/`：图片资源目录
- `docs/assets/audio/`：音频资源目录
- `docs/.nojekyll`：避免 GitHub Pages 通过 Jekyll 处理内容

## 图片与音频资源

### 小瞬间图片（"生活里的那些小瞬间"模块）
- `assets/images/moment-01.jpg`
- `assets/images/moment-02.jpg`
- `assets/images/moment-03.jpg`
- `assets/images/moment-04.jpg`

### 经典句图片（"朋友与生活经典句"模块）
- `assets/images/quote-01.jpg`
- `assets/images/quote-02.jpg`
- `assets/images/quote-03.jpg`
- `assets/images/quote-04.jpg`

### BGM 背景音乐
- `assets/audio/bgm.mp3`
- 浏览器限制自动播放，需要用户点击右下角音乐按钮后才能播放。
- 播放状态会通过 localStorage 记录，但不强制自动打开音乐。

## 后续修改建议

- 如果你想直接修改站点内容，请在 `life-website/` 下编辑 `index.html`、`assets/css/style.css`、`assets/js/main.js`。
- 修改后可以手动将更新复制到 `docs/`，或使用后续脚本自动同步（此仓库暂未配置自动同步脚本）。

## 发布前检查

如果你要公开该网站，请先检查图片和文字内容是否适合公开展示，确保不包含隐私信息。