// script.js
// Paper - 轻量级微信公众号 Markdown 编辑器主要功能文件

// 等待 DOM 加载完成后执行脚本
document.addEventListener('DOMContentLoaded', () => {
  // 等待所有库加载完成
  function waitForLibraries() {
    return new Promise((resolve) => {
      const checkLibraries = () => {
        const hljs = !!window.hljs;
        const showdown = !!window.showdown;
        const codemirror = !!window.CodeMirror;

        console.log('Library status:', { hljs, showdown, codemirror });

        if (hljs && showdown && codemirror) {
          resolve();
        } else {
          setTimeout(checkLibraries, 100);
        }
      };
      checkLibraries();
    });
  }

  // 等待库加载完成后初始化
  waitForLibraries().then(() => {
    console.log('All libraries loaded, initializing...');

    // 初始化 highlight.js
    if (window.hljs) {
      hljs.configure({
        ignoreUnescapedHTML: true
      });
      console.log('highlight.js loaded successfully');
    } else {
      console.error('highlight.js not loaded');
    }

    // 初始化编辑器
    initializeEditor();
  });

  function initializeEditor() {
    // 初始化 Showdown 转换器
    const converter = new showdown.Converter({
      tables: true,
      ghCodeBlocks: true,
      strikethrough: true,
      tasklists: true,
      emoji: true,
      underline: true,
      ghCompatibleHeaderId: true,
      parseImgDimensions: true
    });

    // 默认示例内容常量（用于恢复默认内容与首次加载）
    const DEFAULT_MD_CONTENT = `## Paper 编辑器简介

> **Paper** 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。预览区与微信公众号编辑器等宽，所见即所得。欢迎使用👏！ **定制属于每个人自己的微信公众号样式！**

![](https://pic2.zhimg.com/v2-8b3e679e2d23b3516650c9e451fde283_r.jpg)


### 🎯 核心特性

**1. 现代化三栏布局**
- 编辑区：支持 Markdown 语法编写
- 预览区：实时渲染，578px 宽度（与微信公众号编辑器等宽）
- 发布区：提供一键复制和相关工具链接

**2. 微信公众号完美适配**
- 预览区严格按照微信公众号标准，预览区与微信公众号编辑器等宽（578px）
- 支持的样式完全兼容微信公众号平台
- 一键复制后可直接粘贴到公众号编辑器
- 针对性设计了二级标题，建议使用二级标题和三级标题

**3. 丰富的功能支持**
- ✅ 基础 Markdown 语法（标题、段落、列表、表格等）
- ✅ 代码语法高亮（Kimbie Light 主题，Mac 风格）
- ✅ 自定义信息卡片（\`:::info\` 语法）
- ✅ 横屏滑动幻灯片（\`<![alt](url),![alt](url)>\` 语法）
- ✅ 同步滚动（编辑器与预览区联动）
- ❌ 数学公式（不支持，请使用工具栏链接手工渲染）
- ❌ Mermaid 图表（不支持，使用工具栏链接手工渲染）


## 快速开始

1. 访问在线版 [paper.thus.chat](https://paper.thus.chat)
2. 下载 \`html\` 单文件到本地直接运行
3. 下载 \`html\` 单文件部署到自己的服务器使用
4. 下载 \`html\` 单文件用 \`AI\` 修改成自己喜欢的样式后食用 


## 常见样式

> **引用样式**：Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外)，支持信息卡片。预览区与微信公众号编辑器等宽，所见即所得。欢迎使用👏！

:::orange
**浅橙色卡片：** Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。
:::

:::blue
**浅蓝色卡片：**Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。 

支持换行，支持图片。
:::

:::info 信息卡片
这是一个信息卡片，支持 **粗体** 和 *斜体* 文本，可以包含多个段落和图片。  
![picture](https://pic4.zhimg.com/v2-651d25a2a36f7ee0406f2a310b245def_r.jpg)
:::


\`\`\`python
# 这是一个 Python 代码块

def contains_number(s):
    return any(char.isdigit() for char in s)


test_string = "Hello123"
if contains_number(test_string):
    print("字符串包含数字")
else:
    print("字符串不包含数字")
\`\`\`

| 常用网址表格             | 功能                  | 推荐    |
| ------------------------------------------- | ---------------------- | ------------ |
| [Mermaid 渲染](https://mermaid-live.nodejs.cn/edit) | Mermaid图渲染 | 🌟🌟🌟  |
| [数学公式渲染](https://mathjax.thus.chat/)   \t| 数学公式渲染 | 🌟🌟🌟 |
| [Markdown语法速查](https://xiaolinbaba.notion.site/Markdown-bcf20a9190db4b208dc137f755788405) | Markdown 语法速查 | 🌟🌟🌟🌟 |

<![PIC01.png](https://picx.zhimg.com/v2-45dd5f524da0d125233d6af4fb2d4135_r.jpg),![PIC02.png](https://pic1.zhimg.com/v2-d591ac49a57ca87cb3c7b29d6e1a7622_r.jpg),![PIC03.png](https://picx.zhimg.com/v2-b712755e8f4e02226582bbfb6246dcd3_r.jpg)>`;

    // DOM 元素引用
    const mdInput = document.getElementById('markdown');
    const preview = document.getElementById('preview');
    const copyBtn = document.getElementById('copyBtn');
    const loadExampleBtn = document.getElementById('loadExampleBtn');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const saveStatus = document.getElementById('saveStatus');
    const editorDate = document.getElementById('editorDate');
    const zoomLevelEl = document.getElementById('zoomLevel');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const tbResetBtn = document.getElementById('tbReset');

    let myConfetti;
    let autoSaveTimer;
    let codeMirrorEditor;
    let isRendering = false; // 添加渲染状态标记

    // 初始化 CodeMirror 编辑器
    codeMirrorEditor = CodeMirror.fromTextArea(mdInput, {
      mode: 'markdown',
      theme: 'github',
      lineNumbers: false, // 关闭 CodeMirror 自带行号，改用自定义行号列
      lineWrapping: true,
      autofocus: true,
      viewportMargin: Infinity,
      placeholder: '在此输入 Markdown 内容...\n\n支持实时预览，编辑完成后可一键复制到微信公众号。',
      extraKeys: {
        'Ctrl-S': function (cm) {
          // 手动保存快捷键
          if (saveToLocalStorage('md_editor_draft', cm.getValue())) {
            saveToLocalStorage('md_editor_save_time', new Date().toLocaleString());
            saveStatus.textContent = '手动保存成功';
            setTimeout(() => {
              saveStatus.textContent = '已保存';
            }, 2000);
          } else {
            saveStatus.textContent = '保存失败';
          }
        },
        'Ctrl-Enter': function (cm) {
          // 复制快捷键
          copyBtn.click();
        },
        'Ctrl-B': function () { toolbarToggleBold(); },
        'Ctrl-I': function () { toolbarToggleItalic(); },
        'Enter': function (cm) {
          // 自动延续列表/任务列表
          const pos = cm.getCursor();
          const line = cm.getLine(pos.line);
          const matchTask = line.match(/^\s*- \[( |x|X)\]\s+/);
          const matchUl = line.match(/^\s*([-*+])\s+/);
          const matchOl = line.match(/^\s*(\d+)\.\s+/);
          if ((matchTask || matchUl || matchOl)) {
            const markerLen = (matchTask && matchTask[0].length) || (matchUl && matchUl[0].length) || (matchOl && matchOl[0].length) || 0;
            const content = line.slice(markerLen);
            if (content.trim().length === 0) {
              cm.replaceRange('\n', { line: pos.line, ch: line.length }, { line: pos.line, ch: line.length });
              cm.replaceRange('', { line: pos.line, ch: 0 }, { line: pos.line, ch: markerLen });
              return;
            }
            let prefix = '';
            if (matchTask) {
              prefix = matchTask[0].replace('[x]', '[ ]').replace('[X]', '[ ]');
            } else if (matchUl) {
              prefix = matchUl[0];
            } else if (matchOl) {
              const next = parseInt(matchOl[1], 10) + 1;
              prefix = line.replace(/^\s*\d+\.\s+/, `${next}. `).match(/^\s*\d+\.\s+/)[0];
            }
            cm.replaceSelection('\n' + prefix);
            return;
          }
          cm.replaceSelection('\n');
        }
      }
    });

    // 强制刷新 CodeMirror 尺寸
    setTimeout(() => {
      codeMirrorEditor.refresh();
    }, 100);

    // 窗口大小改变时刷新编辑器
    window.addEventListener('resize', () => {
      setTimeout(() => {
        codeMirrorEditor.refresh();
      }, 100);
    });

    // 重新定义获取编辑器内容的方法
    function getEditorValue() {
      return codeMirrorEditor.getValue();
    }

    function setEditorValue(value) {
      codeMirrorEditor.setValue(value);
    }

    // 初始化 confetti 实例
    if (window.confetti && typeof window.confetti.create === 'function') {
      myConfetti = window.confetti.create(confettiCanvas, { resize: true, useWorker: true });
    } else if (window.confetti) {
      myConfetti = window.confetti;
    }


    // 更新日期显示
    function updateDate() {
      const now = new Date();
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekday = weekdays[now.getDay()];

      // 统一公历显示，避免简化农历误差
      const solarString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${weekday}`;
      if (editorDate) editorDate.textContent = solarString;
      // 预览标题已替换为缩放工具，不再显示日期
    }

    // 初始化日期显示
    updateDate();

    // 每分钟更新一次日期（以防跨日）
    setInterval(updateDate, 60000);

    // 统计文本信息
    function updateStats() {
      const text = getEditorValue();
      const characters = text.length;

      // 改进的字数统计逻辑
      let words = 0;
      if (text.trim()) {
        // 统计中文字符数（包括中文标点）
        const chineseChars = (text.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g) || []).length;

        // 统计英文单词数（移除中文字符后按空白分割）
        const englishText = text.replace(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, '');
        const englishWords = englishText.trim() ? englishText.trim().split(/\s+/).filter(word => word.length > 0).length : 0;

        // 总字数 = 中文字符数 + 英文单词数
        words = chineseChars + englishWords;
      }

      wordCount.textContent = `字数: ${words}`;
      charCount.textContent = `字符: ${characters}`;
    }

    // 处理引用链接
    function processReferences(html) {
      const references = [];
      let refIndex = 1;

      // 在链接后面添加引用标记，保留原链接
      html = html.replace(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
        references.push({ url, text });
        return `${match}<span class="reference-link">[${refIndex++}]</span>`;
      });

      // 如果有引用，添加引用列表
      if (references.length > 0) {
        let referencesHtml = '<div class="references"><h4>引用链接</h4><ol>';
        references.forEach((ref, index) => {
          referencesHtml += `<li>${ref.text}: ${ref.url}</li>`;
        });
        referencesHtml += '</ol></div>';
        html += referencesHtml;
      }

      return html;
    }

    // 处理信息卡片
    function processInfoCards(markdownText) {
      // 先保护代码块内容
      const codeBlocks = [];
      let codeBlockIndex = 0;

      // 匹配代码块（包括行内代码和多行代码块）
      markdownText = markdownText.replace(/```[\s\S]*?```|`[^`]+`/g, (match) => {
        const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
        codeBlocks[codeBlockIndex] = match;
        codeBlockIndex++;
        return placeholder;
      });

      // 处理 :::info 标记的信息卡片
      markdownText = markdownText.replace(/:::info\s+(.*?)\n([\s\S]*?):::/g, (match, title, content) => {
        // 将内容转换为HTML格式的占位符，稍后会被替换
        return `<div class="info-card-placeholder" data-title="${title}" data-content="${encodeURIComponent(content.trim())}"></div>`;
      });

      // 处理 :::orange 标记的浅橙色卡片（无标题）
      markdownText = markdownText.replace(/:::orange\n([\s\S]*?):::/g, (match, content) => {
        return `<div class="orange-card-placeholder" data-content="${encodeURIComponent(content.trim())}"></div>`;
      });

      // 处理 :::blue 标记的浅蓝色卡片（无标题）
      markdownText = markdownText.replace(/:::blue\n([\s\S]*?):::/g, (match, content) => {
        return `<div class="blue-card-placeholder" data-content="${encodeURIComponent(content.trim())}"></div>`;
      });

      // 恢复代码块内容
      codeBlocks.forEach((codeBlock, index) => {
        markdownText = markdownText.replace(`__CODE_BLOCK_${index}__`, codeBlock);
      });

      return markdownText;
    }

    // 处理信息卡片占位符
    function processInfoCardPlaceholders(html) {
      // 处理 info 卡片
      html = html.replace(/<div class="info-card-placeholder" data-title="([^"]*)" data-content="([^"]*)"><\/div>/g, (match, title, encodedContent) => {
        const content = decodeURIComponent(encodedContent);
        let processedContent = converter.makeHtml(content);

        // 清理内部的段落标签，使用简单的换行
        processedContent = processedContent.replace(/<p>/g, '').replace(/<\/p>/g, '<br><br>');
        processedContent = processedContent.replace(/<br><br>$/, ''); // 移除末尾的换行

        // 为信息卡片内的图片添加样式限制（缩小上下间距）
        processedContent = processedContent.replace(/<img([^>]*)>/g, '<img$1 style="max-width: 100%; height: auto; display: block; margin: 6px 0;">');
        // 去除图片前后由 <p> 替换产生的多余 <br>
        processedContent = processedContent
          .replace(/(?:<br\s*\/?>\s*)+(<img[^>]*>)/g, '$1')
          .replace(/(<img[^>]*>)(?:\s*<br\s*\/?>)+/g, '$1');

        // 使用表格来创建带背景色的卡片效果（微信公众号完全支持）
        return `<table style="width: 100%; margin: 12px 0; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="background-color: #D0F9D0; border: none; padding: 8px 16px 12px 16px; border-radius: 8px;">
              <p style="margin: 0 0 6px 0; color: #d32f2f; font-weight: bold; font-size: 16px;">
                💡 ${title}
              </p>
              <p style="margin: 0; color: #333; line-height: 1.6;">
                ${processedContent}
              </p>
            </td>
          </tr>
        </table>`;
      });

      // 处理 orange 卡片（无标题）
      html = html.replace(/<div class="orange-card-placeholder" data-content="([^"]*)"><\/div>/g, (match, encodedContent) => {
        const content = decodeURIComponent(encodedContent);
        let processedContent = converter.makeHtml(content);

        // 清理内部的段落标签，使用简单的换行
        processedContent = processedContent.replace(/<p>/g, '').replace(/<\/p>/g, '<br><br>');
        processedContent = processedContent.replace(/<br><br>$/, ''); // 移除末尾的换行

        // 使用表格来创建浅橙色卡片效果（微信公众号完全支持）
        return `<table style="width: 100%; margin: 12px 0; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="background-color: #FFF3E0; border: none; padding: 12px 16px; border-radius: 8px;">
              <p style="margin: 0; color: #333; line-height: 1.8;">
                ${processedContent
            .replace(/<img([^>]*)>/g, '<img$1 style="max-width: 100%; height: auto; display: block; margin: 6px 0;">')
            .replace(/(?:<br\s*\/?>\s*)+(<img[^>]*>)/g, '$1')
            .replace(/(<img[^>]*>)(?:\s*<br\s*\/?>)+/g, '$1')}
              </p>
            </td>
          </tr>
        </table>`;
      });

      // 处理 blue 卡片（无标题）
      html = html.replace(/<div class="blue-card-placeholder" data-content="([^"]*)"><\/div>/g, (match, encodedContent) => {
        const content = decodeURIComponent(encodedContent);
        let processedContent = converter.makeHtml(content);

        // 清理内部的段落标签，使用简单的换行
        processedContent = processedContent.replace(/<p>/g, '').replace(/<\/p>/g, '<br><br>');
        processedContent = processedContent.replace(/<br><br>$/, ''); // 移除末尾的换行

        // 使用表格来创建浅蓝色卡片效果（微信公众号完全支持）
        return `<table style="width: 100%; margin: 12px 0; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="background-color: #E3F2FD; border: none; padding: 12px 16px; border-radius: 8px;">
              <p style="margin: 0; color: #333; line-height: 1.8;">
                ${processedContent
            .replace(/<img([^>]*)>/g, '<img$1 style="max-width: 100%; height: auto; display: block; margin: 6px 0;">')
            .replace(/(?:<br\s*\/?>\s*)+(<img[^>]*>)/g, '$1')
            .replace(/(<img[^>]*>)(?:\s*<br\s*\/?>)+/g, '$1')}
              </p>
            </td>
          </tr>
        </table>`;
      });

      return html;
    }

    // 处理横屏滑动幻灯片
    function processSlideshow(markdownText) {
      // 先保护代码块内容
      const codeBlocks = [];
      let codeBlockIndex = 0;

      // 匹配代码块（包括行内代码和多行代码块）
      markdownText = markdownText.replace(/```[\s\S]*?```|`[^`]+`/g, (match) => {
        const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
        codeBlocks[codeBlockIndex] = match;
        codeBlockIndex++;
        return placeholder;
      });

      // 匹配 <![alt](url),![alt](url)> 语法，但不匹配行内代码中的内容
      // 要求前面是行首、空白字符或换行符，后面是空白字符、换行符或行尾
      const slideshowRegex = /(^|\s|>\s*)\n?<!\[([^\]]*)\]\(([^)]+)\)(?:,\s*!\[([^\]]*)\]\(([^)]+)\))+>(?=\s|$|\n)/gm;

      markdownText = markdownText.replace(slideshowRegex, (match, prefix, ...groups) => {
        // 提取所有图片
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        const images = [];
        let imageMatch;

        while ((imageMatch = imageRegex.exec(match)) !== null) {
          images.push({
            alt: imageMatch[1] || '',
            url: imageMatch[2]
          });
        }

        if (images.length === 0) return match;

        // 生成唯一ID
        const slideshowId = 'slideshow-' + Math.random().toString(36).substr(2, 9);

        // 创建滑动幻灯片HTML（基于微信公众号有效实现）
        let slideshowHTML = '<section style="box-sizing: border-box; font-size: 16px; margin: 20px 0;">';
        slideshowHTML += '<section style="font-family: 微软雅黑; font-size: 16px;">';
        slideshowHTML += '<section style="margin: 0px auto; box-sizing: border-box; width: 100%;">';
        slideshowHTML += '<section style="margin: 0px auto; text-align: center;">';
        slideshowHTML += '<section style="display: inline-block; width: 100%;">';

        // 核心滚动容器
        slideshowHTML += '<section style="overflow-x: scroll; overflow-y: hidden; -webkit-overflow-scrolling: touch; white-space: nowrap; width: 100%; text-align: center;">';

        images.forEach((img, index) => {
          slideshowHTML += '<section style="display: inline-block; width: 90%; margin-right: 10px; vertical-align: top;">';
          slideshowHTML += `<img style="display: block; width: 100%; height: auto; margin: 0.1em auto 0.2em; border: 1px solid rgba(0, 0, 0, 0.04); vertical-align: top;" title="${img.alt || 'picture'}" alt="${img.alt || 'picture'}" src="${img.url}">`;
          slideshowHTML += `<p style="margin: 0; font-size: 12px; color: #333; text-align: center; white-space: normal; line-height: 1.2;">${img.alt || 'picture'}</p>`;
          slideshowHTML += '</section>';
        });

        slideshowHTML += '</section>';
        slideshowHTML += '</section>';
        slideshowHTML += '</section>';
        slideshowHTML += '</section>';
        slideshowHTML += '</section>';
        slideshowHTML += '<section style="text-align: center; margin: 4px 0 0 0; padding: 0;"><p style="font-size: 12px; color: #333; text-align: center; margin: 0; padding: 0; line-height: 1.5;">&lt;&lt;&lt; 左右滑动看更多 &gt;&gt;&gt;</p></section>';
        slideshowHTML += '</section>';

        return prefix + slideshowHTML;
      });

      // 恢复代码块内容
      codeBlocks.forEach((codeBlock, index) => {
        markdownText = markdownText.replace(`__CODE_BLOCK_${index}__`, codeBlock);
      });

      return markdownText;
    }

    // 渲染 Markdown
    function render() {
      isRendering = true; // 开始渲染
      console.log('Starting render...');
      let markdownText = getEditorValue();
      console.log('Original markdown length:', markdownText.length);

      // 保存当前滚动位置
      const previewContent = document.querySelector('.preview-content');
      const currentScrollTop = previewContent.scrollTop;

      // 处理横屏滑动幻灯片（在Markdown转换前）
      markdownText = processSlideshow(markdownText);

      // 先处理信息卡片（在Markdown转换前）
      markdownText = processInfoCards(markdownText);

      console.log('Converting markdown to HTML...');
      let html = converter.makeHtml(markdownText);
      console.log('HTML conversion complete, length:', html.length);

      // 处理信息卡片占位符
      html = processInfoCardPlaceholders(html);

      // 处理引用链接
      html = processReferences(html);

      console.log('Setting preview innerHTML...');
      // 安全清洗
      if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
        html = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
      }
      preview.innerHTML = html;

      // 恢复滚动位置
      previewContent.scrollTop = currentScrollTop;

      // 应用代码高亮 - 使用更短的延迟并优化处理
      setTimeout(() => {
        console.log('Applying syntax highlighting...');
        if (window.hljs) {
          const codeBlocks = preview.querySelectorAll('pre code');
          console.log('Found code blocks:', codeBlocks.length);
          codeBlocks.forEach((block, index) => {
            // 检查是否已经高亮过
            if (block.hasAttribute('data-highlighted')) {
              return;
            }

            // 尝试检测语言
            const text = block.textContent;
            if (text.includes('def ') || text.includes('import ') || text.includes('print(')) {
              block.className = 'language-python';
            }

            console.log(`Highlighting block ${index}:`, block.className);
            // 应用新的高亮
            try {
              hljs.highlightElement(block);
              console.log(`Block ${index} highlighted successfully`);
            } catch (e) {
              console.error(`Error highlighting block ${index}:`, e);
            }
          });

          // 添加Mac样式的SVG圆点
          const preBlocks = preview.querySelectorAll('pre');
          preBlocks.forEach((pre, index) => {
            // 检查是否已经添加了Mac样式
            if (!pre.querySelector('.mac-sign')) {
              // 创建Mac样式的SVG元素
              const macSign = document.createElement('span');
              macSign.className = 'mac-sign';
              macSign.style.cssText = 'display: flex; padding: 12px 12px 0;';
              macSign.innerHTML = `<svg viewBox="0 0 450 130" height="13px" width="45px" y="0px" x="0px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <ellipse fill="rgb(237,108,96)" stroke-width="2" stroke="rgb(220,60,54)" ry="52" rx="50" cy="65" cx="50"></ellipse>
                <ellipse fill="rgb(247,193,81)" stroke-width="2" stroke="rgb(218,151,33)" ry="52" rx="50" cy="65" cx="225"></ellipse>
                <ellipse fill="rgb(100,200,86)" stroke-width="2" stroke="rgb(27,161,37)" ry="52" rx="50" cy="65" cx="400"></ellipse>
              </svg>`;

              // 将SVG插入到pre元素的开头
              pre.insertBefore(macSign, pre.firstChild);
              console.log(`Added Mac style to code block ${index}`);
            }
          });
        } else {
          console.error('hljs not available during render');
        }

        // 再次恢复滚动位置（防止代码高亮后位置改变）
        previewContent.scrollTop = currentScrollTop;

        // 渲染完成
        isRendering = false;
      }, 10);

      updateStats();
      scheduleAutoSave();
    }

    // 配置常量
    const CONFIG = {
      RENDER_DEBOUNCE_MS: 500,
      RENDER_DELAY_MS: 10,
      AUTO_SAVE_DELAY_MS: 1000,
      PREVIEW_WIDTH: 578,
      ZOOM_MAX: 1.5,
      ZOOM_MIN: 0.5,
      ZOOM_STEP: 0.25
    };

    // localStorage 错误处理工具函数
    function saveToLocalStorage(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.error('保存失败:', e);
        if (e.name === 'QuotaExceededError') {
          alert('存储空间已满,请清理浏览器缓存');
        }
        return false;
      }
    }

    function loadFromLocalStorage(key, defaultValue = null) {
      try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
      } catch (e) {
        console.error('读取失败:', e);
        return defaultValue;
      }
    }

    function removeFromLocalStorage(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('删除失败:', e);
        return false;
      }
    }


    // 事件监听器
    let typingTimer;

    // 优化后的渲染策略
    codeMirrorEditor.on('change', () => {
      // 清除之前的定时器
      clearTimeout(typingTimer);

      // 立即进行快速渲染(不包括代码高亮)
      quickRender();

      // 设置定时器,如果指定时间内没有新的输入,则进行完整渲染
      typingTimer = setTimeout(() => {
        render(); // 完整渲染,包括代码高亮
      }, CONFIG.RENDER_DEBOUNCE_MS);
    });

    // 快速渲染函数（仅更新文本内容，不处理代码高亮）
    function quickRender() {
      isRendering = true; // 开始渲染
      let markdownText = getEditorValue();

      // 保存当前滚动位置
      const previewContent = document.querySelector('.preview-content');
      const currentScrollTop = previewContent.scrollTop;

      // 处理横屏滑动幻灯片（在Markdown转换前）
      markdownText = processSlideshow(markdownText);

      // 先处理信息卡片（在Markdown转换前）
      markdownText = processInfoCards(markdownText);

      let html = converter.makeHtml(markdownText);

      // 处理信息卡片占位符
      html = processInfoCardPlaceholders(html);

      // 处理引用链接
      html = processReferences(html);

      // 安全清洗
      if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
        html = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
      }
      preview.innerHTML = html;

      // 恢复滚动位置
      previewContent.scrollTop = currentScrollTop;

      updateStats();

      // 快速渲染完成
      isRendering = false;
    }

    // ==== 复刻 Madopic 行号逻辑：使用自定义左侧行号列与 textarea 同步 ====
    const lineNumbersEl = document.querySelector('.line-numbers');
    const textareaEl = document.getElementById('markdown');
    function updateLineNumbers() {
      if (!lineNumbersEl) return;
      const value = codeMirrorEditor.getValue() || '';
      const lines = value.split('\n').length;
      let content = '';
      for (let i = 1; i <= lines; i++) {
        content += i + '\n';
      }
      // 移除最后一个换行符
      content = content.slice(0, -1);
      lineNumbersEl.textContent = content || '1';
      try {
        const scrollInfo = codeMirrorEditor.getScrollInfo();
        lineNumbersEl.style.height = scrollInfo.height + 'px';
        lineNumbersEl.scrollTop = scrollInfo.top;
      } catch (e) { }
    }
    function syncLineNumbersScroll() {
      if (!lineNumbersEl) return;
      try {
        const info = codeMirrorEditor.getScrollInfo();
        lineNumbersEl.scrollTop = info.top;
      } catch (e) { }
    }
    // 绑定编辑器变化与滚动
    codeMirrorEditor.on('change', updateLineNumbers);
    codeMirrorEditor.on('scroll', syncLineNumbersScroll);
    // 初始行号
    setTimeout(updateLineNumbers, 0);

    // 自动保存功能
    function scheduleAutoSave() {
      saveStatus.textContent = '保存中...';

      clearTimeout(autoSaveTimer);
      autoSaveTimer = setTimeout(() => {
        if (saveToLocalStorage('md_editor_draft', getEditorValue())) {
          saveToLocalStorage('md_editor_save_time', new Date().toLocaleString());
          saveStatus.textContent = '已保存';
        } else {
          saveStatus.textContent = '保存失败';
        }
      }, CONFIG.AUTO_SAVE_DELAY_MS);
    }

    // 递归为元素及其子元素注入行内样式
    function inlineStyles(el) {
      // 如果是信息卡片的表格，保持原有样式不变
      if (el.tagName === 'TABLE' && (
        el.querySelector('td[style*="background-color: #D0F9D0"]') ||
        el.querySelector('td[style*="background-color: #FFF3E0"]') ||
        el.querySelector('td[style*="background-color: #E3F2FD"]')
      )) {
        // 对于信息卡片表格，只处理子元素
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 如果是信息卡片内的td，保持原有样式
      if (el.tagName === 'TD' && el.getAttribute('style') && (
        el.getAttribute('style').includes('background-color: #D0F9D0') ||
        el.getAttribute('style').includes('background-color: #FFF3E0') ||
        el.getAttribute('style').includes('background-color: #E3F2FD')
      )) {
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理滑动幻灯片section元素 - 保持原有行内样式
      if (el.tagName === 'SECTION' && el.getAttribute('style')) {
        // 对于已经有行内样式的section元素，保持不变，但处理子元素
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理包含提示文字的section容器
      if (el.tagName === 'SECTION' && el.querySelector('p') && el.textContent && el.textContent.includes('左右滑动看更多')) {
        // 保持提示文字容器的原有样式不变
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理滑动幻灯片中的段落元素
      if (el.tagName === 'P' && el.closest('section[style*="overflow-x: scroll"]')) {
        // 保持滑动幻灯片中段落的原有样式不变
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理滑动幻灯片的提示文字
      if (el.tagName === 'P' && el.textContent && el.textContent.includes('左右滑动看更多')) {
        // 保持提示文字的原有样式不变
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理Mac样式的SVG元素
      if (el.classList && el.classList.contains('mac-sign')) {
        // 保持Mac样式不变，但处理子元素
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理SVG元素
      if (el.tagName === 'SVG' || el.tagName === 'ELLIPSE') {
        // SVG元素保持原有属性不变
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      // 特殊处理图片元素
      if (el.tagName === 'IMG') {
        // 检查是否在滑动幻灯片中
        const isInSlideshow = el.closest('section[style*="overflow-x: scroll"]');
        // 检查是否在列表中
        const isInList = el.closest('ul') || el.closest('ol') || el.closest('li');
        // 检查是否在信息卡片（表格单元格背景色）中
        const infoCardTd = el.closest('td[style*="background-color: #D0F9D0"], td[style*="background-color: #FFF3E0"], td[style*="background-color: #E3F2FD"]');

        if (isInSlideshow) {
          el.setAttribute('style', 'display: block; width: 100%; height: auto; margin: 0.1em auto 0.2em; border: 1px solid rgba(0, 0, 0, 0.04);');
        } else if (infoCardTd) {
          // 卡片内图片统一更小的上下间距
          el.setAttribute('style', 'max-width: 100%; height: auto; display: block; margin: 6px 0;');
        } else if (isInList) {
          // 列表中的图片使用参考代码的样式
          el.setAttribute('style', 'display: block; max-width: 100%; margin: 0.1em auto 0.5em; border: 1px solid rgba(0, 0, 0, 0.04);');
        } else {
          el.setAttribute('style', 'max-width: 100%; height: auto; display: block; margin: 16px auto;');
        }
        return;
      }
      // 对常见内联元素不注入任何样式，避免公众号断行/换行问题
      const INLINE_NO_STYLE = new Set(['STRONG', 'B', 'EM', 'I', 'CODE', 'SMALL', 'SUP', 'SUB', 'SPAN']);
      if (INLINE_NO_STYLE.has(el.tagName)) {
        Array.from(el.children).forEach(child => inlineStyles(child));
        return;
      }

      const cs = window.getComputedStyle(el);
      let styleStr = '';
      // 为内联元素及列表项目避免设置会影响换行的属性（如 width/display/position/white-space）
      const INLINE_TAGS = new Set(['STRONG', 'B', 'EM', 'I', 'SPAN', 'A', 'CODE', 'SMALL', 'SUP', 'SUB']);
      // 默认不拷贝 background，避免在公众号出现浅色底；仅对特定标签保留
      let props = ['font-family', 'font-size', 'color', 'text-align', 'border', 'border-left', 'border-bottom', 'line-height', 'margin', 'padding', 'border-radius', 'box-shadow', 'text-shadow', 'width', 'display', 'position', 'white-space', 'word-wrap', 'word-break', 'overflow-x'];
      // 仅对信息卡片的 TD、引用样式和代码样式保留背景（h2 不再保留）
      if ((el.tagName === 'TD' && el.getAttribute('style') && (
        el.getAttribute('style').includes('background-color: #D0F9D0') ||
        el.getAttribute('style').includes('background-color: #FFF3E0') ||
        el.getAttribute('style').includes('background-color: #E3F2FD')
      )) ||
        el.tagName === 'BLOCKQUOTE' ||
        el.tagName === 'PRE' ||
        el.tagName === 'CODE') {
        props.push('background');
      }
      if (INLINE_TAGS.has(el.tagName) || el.tagName === 'LI' || el.tagName === 'P') {
        props = props.filter(p => !['width', 'display', 'position', 'white-space'].includes(p));
      }
      props.forEach(prop => {
        const val = cs.getPropertyValue(prop);
        if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent' && val !== 'none') {
          // 过滤掉编辑器界面的浅灰背景色 #f8fafc (248,250,252)
          if (prop === 'background' || prop === 'background-color') {
            if (val.includes('248, 250, 252') || val.includes('#f8fafc') ||
              val.includes('rgb(248, 250, 252)') || val.includes('rgba(248, 250, 252')) {
              return; // 跳过这个背景色
            }
          }
          styleStr += `${prop}:${val};`;
        }
      });

      // 特殊处理代码块的Mac样式
      if (el.tagName === 'PRE') {
        styleStr += 'position:relative;';
      }

      el.setAttribute('style', styleStr);
      Array.from(el.children).forEach(child => inlineStyles(child));
    }

    // 初始渲染
    render();

    // 页面加载时自动加载草稿
    const savedDraft = loadFromLocalStorage('md_editor_draft');
    if (savedDraft && savedDraft.trim()) {
      setEditorValue(savedDraft);
      render();
      const saveTime = loadFromLocalStorage('md_editor_save_time');
      if (saveTime) {
        saveStatus.textContent = `已加载草稿`;
      }
    } else {
      // 如果没有草稿，加载默认测试内容
      const defaultContent = DEFAULT_MD_CONTENT || `## Paper 编辑器简介

> **Paper** 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。预览区与微信公众号编辑器等宽，所见即所得。欢迎使用👏！ **定制属于每个人自己的微信公众号样式！**

![](https://pic2.zhimg.com/v2-8b3e679e2d23b3516650c9e451fde283_r.jpg)


### 🎯 核心特性

**1. 现代化三栏布局**
- **编辑区**：支持 Markdown 语法编写
- **预览区**：实时渲染，578px 宽度（与微信公众号编辑器等宽）
- **发布区**：提供一键复制和相关工具链接

**2. 微信公众号完美适配**
- 预览区严格按照微信公众号标准，预览区与微信公众号编辑器等宽（578px）
- 支持的样式完全兼容微信公众号平台
- 一键复制后可直接粘贴到公众号编辑器

**3. 丰富的功能支持**
- ✅ 基础 Markdown 语法（标题、段落、列表、表格等）
- ✅ 代码语法高亮（Kimbie Light 主题，Mac 风格）
- ✅ 自定义信息卡片（\`:::info\` 语法）
- ✅ 横屏滑动幻灯片（\`<![alt](url),![alt](url)>\` 语法）
- ✅ 同步滚动（编辑器与预览区联动）
- ❌ 数学公式（不支持，请使用工具栏链接手工渲染）
- ❌ Mermaid 图表（不支持，请使用工具栏链接手工渲染）


## 快速开始

1. 访问在线版 [paper.thus.chat](https://paper.thus.chat)
2. 下载 \`html\` 单文件到本地直接运行
3. 下载 \`html\` 单文件部署到自己的服务器使用
4. 下载 \`html\` 单文件用 \`AI\` 修改成自己喜欢的样式后食用 


## 常见样式

> **引用样式**：Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外)，支持信息卡片。预览区与微信公众号编辑器等宽，所见即所得。欢迎使用👏！

:::orange
**浅橙色卡片：** Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。
:::

:::blue
**浅蓝色卡片：**Paper 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。 

支持换行，支持图片。
:::

:::info 信息卡片
这是一个信息卡片，支持 **粗体** 和 *斜体* 文本，可以包含多个段落和图片。  
![picture](https://pic.thus.chat/rest/gdIbj5K.png)
:::


\`\`\`python
# 这是一个 Python 代码块

def contains_number(s):
    return any(char.isdigit() for char in s)


test_string = "Hello123"
if contains_number(test_string):
    print("字符串包含数字")
else:
    print("字符串不包含数字")
\`\`\`

| 常用网址表格             | 功能                  | 推荐    |
| ------------------------------------------- | ---------------------- | ------------ |
| [Mermaid 渲染](https://mermaid-live.nodejs.cn/edit) | Mermaid图渲染 | 🌟🌟🌟  |
| [数学公式渲染](https://mathjax.thus.chat/)   	| 数学公式渲染 | 🌟🌟🌟 |
| [Markdown语法速查](https://xiaolinbaba.notion.site/Markdown-bcf20a9190db4b208dc137f755788405) | Markdown 语法速查 | 🌟🌟🌟🌟 |

<![PIC01.png](https://pic.thus.chat/rest/0QryNTK.png),![PIC02.png](https://pic.thus.chat/rest/TypyNTK.png),![PIC03.png](https://pic.thus.chat/rest/6yRyNTK.png)>`;
      setEditorValue(defaultContent);
      render();
    }

    // 复制按钮
    copyBtn.addEventListener('click', () => {
      const clone = preview.cloneNode(true);

      // 处理代码块中的空格和缩进，同时保持语法高亮
      const codeElements = clone.querySelectorAll('pre code');
      codeElements.forEach(code => {
        // 递归处理所有文本节点，保持HTML结构和高亮样式
        function processTextNodes(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            // 处理文本节点中的空格和制表符
            const text = node.textContent;
            if (text.includes(' ') || text.includes('\t')) {
              const formattedText = text
                .replace(/ /g, '\u00A0') // 所有空格转换为不间断空格字符
                .replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0'); // 制表符转换为四个不间断空格字符
              node.textContent = formattedText;
            }
          } else {
            // 递归处理子节点
            Array.from(node.childNodes).forEach(child => {
              processTextNodes(child);
            });
          }
        }

        processTextNodes(code);
      });

      inlineStyles(clone);

      // 彻底清理所有不需要的背景色
      function cleanBackgrounds(element) {
        const allElements = [element, ...element.querySelectorAll('*')];
        allElements.forEach(el => {
          if (!el.tagName) return;

          // 保留信息卡片表格、引用样式和代码样式的背景（h2 不再保留）
          const isInfoCardTd = el.tagName === 'TD' && el.getAttribute('style') && (
            el.getAttribute('style').includes('background-color: #D0F9D0') ||
            el.getAttribute('style').includes('background-color: #FFF3E0') ||
            el.getAttribute('style').includes('background-color: #E3F2FD')
          );
          const isBlockquote = el.tagName === 'BLOCKQUOTE';
          const isPre = el.tagName === 'PRE';
          const isCode = el.tagName === 'CODE';

          if (!isInfoCardTd && !isBlockquote && !isPre && !isCode) {
            // 强制设置背景为透明
            if (el.style) {
              el.style.setProperty('background', 'transparent', 'important');
              el.style.setProperty('background-color', 'transparent', 'important');
              el.style.removeProperty('background-image');
              el.style.removeProperty('background-attachment');
              el.style.removeProperty('background-clip');
              el.style.removeProperty('background-origin');
              el.style.removeProperty('background-position');
              el.style.removeProperty('background-repeat');
              el.style.removeProperty('background-size');
            }

            // 彻底清理style属性中的所有背景设置
            const styleAttr = el.getAttribute('style');
            if (styleAttr) {
              let cleanedStyle = styleAttr
                // 移除所有可能的背景色格式
                .replace(/background[^;]*;?/gi, '')
                .replace(/background-color[^;]*;?/gi, '')
                .replace(/background-image[^;]*;?/gi, '')
                // 清理连续的分号
                .replace(/;\s*;/g, ';')
                .replace(/^;|;$/g, '');

              // 重新添加透明背景
              if (cleanedStyle) {
                cleanedStyle += '; background-color: transparent !important;';
              } else {
                cleanedStyle = 'background-color: transparent !important;';
              }

              el.setAttribute('style', cleanedStyle);
            } else {
              // 如果没有style属性，直接添加透明背景
              el.setAttribute('style', 'background-color: transparent !important;');
            }
          }
        });

        // 特别处理信息卡片内的段落，确保边距与引用样式一致
        const cardParagraphs = clone.querySelectorAll('td[style*="background-color: #D0F9D0"] p, td[style*="background-color: #FFF3E0"] p, td[style*="background-color: #E3F2FD"] p');
        cardParagraphs.forEach(p => {
          if (p.style) {
            p.style.setProperty('margin', '0', 'important');
          }
          // 也处理style属性
          const styleAttr = p.getAttribute('style');
          if (styleAttr) {
            const cleanedStyle = styleAttr
              .replace(/margin[^;]*;?/gi, '')
              .replace(/;\s*;/g, ';')
              .replace(/^;|;$/g, '');
            p.setAttribute('style', cleanedStyle ? cleanedStyle + '; margin: 0 !important;' : 'margin: 0 !important;');
          } else {
            p.setAttribute('style', 'margin: 0 !important;');
          }
        });
      }

      cleanBackgrounds(clone);
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);

      const range = document.createRange();
      range.selectNodeContents(clone);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      let success = false;
      try {
        success = document.execCommand('copy');
      } catch (e) {
        success = false;
      }

      sel.removeAllRanges();
      document.body.removeChild(clone);

      if (success) {
        copyBtn.textContent = '已复制！';
        setTimeout(() => {
          copyBtn.textContent = '复制到公众号';
        }, 2000);
        if (myConfetti) {
          myConfetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.4 }
          });
        }
      } else {
        alert('复制失败，请手动复制。');
      }
    });

    // 同步滚动功能
    let isEditorScrolling = false;
    let isPreviewScrolling = false;
    const previewContent = document.querySelector('.preview-content');

    function syncScroll(source, target) {
      // 如果正在渲染，跳过同步滚动
      if (isRendering) return;
      if (source === 'editor' && isPreviewScrolling) return;
      if (source === 'preview' && isEditorScrolling) return;

      let sourceScrollTop, sourceScrollHeight;

      if (source === 'editor') {
        const scrollInfo = codeMirrorEditor.getScrollInfo();
        sourceScrollTop = scrollInfo.top;
        sourceScrollHeight = scrollInfo.height - scrollInfo.clientHeight;
      } else {
        sourceScrollTop = previewContent.scrollTop;
        sourceScrollHeight = previewContent.scrollHeight - previewContent.clientHeight;
      }

      const targetScrollHeight = target.scrollHeight - target.clientHeight;

      if (sourceScrollHeight > 0 && targetScrollHeight > 0) {
        const scrollRatio = sourceScrollTop / sourceScrollHeight;
        const targetScrollTop = scrollRatio * targetScrollHeight;
        target.scrollTop = targetScrollTop;
      }
    }

    // 编辑器滚动时同步预览区
    codeMirrorEditor.on('scroll', () => {
      if (isRendering) return; // 渲染时跳过滚动同步
      isEditorScrolling = true;
      syncScroll('editor', previewContent);
      setTimeout(() => {
        isEditorScrolling = false;
      }, 100);
    });

    // 预览区滚动时同步编辑器
    previewContent.addEventListener('scroll', () => {
      if (isRendering) return; // 渲染时跳过滚动同步
      isPreviewScrolling = true;
      const scrollInfo = previewContent.scrollTop;
      const scrollHeight = previewContent.scrollHeight - previewContent.clientHeight;
      const editorScrollInfo = codeMirrorEditor.getScrollInfo();
      const editorScrollHeight = editorScrollInfo.height - editorScrollInfo.clientHeight;

      if (scrollHeight > 0 && editorScrollHeight > 0) {
        const scrollRatio = scrollInfo / scrollHeight;
        const editorScrollTop = scrollRatio * editorScrollHeight;
        codeMirrorEditor.scrollTo(null, editorScrollTop);
      }

      setTimeout(() => {
        isPreviewScrolling = false;
      }, 100);
    });

    // 预览缩放（参考 Madopic）
    let zoom = 1;
    function applyZoom() {
      const inner = document.querySelector('.preview-inner');
      if (!inner) return;
      inner.style.transform = `scale(${zoom})`;
      if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(zoom * 100)}%`;
    }
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => { zoom = Math.min(1.5, zoom + 0.25); applyZoom(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.25); applyZoom(); });
    applyZoom();

    // 导出 HTML
    // 导出 HTML 功能已取消

    // 文档：仅保留新建与示例
    // 新建按钮已取消
    if (loadExampleBtn) loadExampleBtn.addEventListener('click', () => {
      const example = `## Paper 编辑器简介\n\n> **Paper** 是一款轻量级微信公众号 Markdown 编辑器。现代化三栏布局，实时 Markdown 预览，响应式设计；支持大部分 Markdown 语法 (数学公式和 Mermaid除外,请在发布区进行手工渲染)，支持信息卡片。预览区与微信公众号编辑器等宽，所见即所得。欢迎使用👏！ **定制属于每个人自己的微信公众号样式！**\n\n### 🎯 核心特性\n\n**1. 现代化三栏布局**\n- **编辑区**：支持 Markdown 语法编写\n- **预览区**：实时渲染，578px 宽度（与微信公众号编辑器等宽）\n- **发布区**：提供一键复制和相关工具链接\n\n**2. 微信公众号完美适配**\n- 预览区严格按照微信公众号标准，预览区与微信公众号编辑器等宽（578px）\n- 支持的样式完全兼容微信公众号平台\n- 一键复制后可直接粘贴到公众号编辑器\n\n**3. 丰富的功能支持**\n- ✅ 基础 Markdown 语法（标题、段落、列表、表格等）\n- ✅ 代码语法高亮（Kimbie Light 主题，Mac 风格）\n- ✅ 自定义信息卡片（\`:::info\` 语法）\n- ✅ 浅橙/浅蓝卡片（\`:::orange\`、\`:::blue\`）\n- ✅ 横屏滑动幻灯片（\`<![alt](url),![alt](url)>\` 语法）\n- ✅ 同步滚动（编辑器与预览区联动）\n- ❌ 数学公式（不支持，请用发布区链接手工渲染）\n- ❌ Mermaid 图表（不支持，请用发布区链接手工渲染）\n\n:::orange\n**浅橙色卡片：** 示例内容。\n:::\n\n:::blue\n**浅蓝色卡片：** 示例内容。\n:::\n\n:::info 信息卡片\n这是一个信息卡片，支持 **粗体** 和 *斜体*。\n:::\n\n\n\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |\n\n<![示例1](https://pic.thus.chat/rest/0QryNTK.png),![示例2](https://pic.thus.chat/rest/TypyNTK.png)>`;
      setEditorValue(example);
      render();
    });

    // 工具栏交互
    function toolbarToggleBold() {
      const cm = codeMirrorEditor; const sel = cm.getSelection();
      const wrapped = sel ? `**${sel}**` : '**粗体**';
      cm.replaceSelection(wrapped, 'around');
      cm.focus();
    }
    function toolbarToggleItalic() {
      const cm = codeMirrorEditor; const sel = cm.getSelection();
      const wrapped = sel ? `*${sel}*` : '*斜体*';
      cm.replaceSelection(wrapped, 'around'); cm.focus();
    }
    function toolbarHeading(level) {
      const cm = codeMirrorEditor; const pos = cm.getCursor();
      const line = cm.getLine(pos.line);
      const prefix = '#'.repeat(level) + ' ';
      const newLine = line.replace(/^\s*#{1,6}\s*/, '');
      cm.replaceRange(prefix + newLine, { line: pos.line, ch: 0 }, { line: pos.line, ch: line.length });
      cm.focus();
    }
    function toolbarLink() {
      const cm = codeMirrorEditor; const sel = cm.getSelection() || '链接文本';
      const url = prompt('输入链接地址：', 'https://');
      if (!url) return; cm.replaceSelection(`[${sel}](${url})`); cm.focus();
    }
    function toolbarImage() {
      const alt = prompt('图片说明（可选）：', '');
      const url = prompt('图片地址：', 'https://');
      if (!url) return; codeMirrorEditor.replaceSelection(`![${alt || ''}](${url})`); codeMirrorEditor.focus();
    }
    function toolbarList(type) {
      const cm = codeMirrorEditor; const pos = cm.getCursor();
      const line = cm.getLine(pos.line);
      let marker = '- ';
      if (type === 'ol') {
        marker = '1. ';
      } else if (type === 'task') {
        marker = '- [ ] ';
      }
      if (/^\s*([-*+]|\d+\.|- \[ \])\s+/.test(line)) {
        cm.replaceRange(marker + line.replace(/^\s*([-*+]|\d+\.|- \[ \])\s+/, ''), { line: pos.line, ch: 0 }, { line: pos.line, ch: line.length });
      } else {
        cm.replaceRange(marker + line, { line: pos.line, ch: 0 }, { line: pos.line, ch: line.length });
      }
      cm.focus();
    }
    function toolbarTable() {
      const tpl = `| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |`;
      codeMirrorEditor.replaceSelection('\n' + tpl + '\n');
      codeMirrorEditor.focus();
    }
    const bind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
    bind('tbBold', toolbarToggleBold);
    bind('tbItalic', toolbarToggleItalic);
    bind('tbH1', () => toolbarHeading(1));
    bind('tbH2', () => toolbarHeading(2));
    bind('tbH3', () => toolbarHeading(3));
    bind('tbLink', toolbarLink);
    bind('tbImage', toolbarImage);
    bind('tbUl', () => toolbarList('ul'));
    bind('tbOl', () => toolbarList('ol'));
    bind('tbTask', () => toolbarList('task'));
    bind('tbTable', toolbarTable);

    // 顶部一行的 Madopic 风格工具栏绑定到相同处理函数
    const safeBind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
    safeBind('toolBold', toolbarToggleBold);
    safeBind('toolItalic', toolbarToggleItalic);
    safeBind('toolHeading', () => toolbarHeading(2));
    safeBind('toolList', () => toolbarList('ul'));
    safeBind('toolLink', toolbarLink);
    safeBind('toolImage', toolbarImage);
    safeBind('toolEmpty', () => codeMirrorEditor.replaceSelection('\n\n'));
    safeBind('toolClear', () => { if (confirm('确认清空当前内容？')) { codeMirrorEditor.setValue(''); render(); } });

    // 字号与行高功能暂时取消（保留默认样式）

    // 恢复默认内容按钮
    function resetToDefault() {
      if (!confirm('确认恢复默认内容？草稿将被覆盖。')) return;
      setEditorValue(DEFAULT_MD_CONTENT);
      removeFromLocalStorage('md_editor_draft');
      removeFromLocalStorage('md_editor_save_time');
      render();
      saveStatus.textContent = '已恢复默认内容';
      setTimeout(() => { saveStatus.textContent = '已保存'; }, 2000);
    }
    if (tbResetBtn) tbResetBtn.addEventListener('click', resetToDefault);
  }
});
