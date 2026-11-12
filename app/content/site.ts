/** CMS-ready content shapes. Replace the local sources with an adapter later. */
export interface ReadingItem { title: string; creator: string; kind: 'Book' | 'Article' | 'Paper'; status: 'Reading' | 'Finished'; finishedAt?: string; image?: { src: string; alt: string }; note: string; url: string }
export interface ProfileTag { id: string; label: string }
export interface Profile { name: string; displayName: string; tags: ProfileTag[]; image: { src: string; alt: string }; email: string; introduction: string; biography: string; workingStyle: string; aside: string; personalInterests: string; connectionInvitation: string }
export interface SiteContent { profile: Profile; reading: ReadingItem[] }

export const englishContent: SiteContent = {
  "profile": {
    "name": "Yu Chenbo",
    "displayName": "Chenbo",
    "tags": [
      { "id": "research", "label": "Researcher" },
      { "id": "photography", "label": "Photographer" },
      { "id": "music", "label": "Violinist at heart" }
    ],
    "image": { "src": "/profile.jpg", "alt": "Portrait of Yu Chenbo" },
    "email": "yuchenbo0130@gmail.com",
    "introduction": "I explore language models, AI alignment, and agentic AI, and enjoy building practical solutions with AI tools in my spare time.",
    "biography": "I’m an AI researcher based in Singapore. My research interests are language models, AI alignment, and agentic AI. I’m thrilled to explore the mathematical foundations and inner workings of language models to better align them or design harnesses for problems I care about.",
    "workingStyle": "I enjoy energetic teams where competing ideas spark passionate discussions, and where everyone’s need for quiet, focused thinking is respected.",
    "aside": "Outside research, I follow new developments in technology closely and enjoy trying new tools firsthand. I also explore other disciplines, looking for ideas and opportunities that connect with my work.",
    "personalInterests": "I’m a self-taught violinist and a fan of classical music. I also love travelling and documenting my life through photography. To me, photographs are honest vessels for memories. I play with light and shadow to make images I hope will still catch the eye and bring a moment back to life years from now.",
    "connectionInvitation": "I’d love to meet people who share these curiosities and bring their own perspectives. If something here resonates with you, say hello. I’d be glad to hear what you’re exploring and see what we might learn from each other."
  },
  "reading": [
    {
      "title": "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models",
      "creator": "Zhihong Shao et al.",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2026-02",
      "image": { "src": "/reading/deepseek.svg", "alt": "DeepSeek source logo" },
      "note": "Shows how training on carefully selected math data improves a language model’s math skills. It also introduces GRPO, a reinforcement learning method that compares groups of answers and uses less memory than PPO.",
      "url": "https://arxiv.org/abs/2402.03300"
    },
    {
      "title": "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model",
      "creator": "DeepSeek-AI",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2026-01",
      "image": { "src": "/reading/deepseek.svg", "alt": "DeepSeek source logo" },
      "note": "Explains how DeepSeek-V2 lowers the cost of training and running a language model. It activates only some of its expert networks for each token and compresses the stored attention data to use less memory.",
      "url": "https://arxiv.org/html/2405.04434v5"
    },
    {
      "title": "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
      "creator": "Rafael Rafailov et al.",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2025-10",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS conference logo" },
      "note": "A simpler way to train language models to follow human preferences. It learns directly from pairs of preferred and rejected answers, without training a separate reward model or running a reinforcement learning loop.",
      "url": "https://arxiv.org/abs/2305.18290"
    },
    {
      "title": "Exit West: A Novel",
      "creator": "Mohsin Hamid",
      "kind": "Book",
      "status": "Finished",
      "finishedAt": "2025-06",
      "image": { "src": "/reading/exit-west.jpg", "alt": "Exit West: A Novel by Mohsin Hamid book cover" },
      "note": "Nadia and Saeed flee a city at war through mysterious doors that lead to other countries. A story about migration, love, and how people change as they search for a new home.",
      "url": "https://www.penguin.co.uk/books/300265/exit-west-by-hamid-mohsin/9780241979075"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani et al.",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2025-02",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS conference logo" },
      "note": "Introduces the Transformer, which uses attention to connect words across a sentence. It processes words in parallel rather than one at a time, making training faster and improving translation quality.",
      "url": "https://arxiv.org/abs/1706.03762"
    }
  ]
}

export const { profile, reading } = englishContent
