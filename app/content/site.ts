/** CMS-ready content shapes. Replace the local sources with an adapter later. */
export interface BlogSection { heading: string; paragraphs: string[] }
export type BlogCategory = 'research' | 'travelling'
export interface BlogPost { slug: string; title: string; date: string; category: BlogCategory; image?: { src: string; alt: string }; readingTime: string; excerpt: string; sections: BlogSection[] }
export interface ReadingItem { title: string; creator: string; kind: 'Book' | 'Article' | 'Paper'; status: 'Reading' | 'Finished'; finishedAt?: string; isSample?: boolean; image?: { src: string; alt: string }; note: string; url: string }
export interface ProfileTag { id: string; label: string }
export interface Profile { name: string; displayName: string; tags: ProfileTag[]; image: { src: string; alt: string }; role: string; location: string; email: string; introduction: string; biography: string; aside: string }
export interface SiteContent { profile: Profile; posts: BlogPost[]; reading: ReadingItem[] }

export const englishContent: SiteContent = {
  "profile": {
    "name": "YU Chenbo",
    "displayName": "Chenbo",
    "tags": [
      { "id": "research", "label": "Researcher" },
      { "id": "photography", "label": "Photographer" },
      { "id": "music", "label": "Violinist at heart" }
    ],
    "image": { "src": "/profile.jpg", "alt": "Portrait of YU Chenbo" },
    "role": "AI researcher & technologist",
    "location": "Research, wherever it happens",
    "email": "hello@example.com",
    "introduction": "I study intelligent systems and build tools that make research easier to understand, reproduce, and use.",
    "biography": "I’m an AI researcher interested in model evaluation, learning systems, and the engineering behind useful experiments. I like moving between a research question, a careful implementation, and the evidence that connects them.",
    "aside": "Outside research, I enjoy open-source tools, new hardware, long-form technical writing, and finding small ways to make everyday technology work better."
  },
  "posts": [
    {
      "slug": "what-a-good-evaluation-misses",
      "title": "What a good evaluation can still miss",
      "date": "September 18, 2026",
      "category": "research",
      "readingTime": "5 min read",
      "excerpt": "A few reflections on new AI capabilities, useful benchmarks, and what a single score leaves out.",
      "sections": [
        {
          "heading": "Start with the question",
          "paragraphs": [
            "Before I run an evaluation, I write down the decision it is supposed to help me make. A score is easier to interpret when I know what kind of progress would matter for the task in front of me.",
            "For a small prototype, that often means collecting a handful of realistic cases and describing what a useful answer would look like. I treat these descriptions as a working hypothesis, and keep revisiting them as the system changes."
          ]
        },
        {
          "heading": "Keep the failures close",
          "paragraphs": [
            "My favorite part of an experiment report is the small table of failures. I want to see where the system was uncertain, what information it missed, and whether the problem belonged to the model, the setup, or the question.",
            "I keep the aggregate result alongside these examples. The number gives me a way to compare runs; the examples give me something concrete to investigate next. This is a practice I am still refining, one experiment at a time."
          ]
        }
      ]
    },
    {
      "slug": "a-slower-way-to-see-a-city",
      "title": "A slower way to see a city",
      "date": "August 29, 2026",
      "category": "travelling",
      "readingTime": "4 min read",
      "excerpt": "Side streets, a quiet café, and the things I noticed when I stopped trying to fit everything into a trip.",
      "sections": [
        {
          "heading": "Leave space in the day",
          "paragraphs": [
            "On a recent trip to Kyoto, I arrived with a map full of saved places. By the second morning, I had already started measuring the day by how many pins I could turn into visits. It felt strangely like clearing a task list.",
            "I left the afternoon open instead. I walked along a quiet street, stopped for coffee, and sat long enough to notice the small routines around me: someone opening a shop, bicycles passing the window, a delivery arriving next door. None of it needed to become an attraction."
          ]
        },
        {
          "heading": "A different kind of attention",
          "paragraphs": [
            "I still used my phone to find my way, but I stopped consulting it at every corner. Having less of a plan made me pay more attention to where I actually was. I remember the light on a wall and a conversation over lunch more clearly than the places I had hurried through the day before.",
            "Back at my desk, that difference stayed with me. Research also has moments when the next result becomes the only thing in view. Sometimes a little unstructured time helps me notice the question I had been walking past."
          ]
        },
        {
          "heading": "What I brought home",
          "paragraphs": [
            "My notes from the trip are short: a few photos, the name of the café, and one sentence about each day. They are enough to bring back how the place felt without turning the trip into another project to document.",
            "For the next trip, I will still save a few places I want to see. I will also leave a blank afternoon on the calendar. It turned out to be the part I remember most."
          ]
        }
      ]
    }
  ],
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

export const { profile, posts, reading } = englishContent
export const getPost = (slug: string) => posts.find(post => post.slug === slug)
