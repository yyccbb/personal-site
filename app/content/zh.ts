import type { SiteContent } from './site'

export const chineseContent: SiteContent = {
  "profile": {
    "name": "俞辰博",
    "displayName": "辰博",
    "tags": [
      { "id": "research", "label": "科研见习生" },
      { "id": "photography", "label": "尼康佬" },
      { "id": "music", "label": "野生小提手" }
    ],
    "image": { "src": "/profile.jpg", "alt": "俞辰博的照片" },
    "role": "人工智能研究者 · 技术爱好者",
    "location": "研究，不限地点",
    "email": "yuchenbo0130@gmail.com",
    "introduction": "我探索语言模型、AI 对齐与智能体系统，也喜欢在业余时间用 AI 工具解决实际问题。",
    "biography": "我是一名人工智能研究者，关注语言模型、AI 对齐与智能体系统。我热衷于探索语言模型的数学基础与内部运作机制，以便更好地对齐它们，或设计外围控制框架，让它们更适合解决我关心的问题。",
    "workingStyle": "我喜欢这样的团队：充满活力，能让不同观点碰撞出热烈的讨论，也尊重每个人安静、专注地独立思考的需要。",
    "aside": "研究之外，我密切关注技术的新进展，也乐于亲手尝试新工具。我也探索其他学科，寻找能与自己的工作产生联系的想法和机会。",
    "personalInterests": "我自学小提琴，也热爱古典音乐。我还喜欢旅行，用摄影记录生活。对我来说，照片是记忆的忠实载体。我喜欢用光影构建画面，希望多年以后，它们依然值得细看，也能唤起当时鲜活的感受。",
    "connectionInvitation": "我很想认识有相似兴趣、也能带来不同视角的朋友。如果这里有让你共鸣的地方，欢迎来打个招呼。我很乐意听听你正在探索什么，也期待我们能从彼此身上学到些什么。"
  },
  "reading": [
    {
      "title": "深度学习",
      "creator": "Ian Goodfellow、Yoshua Bengio、Aaron Courville",
      "kind": "Book",
      "status": "Reading",
      "image": { "src": "/reading/deep-learning.jpg", "alt": "《深度学习》封面" },
      "note": "重新梳理基础，尤其是优化与表征学习。",
      "url": "https://www.deeplearningbook.org/"
    },
    {
      "title": "数据密集型应用系统设计",
      "creator": "Martin Kleppmann",
      "kind": "Book",
      "status": "Reading",
      "image": { "src": "/reading/designing-data-intensive-applications.jpg", "alt": "《数据密集型应用系统设计》封面" },
      "note": "结合研究基础设施和可复现实验，阅读第一版。",
      "url": "https://martin.kleppmann.com/2017/03/27/designing-data-intensive-applications.html"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani 等",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2024-06",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS 会议标志" },
      "note": "在梳理注意力模型的设计选择时，我经常重读这篇论文。",
      "url": "https://arxiv.org/abs/1706.03762"
    },
    {
      "title": "苦涩的教训",
      "creator": "Richard Sutton",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2026-05",
      "note": "帮助我思考：哪些部分值得手工构建，哪些应该交给系统去学习。",
      "url": "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    },
    {
      "title": "示例：小实验，有用的问题",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2026-09",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-small-experiments"
    },
    {
      "title": "示例：基准测试遗漏了什么",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2025-11",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-benchmark"
    },
    {
      "title": "示例：记录研究笔记",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2025-03",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-research-notebook"
    },
    {
      "title": "示例：放慢学习的脚步",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2024-01",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-slower-learning"
    },
    {
      "title": "示例：关于实用工具的笔记",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2023-10",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-useful-tools"
    },
    {
      "title": "示例：值得留存的问题",
      "creator": "示例条目",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2023-02",
      "isSample": true,
      "note": "用于体验时间线的临时阅读条目，完成日期为示例数据。",
      "url": "#sample-questions"
    }
  ]
}
