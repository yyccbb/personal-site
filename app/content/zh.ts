import type { SiteContent } from './site'

export const chineseContent: SiteContent = {
  "profile": {
    "name": "Alex Chen",
    "role": "人工智能研究者 · 技术爱好者",
    "location": "研究，不限地点",
    "email": "hello@example.com",
    "introduction": "我研究智能系统，也构建让研究更容易理解、复现和应用的工具。",
    "biography": "我是一名人工智能研究者，关注模型评估、学习系统，以及支撑有效实验的工程实践。我喜欢从研究问题出发，认真实现，并用证据把两者联系起来。",
    "aside": "研究之外，我喜欢开源工具、新硬件、深入的技术文章，也乐于寻找让日常技术更好用的小方法。"
  },
  "posts": [
    {
      "slug": "what-a-good-evaluation-misses",
      "title": "好的评估，也可能遗漏什么",
      "date": "2026年9月18日",
      "category": "研究",
      "readingTime": "阅读约5分钟",
      "excerpt": "关于失败案例、实用基准，以及如何超越单一分数的一篇研究笔记。",
      "sections": [
        {
          "heading": "从问题开始",
          "paragraphs": [
            "在开展评估之前，我会先写下它要帮助我做出的决定。当我知道什么样的进展对眼前的任务有意义时，分数才更容易解释。",
            "对于一个小型原型，这往往意味着收集一些真实案例，并描述有用的回答应该是什么样子。我把这些描述当作工作假设，随着系统的变化不断重新审视。"
          ]
        },
        {
          "heading": "把失败留在身边",
          "paragraphs": [
            "实验报告里，我最喜欢的部分是一张简短的失败案例表。我想看看系统在哪里不确定、遗漏了哪些信息，以及问题究竟来自模型、实验设置还是提问方式。",
            "我把总体结果和这些案例放在一起。数字帮助我比较不同实验，案例则提供了下一步调查的具体方向。这项实践还在随着一次次实验不断完善。"
          ]
        }
      ]
    },
    {
      "slug": "a-research-workflow-that-scales",
      "title": "让研究工作流保持简单",
      "date": "2026年8月29日",
      "category": "工程",
      "readingTime": "阅读约4分钟",
      "excerpt": "一些关于实验、可读代码，以及让未来的自己也能看懂笔记的简单习惯。",
      "sections": [
        {
          "heading": "留下线索",
          "paragraphs": [
            "每次实验开始时，我都会保存问题、配置和运行命令。我希望几周后再回来，仍能理解当时的选择，而不必靠记忆重新拼凑。",
            "代码旁边的一份纯文本笔记往往就足够了。我记录有趣的结果、出乎意料的失败，以及下一步想尝试的事情。形式并不重要，关键是让记录与工作保持在一起。"
          ]
        },
        {
          "heading": "构建最小的实用工具",
          "paragraphs": [
            "研究工具很容易发展成另一个项目。我通常会等一个任务重复几次后再将它自动化，并只添加让工具可靠运行所需的结构。",
            "这样能为实验本身留下更多空间。一段小脚本、一张清晰的图和一份有用的笔记，能够承载很多理解。"
          ]
        }
      ]
    }
  ],
  "reading": [
    {
      "title": "深度学习",
      "creator": "Ian Goodfellow、Yoshua Bengio、Aaron Courville",
      "kind": "Book",
      "status": "Reading",
      "year": "2016",
      "note": "重新梳理基础，尤其是优化与表征学习。",
      "url": "https://www.deeplearningbook.org/"
    },
    {
      "title": "数据密集型应用系统设计",
      "creator": "Martin Kleppmann",
      "kind": "Book",
      "status": "Reading",
      "year": "2017",
      "note": "结合研究基础设施和可复现实验，阅读第一版。",
      "url": "https://martin.kleppmann.com/2017/03/27/designing-data-intensive-applications.html"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani 等",
      "kind": "Paper",
      "status": "Finished",
      "year": "2017",
      "note": "在梳理注意力模型的设计选择时，我经常重读这篇论文。",
      "url": "https://arxiv.org/abs/1706.03762"
    },
    {
      "title": "苦涩的教训",
      "creator": "Richard Sutton",
      "kind": "Article",
      "status": "Finished",
      "year": "2019",
      "note": "帮助我思考：哪些部分值得手工构建，哪些应该交给系统去学习。",
      "url": "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    }
  ]
}
