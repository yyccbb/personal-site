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
      "category": "research",
      "readingTime": "阅读约5分钟",
      "excerpt": "关于人工智能新能力、实用基准，以及单一分数未能呈现的那些细节的一些思考。",
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
      "slug": "a-slower-way-to-see-a-city",
      "title": "放慢脚步，认识一座城市",
      "date": "2026年8月29日",
      "category": "travelling",
      "readingTime": "阅读约4分钟",
      "excerpt": "小巷、安静的咖啡馆，以及不再努力把行程排满之后，我才留意到的事。",
      "sections": [
        {
          "heading": "给一天留一点空白",
          "paragraphs": [
            "最近去京都旅行时，我带着一张标满收藏地点的地图。到了第二天早晨，我已经开始用去了多少个地方来衡量这一天。不知不觉间，旅行像是在清空待办清单。",
            "于是，我把下午的安排取消了。沿着一条安静的街道散步，停下来喝杯咖啡，坐得足够久，才开始留意周围的小事：有人打开店门，自行车经过窗前，隔壁收到了送来的货物。它们不必成为景点，也值得停下来看看。"
          ]
        },
        {
          "heading": "另一种注意力",
          "paragraphs": [
            "我仍然用手机找路，却不再每到一个路口就查看地图。少一点计划，反而让我更注意自己身处的地方。墙上的光线、午饭时的一段交谈，比前一天匆匆经过的那些地点更清晰地留在了记忆里。",
            "回到研究桌前，这种差别仍让我惦记。做研究时，也会有只盯着下一个结果的时候。有时，留一点没有安排的时间，才能看见那个一直被自己忽略的问题。"
          ]
        },
        {
          "heading": "带回来的东西",
          "paragraphs": [
            "这次旅行的记录很短：几张照片、咖啡馆的名字，以及每天的一句话。它们足以让我想起当时的感受，也没有把旅行变成另一个需要完整记录的项目。",
            "下一次出发，我还是会收藏几个想去的地方。但也会在日历上留出一个空白的下午。最后最难忘的，恰恰是这一段没有计划的时间。"
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
