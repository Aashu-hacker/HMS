// styled components
import { LinksList, List, MainItem } from "../style";
import { colors } from "@styles/vars";

// components
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";

// hooks
import { useSidebarContext } from "@contexts/sidebarContext";

// menu links
import { menu } from "@constants/menu";

const Content = () => {
  const { toggleSidebar } = useSidebarContext();
  const activeStyle = { color: colors.white };

  return (
    <List as={Accordion}>
      {menu.map((item, index) => {
        if (item.cat) {
          return (
            <Accordion.Item eventKey={item.cat} key={item.cat}>
              <MainItem as={Accordion.Header} style={{ color: "white" }}>
                <i
                  style={{ color: "white" }}
                  className={`icon icon-${item.icon}`}
                ></i>{" "}
                {item.cat}
              </MainItem>
              <Accordion.Body>
                <LinksList>
                  {item.links.map((link) => {
                    return (
                      <li key={link.link}>
                        <NavLink
                          to={link.link}
                          onClick={() => toggleSidebar()}
                          style={({ isActive }) => ({
                            fontWeight: isActive ? "700" : "400",
                            color: isActive ? " rgb(8, 155, 171)" : "white", 
                            background:isActive ? "white":" rgb(8, 155, 171)",
                            padding: "0.2rem .3rem",
                            borderRadius: "5px",
                            width: "100%",
                            display: "flex",
                          })}
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </LinksList>
              </Accordion.Body>
            </Accordion.Item>
          );
        } else if (item.link) {
          return (
            <MainItem
              as={NavLink}
              to={item.link}
              onClick={() => toggleSidebar()}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              key={item.link}
              className={index === menu.length - 1 ? "pin-down" : ""}
            >
              <i
                style={{ color: "white" }}
                className={`icon icon-${item.icon}`}
              ></i>{" "}
              <span style={{ color: "white" }}>{item.name}</span>
            </MainItem>
          );
        } else return null;
      })}
    </List>
  );
};

export default Content;
