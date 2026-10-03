/** CMS-ready content shapes. Replace the local sources with an adapter later. */
export interface BlogSection { heading: string; paragraphs: string[] }
export interface BlogPost { slug: string; title: string; date: string; category: string; readingTime: string; excerpt: string; sections: BlogSection[] }
export interface ReadingItem { title: string; creator: string; kind: 'Book' | 'Article' | 'Paper'; status: 'Reading' | 'Finished'; year: string; note: string; url: string }
export interface Profile { name: string; role: string; location: string; email: string; introduction: string; biography: string; aside: string }
export interface SiteContent { profile: Profile; posts: BlogPost[]; reading: ReadingItem[] }

export const englishContent: SiteContent = {
  "profile": {
    "name": "Alex Chen",
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
      "category": "Research",
      "readingTime": "5 min read",
      "excerpt": "A research note on failure cases, useful benchmarks, and looking beyond a single score.",
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
      "slug": "a-research-workflow-that-scales",
      "title": "A research workflow that stays small",
      "date": "August 29, 2026",
      "category": "Engineering",
      "readingTime": "4 min read",
      "excerpt": "Simple habits for experiments, readable code, and notes your future self can actually use.",
      "sections": [
        {
          "heading": "Leave a trail",
          "paragraphs": [
            "At the start of an experiment, I save the question, the configuration, and the command I ran. I want to be able to return weeks later and understand the choices without reconstructing them from memory.",
            "A plain text note beside the code is often enough. I record the interesting result, the surprising failure, and one thing I would try next. The format matters less than keeping it close to the work."
          ]
        },
        {
          "heading": "Build the smallest useful tool",
          "paragraphs": [
            "It is easy for research tooling to become a second project. I try to wait until a task has repeated a few times before I automate it, and then give the tool just enough structure to be dependable.",
            "This leaves more room for the experiment itself. A small script, a clear plot, and a useful note can carry a surprisingly large amount of understanding."
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
      "year": "2016",
      "note": "Revisiting the foundations, especially optimization and representation learning.",
      "url": "https://www.deeplearningbook.org/"
    },
    {
      "title": "Designing Data-Intensive Applications",
      "creator": "Martin Kleppmann",
      "kind": "Book",
      "status": "Reading",
      "year": "2017",
      "note": "Reading the first edition with research infrastructure and reproducible experiments in mind.",
      "url": "https://martin.kleppmann.com/2017/03/27/designing-data-intensive-applications.html"
    },
    {
      "title": "Attention Is All You Need",
      "creator": "Ashish Vaswani et al.",
      "kind": "Paper",
      "status": "Finished",
      "year": "2017",
      "note": "A paper I return to when tracing the design choices behind attention-based models.",
      "url": "https://arxiv.org/abs/1706.03762"
    },
    {
      "title": "The Bitter Lesson",
      "creator": "Richard Sutton",
      "kind": "Article",
      "status": "Finished",
      "year": "2019",
      "note": "A useful prompt for thinking about what to build by hand and what to let a system learn.",
      "url": "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    }
  ]
}

export const { profile, posts, reading } = englishContent
export const getPost = (slug: string) => posts.find(post => post.slug === slug)
