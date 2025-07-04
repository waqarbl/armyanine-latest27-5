import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  // AdminIcon,
  // BoxCubeIcon,
  // CalenderIcon,
  ChevronDownIcon,
  DatabaseIcon,
  DogIcon,
  GridIcon,
  // GridIcon,
  HorizontaLDots,
  PawPrintIcon,
  PlugInIcon,
  UserIcon,
  // TableIcon,
  // UserCircleIcon,
  // StethoscopeIcon, // <-- Removed import for StethoscopeIcon
} from "../assets/icons";
import { MdOutlineMedicalServices } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import logoIcon from "../assets/images/logo/logo.svg";
import logoDark from "../assets/images/logo/logo-dark.svg";

// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  // {
  //   icon: <CalenderIcon />,
  //   name: "Calendar",
  //   path: "/calendar",
  // },
  // {
  //   icon: <AdminIcon />,
  //   name: "Adminstartion",
  //   subItems: [
  //     { name: "Activity Logs", path: "/activity-logs", pro: false },
  //     { name: "Recycle Bin", path: "recycle-bin", pro: false },
  //   ]
  // },
  // {
  //   icon: <UserCircleIcon />,
  //   name: "User Management",
  //   subItems:[
  //     { name: "My Profile", path: "/profile", pro: false }
  //   ]
  // },

  {
    name: "Dogs",
    icon: <PawPrintIcon />,
    subItems: [
      { name: "Dog Form", path: "/form-elements", pro: false },
      { name: "Dogs List", path: "/basic-tables", pro: false },
      { name: "Stud Certificate", path: "/stud-certificate", pro: false },
    ],
  },
  {
    name: "Medical Records",
    icon: <MdOutlineMedicalServices />,
    subItems: [
      { name: "Vaccination Records", path: "/vaccination-view", pro: false },
      { name: "Deworming Records", path: "/deworming-view", pro: false },
      { name: "Training Records", path: "/training-view", pro: false },
      { name: "Prophylaxis", path: "/prophylaxis-view", pro: false },
      { name: "Sickness Records", path: "/sickness-view", pro: false },
    ],
  },

  // {
  //   icon: <MicrochipIcon />,
  //   name: "Microchip",
  //   path: "/microchip",
  // },

  {
    name: "Litters",
    icon: <DogIcon />,
    subItems: [
      // {
      //   name: "Litter Registration",
      //   path: "/litters-reigstration-request",
      //   pro: false,
      // },
      {
        name: "Litter Inspection",
        path: "/litters-inspection-request-list",
        pro: false,
      },
      // { name: "Dog Categories List", path: "/dog-category-list", pro: false },
    ],
  },
  // {
  //   name: "Stud Certificate List",
  //   icon: <MedalIcon />,
  //   subItems: [
  //     { name: "Stud certificate", path: "/blank", pro: false },
  //   ],
  // },
  // {
  //   icon: <MapIcon />,
  //   name: "Locations",
  //   subItems: [
  //     { name: "Locations", path: "/form-elements", pro: false },

  //   ]
  // },
  // {
  //   icon: <NoteBookIcon />,
  //   name: "ACC Numbers",
  //   path: "/blank",
  //   subItems: [
  //     { name: "ACC Numbers", path: "", pro: false },

  //   ]
  // },
  // {
  //   icon: <ChartColumnIcon />,
  //   name: "Breed Statisics",
  //   path: "/blank",
  // },
  // {
  //   icon: <MicrochipIcon />,
  //   name: "Microchips",
  //   subItems: [
  //     { name: "Microchips", path: "micro-chip", pro: false },

  //   ]
  // },
  {
    icon: <DatabaseIcon />,
    name: "ACC Database",
    path: "/database-view",
    //   subItems: [
    //     { name: "Pedigree List", path: "/pedigree", pro: false },
    //   ],
  },
  // {
  //   icon: <BreedIcon />,
  //   name: "Record of Recent Matings",
  //   path: "/blank",
  // },
  // {
  //   icon: <CrossIcon />,
  //   name: "Pharmacy",
  //   path: "/pharmacy-medication",
  // },
];

const othersItems: NavItem[] = [
  // {
  //   icon: <SettingIcon />,
  //   name: "Administration",
  //   path: "/blank"
  // },
  {
    icon: <UserIcon />,
    name: "Dog Management",
    subItems: [
      { name: "Dog Categories", path: "/dog-category-list", pro: false },
      { name: "Dog Breed", path: "/dog-breed", pro: false },
      {
        name: "Microchip",
        path: "/microchip",
      },
      { name: "Cities", path: "/cities" },
      { name: "Countries", path: "/countries" },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`mt-10 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={logoIcon}
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src={logoDark}
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <></>
            // <img
            //   src={logoIcon}
            //   alt="Logo"
            //   width={32}
            //   height={32}
            // />
          )}
        </Link>
        {/* Text below the logo */}
      </div>
      {/* {(isExpanded || isHovered || isMobileOpen) && (
        <div className="mb-10">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            ARMY CANINE CENTRE
          </p>
        </div>
      )} */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
