import React from 'react'
import { LocationProvider, createHistory, createMemorySource } from '@gatsbyjs/reach-router'
import type { Meta, StoryFn } from '@storybook/react'

import type { ArticleBodyProps } from 'components/ArticleBody'
import ArticleBody, { register } from 'components/ArticleBody'
import Link from 'components/Link'

register('a', Link)

const meta: Meta = {
  component: ArticleBody,
  title: 'Components/ArticleBody',
  parameters: {
    backgrounds: {
      default: 'container',
    },
  },
}

const history = createHistory(createMemorySource('/'))

const Template: StoryFn<ArticleBodyProps> = props => (
  <LocationProvider history={history}>
    <ArticleBody {...props} />
  </LocationProvider>
)

export default meta
export const Heading2 = Template.bind({}, {
  ast: {
    type: 'element',
    tagName: 'h2',
    properties: {
      id: 'gatsby-と-typescript',
      style: 'position:relative;',
    },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: '#gatsby-%E3%81%A8-typescript',
          ariaLabel: 'gatsby と typescript permalink',
          className: [
            'anchor',
            'before',
          ],
        },
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              ariaHidden: 'true',
              focusable: 'false',
              height: '16',
              version: '1.1',
              viewBox: '0 0 16 16',
              width: '16',
            },
            children: [
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  fillRule: 'evenodd',
                  d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: 'Gatsby と TypeScript',
      },
    ],
  },
})

export const Heading3 = Template.bind({})
Heading3.args = {
  ast: {
    type: 'element',
    tagName: 'h3',
    properties: {
      id: 'サロゲートペアの考慮',
      style: 'position:relative;',
    },
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: '#%E3%82%B5%E3%83%AD%E3%82%B2%E3%83%BC%E3%83%88%E3%83%9A%E3%82%A2%E3%81%AE%E8%80%83%E6%85%AE',
          ariaLabel: 'サロゲートペアの考慮 permalink',
          className: [
            'anchor',
            'before',
          ],
        },
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              ariaHidden: 'true',
              focusable: 'false',
              height: '16',
              version: '1.1',
              viewBox: '0 0 16 16',
              width: '16',
            },
            children: [
              {
                type: 'element',
                tagName: 'path',
                properties: {
                  fillRule: 'evenodd',
                  d: 'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: 'サロゲートペアの考慮',
      },
    ],
  },
}

export const Paragraph = Template.bind({})
Paragraph.args = {
  ast: {
    type: 'element',
    tagName: 'p',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: 'https://www.gatsbyjs.org/',
        },
        children: [
          {
            type: 'text',
            value: 'Gatsby',
          },
        ],
      },
      {
        type: 'text',
        value: ' は React 製の静的サイトジェネレーターです。Markdown や画像、YAML、テキストファイルなどを透過的に扱うサーバーをローカルに建てて、それらを React のコンポーネントから GraphQL クエリーを通じて組み込めるという特徴があります。豊富なプラグインによって動作を拡張できるほか、細かいカスタマイズは自分でローカルにプラグインとして切り出して管理することができます。',
      },
    ],
  },
}

export const Blockquote = Template.bind({})
Blockquote.args = {
  ast: {
    type: 'element',
    tagName: 'blockquote',
    properties: {},
    children: [
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'What do we mean by normalization',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Switch all characters to lower case',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Remove all diacritics (eg accents)',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Remove punctuation within words (eg apostrophes)',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Manage punctuation between words',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Use word separators (such as spaces, but not only)',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Transform traditional Chinese to modern',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
    ],
  },
}

