/** Local content source. A future CMS adapter can return these same shapes. */
export interface BlogSection {
  heading: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  readingTime: string
  excerpt: string
  sections: BlogSection[]
}

export interface ReadingItem {
  title: string
  creator: string
  kind: 'Book' | 'Article'
  status: 'Reading' | 'Finished'
  year: string
  note: string
}

export const profile = {
  name: 'Alex Chen',
  role: 'Designer & front-end engineer',
  location: 'Brooklyn, New York',
  email: 'hello@alexchen.design',
  introduction: 'I make digital places that feel clear, useful, and a little more human.',
  biography: 'I’m an independent designer and front-end engineer working with small teams on websites and products. My practice moves between visual systems, thoughtful interactions, and the code that holds them together.',
  aside: 'Away from the screen, I collect used books, take long walks, and make an overly careful cup of coffee.',
}

export const posts: BlogPost[] = [
  {
    slug: 'the-case-for-slower-websites',
    title: 'The case for slower websites',
    date: 'September 18, 2026',
    category: 'Design',
    readingTime: '5 min read',
    excerpt: 'A few notes on creating room to notice, choose, and actually enjoy being online.',
    sections: [
      {
        heading: 'A little room to breathe',
        paragraphs: [
          'The web is very good at asking us to move. There is always another button, another notification, another thing about to disappear. Speed can be useful, but it is a strange measure of whether an experience is good.',
          'I have been thinking about what happens when a website gives someone permission to pause. A generous margin, a short sentence, or a transition that makes the next step legible can change the whole mood of a page.',
        ],
      },
      {
        heading: 'Make the important things easy',
        paragraphs: [
          'Slower does not mean harder to use. The clearest paths should still be immediate. It means being selective with what asks for attention, so the work and the words can have their own rhythm.',
          'The best digital spaces I know feel like a good conversation: direct when they need to be, comfortable with silence, and always respectful of the person on the other side.',
        ],
      },
    ],
  },
  {
    slug: 'a-small-system-for-creative-work',
    title: 'A small system for creative work',
    date: 'August 29, 2026',
    category: 'Process',
    readingTime: '4 min read',
    excerpt: 'On keeping a simple practice of collecting, making, and revisiting ideas.',
    sections: [
      {
        heading: 'Collect without a destination',
        paragraphs: [
          'My best ideas rarely arrive at a desk. They show up in an overheard sentence, a book margin, or a detail in a place I have walked past a hundred times. I keep one small notebook for anything that makes me look twice.',
          'The notebook is intentionally untidy. It is a place to notice, not a system to maintain. Every few weeks, I read it from the beginning and see which thoughts still have energy.',
        ],
      },
      {
        heading: 'Make before you organize',
        paragraphs: [
          'When an idea stays with me, I try to make the smallest possible version of it. A sketch, a paragraph, or a rough interaction tells me more than a perfectly named folder ever could.',
          'The practice is simple: pay attention, give things a form, and leave enough time to return. Consistency matters more than the tools.',
        ],
      },
    ],
  },
]

export const reading: ReadingItem[] = [
  {
    title: 'The Creative Act',
    creator: 'Rick Rubin',
    kind: 'Book',
    status: 'Reading',
    year: '2023',
    note: 'A welcome reminder that attention is a creative practice of its own.',
  },
  {
    title: 'Ways of Seeing',
    creator: 'John Berger',
    kind: 'Book',
    status: 'Reading',
    year: '1972',
    note: 'Returning to this one slowly, with a pencil in hand.',
  },
  {
    title: 'An Incomplete Manifesto for Growth',
    creator: 'Bruce Mau',
    kind: 'Article',
    status: 'Finished',
    year: '1998',
    note: 'Short, energetic advice for staying curious while making things.',
  },
  {
    title: 'A Psalm for the Wild-Built',
    creator: 'Becky Chambers',
    kind: 'Book',
    status: 'Finished',
    year: '2021',
    note: 'A gentle story about purpose, rest, and the questions worth asking.',
  },
  {
    title: 'The Web’s Grain',
    creator: 'Frank Chimero',
    kind: 'Article',
    status: 'Finished',
    year: '2015',
    note: 'Still one of the clearest arguments for designing with the medium.',
  },
]

export function getPost(slug: string) {
  return posts.find(post => post.slug === slug)
}
