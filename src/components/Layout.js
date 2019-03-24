import React from "react"
import { Link } from "react-router-dom"
import "bulma/css/bulma.css"
import "./Layout.css"
import {
  Container,
  Hero,
  HeroHeader,
  HeroBody,
  HeroFooter,
  Navbar,
  NavbarItem,
  NavbarLink,
  Title,
  Tabs,
  TabList,
  Tab
} from "bloomer"

const Layout = ({ children }) => (
  <div>
    <Hero isColor="primary">
      <HeroHeader>
        <Navbar id="navbar">
          <NavbarItem>
            <NavbarLink href="https://github.com/" target="_blank">
              Github
            </NavbarLink>
          </NavbarItem>
        </Navbar>
      </HeroHeader>
      <HeroBody>
        <Title isSize={1}>Gestión de repositorios</Title>
      </HeroBody>
      <HeroFooter>
        <Tabs isFullWidth>
          <Container>
            <TabList>
              <Tab>
                <Link to="/">Home</Link>
              </Tab>
              <Tab>
                <Link to="/accounts">Cuentas</Link>
              </Tab>
            </TabList>
          </Container>
        </Tabs>
      </HeroFooter>
    </Hero>
    <Container>{children}</Container>
  </div>
)

export default Layout