export const Table = Template.bind({})
Table.args = {
  ast: {
    type: 'element',
    tagName: 'div',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'table',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'tbody',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '3',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'element',
                            tagName: 'strong',
                            properties: {},
                            children: [
                              {
                                type: 'text',
                                value: 'ちとくのホームページ年表',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'element',
                            tagName: 'strong',
                            properties: {},
                            children: [
                              {
                                type: 'text',
                                value: '時期',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'element',
                            tagName: 'strong',
                            properties: {},
                            children: [
                              {
                                type: 'text',
                                value: 'ホスト',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'element',
                            tagName: 'strong',
                            properties: {},
                            children: [
                              {
                                type: 'text',
                                value: 'フレームワーク',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: '〜2014/02/27',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: 'レンタルサーバー',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 2,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: 'VanillaJS ',
                          },
                          {
                            type: 'element',
                            tagName: 'img',
                            properties: {
                              className: [
                                'emoji',
                              ],
                              draggable: 'false',
                              alt: '🤣',
                              src: 'https://twemoji.maxcdn.com/v/13.1.0/72x72/1f923.png',
                            },
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: '〜2015/06/20',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 3,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: 'VPS',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: '〜2019/02/18',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: 'WordPress',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'tr',
                properties: {},
                children: [
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: '〜現在',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'td',
                    properties: {
                      colSpan: '1',
                      rowSpan: 1,
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'p',
                        properties: {},
                        children: [
                          {
                            type: 'text',
                            value: 'Gatsby',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export const ListOrdered = Template.bind({})
ListOrdered.storyName = 'List (ordered)'
ListOrdered.args = {
  ast: {
    type: 'element',
    tagName: 'ol',
    properties: {},
    children: [
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'Gatsby で TypeScript なら ',
          },
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-plugin-ts-loader/',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-plugin-ts-loader',
              },
            ],
          },
          {
            type: 'text',
            value: ' + ',
          },
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.npmjs.com/package/tsconfig-paths-webpack-plugin',
            },
            children: [
              {
                type: 'text',
                value: 'tsconfig-paths-webpack-plugin',
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'Algolia で日本語の検索をするときは ',
          },
          {
            type: 'element',
            tagName: 'em',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Keep diacritics on characters',
              },
            ],
          },
          {
            type: 'text',
            value: ' に注意',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.npmjs.com/package/babel-plugin-react-intl-auto',
            },
            children: [
              {
                type: 'text',
                value: 'babel-plugin-react-intl-auto',
              },
            ],
          },
          {
            type: 'text',
            value: ' に出した PR がマージされた',
          },
          {
            type: 'element',
            tagName: 'sup',
            properties: {
              id: 'fnref-1',
            },
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: '#fn-1',
                  className: [
                    'footnote-ref',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '1',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-transformer-remark/',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-transformer-remark',
              },
            ],
          },
          {
            type: 'text',
            value: ' に出した PR がマージされた',
          },
          {
            type: 'element',
            tagName: 'sup',
            properties: {
              id: 'fnref-2',
            },
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: '#fn-2',
                  className: [
                    'footnote-ref',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.npmjs.com/package/remark-grid-tables',
            },
            children: [
              {
                type: 'text',
                value: 'remark-grid-tables',
              },
            ],
          },
          {
            type: 'text',
            value: ' に出した PR がマージされた',
          },
          {
            type: 'element',
            tagName: 'sup',
            properties: {
              id: 'fnref-3',
            },
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href: '#fn-3',
                  className: [
                    'footnote-ref',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '3',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'Gatsby の IE サポートは半分嘘なので残り半分は自分でやる',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
    ],
  },
}

export const ListUnordered = Template.bind({})
ListUnordered.storyName = 'List (unordered)'
ListUnordered.args = {
  ast: {
    type: 'element',
    tagName: 'ul',
    properties: {},
    children: [
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-remark-attr/',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-remark-attr',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: 'Markdown 内のリンクや画像などに HTML 属性の機能を追加するプラグイン（',
                  },
                  {
                    type: 'element',
                    tagName: 'a',
                    properties: {
                      href: 'https://www.npmjs.com/package/remark-attr',
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'remark-attr',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '）',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-remark-component',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-remark-component',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: 'Markdown 内に書かれた ',
                  },
                  {
                    type: 'element',
                    tagName: 'code',
                    properties: {
                      className: [
                        'language-html',
                      ],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: [
                            'token',
                            'tag',
                          ],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: [
                                'token',
                                'tag',
                              ],
                            },
                            children: [
                              {
                                type: 'element',
                                tagName: 'span',
                                properties: {
                                  className: [
                                    'token',
                                    'punctuation',
                                  ],
                                },
                                children: [
                                  {
                                    type: 'text',
                                    value: '<',
                                  },
                                ],
                              },
                              {
                                type: 'text',
                                value: 'my-component',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: ' ',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: [
                                'token',
                                'punctuation',
                              ],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '/>',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' を React のコンポーネントとして組み込むプラグイン（',
                  },
                  {
                    type: 'element',
                    tagName: 'a',
                    properties: {
                      href: 'https://www.npmjs.com/package/rehype-react',
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'rehype-react',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '）',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-remark-embed-gist/',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-remark-embed-gist',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: 'Markdown 内の Gist の URL を Gist の埋め込みに展開するプラグイン',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'li',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gatsbyjs.org/packages/gatsby-remark-grid-tables/',
            },
            children: [
              {
                type: 'text',
                value: 'gatsby-remark-grid-tables',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'ul',
            properties: {},
            children: [
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'li',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: 'Markdown 内にアスキーアートの要領で書かれた表組を ',
                  },
                  {
                    type: 'element',
                    tagName: 'code',
                    properties: {
                      className: [
                        'language-html',
                      ],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: [
                            'token',
                            'tag',
                          ],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: [
                                'token',
                                'tag',
                              ],
                            },
                            children: [
                              {
                                type: 'element',
                                tagName: 'span',
                                properties: {
                                  className: [
                                    'token',
                                    'punctuation',
                                  ],
                                },
                                children: [
                                  {
                                    type: 'text',
                                    value: '<',
                                  },
                                ],
                              },
                              {
                                type: 'text',
                                value: 'table',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: [
                                'token',
                                'punctuation',
                              ],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '>',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' に展開するプラグイン（',
                  },
                  {
                    type: 'element',
                    tagName: 'a',
                    properties: {
                      href: 'https://www.npmjs.com/package/remark-grid-tables',
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'remark-grid-tables',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '）',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
    ],
  },
}

export const CodeBlock = Template.bind({})
CodeBlock.args = {
  ast: {
    type: 'element',
    tagName: 'div',
    properties: {
      className: [
        'gatsby-highlight',
      ],
      dataLanguage: 'javascript',
    },
    children: [
      {
        type: 'element',
        tagName: 'pre',
        properties: {
          className: [
            'language-javascript',
          ],
        },
        children: [
          {
            type: 'element',
            tagName: 'code',
            properties: {
              className: [
                'language-javascript',
              ],
            },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'keyword',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'const',
                  },
                ],
              },
              {
                type: 'text',
                value: ' TsconfigPathsPlugin ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'require',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'string',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '\'tsconfig-paths-webpack-plugin\'',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n\nexports',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '.',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function-variable',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'onCreateWebpackConfig',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'parameter',
                  ],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  actions',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'operator',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    setWebpackConfig',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=>',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n  ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'setWebpackConfig',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n    resolve',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ':',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n      plugins',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ':',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '[',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n        ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'keyword',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'new',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'class-name',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'TsconfigPathsPlugin',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n      ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ']',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n    ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n  ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export const CodeBlockLineNumbered = Template.bind({})
CodeBlockLineNumbered.storyName = 'Code Block (line number)'
CodeBlockLineNumbered.args = {
  ast: {
    type: 'element',
    tagName: 'div',
    properties: {
      className: [
        'gatsby-highlight',
      ],
      dataLanguage: 'javascript',
    },
    children: [
      {
        type: 'element',
        tagName: 'pre',
        properties: {
          style: 'counter-reset: linenumber 0',
          className: [
            'language-javascript',
            'line-numbers',
          ],
        },
        children: [
          {
            type: 'element',
            tagName: 'code',
            properties: {
              className: [
                'language-javascript',
              ],
            },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'keyword',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'const',
                  },
                ],
              },
              {
                type: 'text',
                value: ' TsconfigPathsPlugin ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'require',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'string',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '\'tsconfig-paths-webpack-plugin\'',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n\nexports',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '.',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function-variable',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'onCreateWebpackConfig',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'parameter',
                  ],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  actions',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'operator',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    setWebpackConfig',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: [
                        'token',
                        'punctuation',
                      ],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '=>',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n  ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'function',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'setWebpackConfig',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n    resolve',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ':',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '{',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n      plugins',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'operator',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ':',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '[',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n        ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'keyword',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'new',
                  },
                ],
              },
              {
                type: 'text',
                value: ' ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'class-name',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: 'TsconfigPathsPlugin',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '(',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n      ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ']',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n    ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ',',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n  ',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: ')',
                  },
                ],
              },
              {
                type: 'text',
                value: '\n',
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: [
                    'token',
                    'punctuation',
                  ],
                },
                children: [
                  {
                    type: 'text',
                    value: '}',
                  },
                ],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: {
              ariaHidden: 'true',
              className: [
                'line-numbers-rows',
              ],
              style: 'white-space: normal; width: auto; left: 0;',
            },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
              {
                type: 'element',
                tagName: 'span',
                properties: {},
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
}
