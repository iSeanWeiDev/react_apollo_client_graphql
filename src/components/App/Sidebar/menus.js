import {
  faTachometerAlt,
  faCog,
  faBox,
  faSwatchbook,
  faSitemap,
  faFileArchive,
  faPhotoVideo,
  faBookOpen,
  faUsersCog,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

export const mainMenuElements = [
  {
    icon: faTachometerAlt,
    text: 'Dashboard',
    url: '/dashboard',
    tooltip: 'Dashboard with Graphic Designs'
  },
  {
    icon: faSitemap,
    text: 'Topology',
    url: '/topologies',
    tooltip: 'Tree structure and Topologies'
  },
  {
    icon: faBookOpen,
    text: 'Lessons',
    url: '/lessons',
    tooltip: 'Classes and Lessons'
  },
  {
    icon: faBox,
    text: 'Packages',
    url: '/packages',
    tooltip: 'Packaged Lessons'
  },
  {
    icon: faPhotoVideo,
    text: 'Galleries',
    url: '/galleries',
    tooltip: 'Global Assets'
  },
  {
    icon: faSwatchbook,
    text: 'Resources',
    url: '/resources',
    tooltip: 'All Resources'
  },
  {
    icon: faFileArchive,
    text: 'Archives',
    url: '/archives',
    tooltip: 'Coming Soon Page'
  },
  {
    icon: faUsersCog,
    text: 'Users',
    url: '/users',
    tooltip: 'All Users'
  }
];

export const actionMenuElements = [
  {
    icon: faInfoCircle,
    text: 'Tutorials',
    url: '/tutorials',
    tooltip: 'Coming Soon Page'
  },
  {
    icon: faCog,
    text: 'Settings',
    url: '/settings',
    tooltip: 'Coming Soon Page'
  }
];
