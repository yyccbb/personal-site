/** CMS-ready content shapes. Replace the local sources with an adapter later. */
export interface ReadingItem { title: string; creator: string; kind: 'Book' | 'Article' | 'Paper'; status: 'Reading' | 'Finished'; finishedAt?: string; isSample?: boolean; image?: { src: string; alt: string }; note: string; url: string }
export interface ProfileTag { id: string; label: string }
export interface Profile { name: string; displayName: string; tags: ProfileTag[]; image: { src: string; alt: string }; role: string; location: string; email: string; introduction: string; biography: string; workingStyle: string; aside: string; personalInterests: string; connectionInvitation: string }
export interface SiteContent { profile: Profile; reading: ReadingItem[] }

export const englishContent: SiteContent = {
  "profile": {
    "name": "YU Chenbo",
    "displayName": "Chenbo",
    "tags": [
      { "id": "research", "label": "Researcher" },
      { "id": "photography", "label": "Photographer" },
      { "id": "music", "label": "Violinist at heart" }
    ],
    "image": { "src": "/profile.jpg", "alt": "Portrait of Yu Chenbo" },
    "role": "AI researcher & technologist",
    "location": "Research, wherever it happens",
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
      "title": "Deep Learning",
      "creator": "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
      "kind": "Book",
      "status": "Reading",
      "image": { "src": "/reading/deep-learning.jpg", "alt": "Deep Learning book cover" },
      "note": "Revisiting the foundations, especially optimization and representation learning.",
      "url": "https://www.deeplearningbook.org/"
    },
    {
      "title": "Designing Data-Intensive Applications",
      "creator": "Martin Kleppmann",
      "kind": "Book",
      "status": "Reading",
      "image": { "src": "/reading/designing-data-intensive-applications.jpg", "alt": "Designing Data-Intensive Applications book cover" },
      "note": "Reading the first edition with research infrastructure and reproducible experiments in mind.",
      "url": "https://martin.kleppmann.com/2017/03/27/designing-data-intensive-applications.html"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani et al.",
      "kind": "Paper",
      "status": "Finished",
      "finishedAt": "2024-06",
      "image": { "src": "/reading/neurips.png", "alt": "NeurIPS conference logo" },
      "note": "A paper I return to when tracing the design choices behind attention-based models.",
      "url": "https://arxiv.org/abs/1706.03762"
    },
    {
      "title": "The Bitter Lesson",
      "creator": "Richard Sutton",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2026-05",
      "note": "A useful prompt for thinking about what to build by hand and what to let a system learn.",
      "url": "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    },
    {
      "title": "Sample: Small experiments, useful questions",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2026-09",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-small-experiments"
    },
    {
      "title": "Sample: What a benchmark leaves out",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2025-11",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-benchmark"
    },
    {
      "title": "Sample: Keeping a research notebook",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2025-03",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-research-notebook"
    },
    {
      "title": "Sample: A slower way to learn",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2024-01",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-slower-learning"
    },
    {
      "title": "Sample: Notes on useful tools",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2023-10",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-useful-tools"
    },
    {
      "title": "Sample: The questions worth keeping",
      "creator": "Sample entry",
      "kind": "Article",
      "status": "Finished",
      "finishedAt": "2023-02",
      "isSample": true,
      "note": "Temporary reading entry with a sample finish date for trying the timeline.",
      "url": "#sample-questions"
    }
  ]
}

export const { profile, reading } = englishContent
