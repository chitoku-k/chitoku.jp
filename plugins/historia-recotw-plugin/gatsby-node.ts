import { GatsbyNode } from 'gatsby'

const fromPath = '/recotw'
const toPath = 'https://recotw.chitoku.jp'

export const createPages: GatsbyNode['createPages'] = ({
  actions: {
    createRedirect,
  },
}) => {
  for (const path of [ fromPath, `${fromPath}/` ]) {
    createRedirect({
      fromPath: path,
      toPath,
      isPermanent: true,
      redirectInBrowser: true,
    })
  }
}
