import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = (props) => {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <div
          style={{
            ...scale(0.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            color: '#666',
          }}
          >
            With ❤ for Netlify
          </div>
        </>
      )
    } else {
      header = (
        <>
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
        <div
        style={{
          ...scale(-0.2),
          marginBottom: rhythm(1.5),
          marginTop: 0,
          color: '#666',
        }}
        >
          With ❤ for Netlify
        </div>
        </>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(23),
          paddingTop: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer style={{
          textAlign: 'center',
          borderTop: '1px solid #ccc',
          padding: '20px'
        }}>
          © {new Date().getFullYear()} | Wildsky
        </footer>
      </div>
    )
}

export default Layout
