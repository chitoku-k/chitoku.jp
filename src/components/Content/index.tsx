import React, { FunctionComponent } from 'react'

import Sidebar from 'components/Sidebar'

const Content: FunctionComponent<ContentProps> = ({
  children,
  sidebar = true,
}) => (
  <div id="main-container" className={[
    'container',
    sidebar ? 'sidebar' : '',
  ].filter(x => x).join(' ')}>
    {children}
    {sidebar ? (
      <Sidebar />
    ) : null}
  </div>
)

interface ContentProps {
  sidebar?: boolean
}

export default Content
