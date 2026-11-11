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
      "title": "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models",
      "creator": "Zhihong Shao 等",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2026-02",
      "image": { "src": "/reading/deepseek.svg", "alt": "DeepSeek 来源标志" },
      "note": "介绍如何通过精心筛选的数学数据提升语言模型的数学能力，并提出 GRPO：一种比较同一组答案、比 PPO 更节省内存的强化学习方法。",
      "url": "https://arxiv.org/abs/2402.03300"
    },
    {
      "title": "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model",
      "creator": "DeepSeek-AI",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2026-01",
      "image": { "src": "/reading/deepseek.svg", "alt": "DeepSeek 来源标志" },
      "note": "介绍 DeepSeek-V2 如何降低语言模型的训练和运行成本：每个词元只调用部分专家网络，并压缩注意力机制保存的数据，以减少内存占用。",
      "url": "https://arxiv.org/html/2405.04434v5"
    },
    {
      "title": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
      "creator": "Rafael Rafailov 等",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2025-10",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS 会议标志" },
      "note": "一种让语言模型学习人类偏好的简单方法。它直接从偏好与不偏好的答案对中学习，无需单独训练奖励模型，也无需运行强化学习循环。",
      "url": "https://arxiv.org/abs/2305.18290"
    },
    {
      "title": "Exit West: A Novel",
      "creator": "莫欣·哈米德",
      "kind": "Book",
      "status": "Finished",
      "finishedAt": "2025-06",
      "image": { "src": "/reading/exit-west.jpg", "alt": "莫欣·哈米德《Exit West: A Novel》封面" },
      "note": "娜迪亚和赛义德通过通往其他国家的神秘门，逃离战火中的城市。故事讲述迁徙、爱情，以及人们在寻找新家的过程中如何改变。",
      "url": "https://www.penguin.co.uk/books/300265/exit-west-by-hamid-mohsin/9780241979075"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani 等",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2025-02",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS 会议标志" },
      "note": "提出 Transformer，用注意力机制联系句子中的词。它能并行处理词语，而不必逐词处理，从而加快训练并提高翻译质量。",
      "url": "https://arxiv.org/abs/1706.03762"
    }
  ]
}
