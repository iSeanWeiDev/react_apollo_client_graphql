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
    disabled: false
  },
  {
    icon: faSitemap,
    text: 'Topology',
    url: '/topologies',
    disabled: false
  },
  {
    icon: faBookOpen,
    text: 'Lessons',
    url: '/lessons',
    disabled: false
  },
  {
    icon: faBox,
    text: 'Packages',
    url: '/packages',
    disabled: false
  },
  {
    icon: faPhotoVideo,
    text: 'Galleries',
    url: '/galleries',
    disabled: false
  },
  {
    icon: faSwatchbook,
    text: 'Resources',
    url: '/resources',
    disabled: false
  },
  {
    icon: faFileArchive,
    text: 'Archives',
    url: '/archives',
    disabled: false
  },
  {
    icon: faUsersCog,
    text: 'Users',
    url: '/users',
    disabled: false
  }
];

export const actionMenuElements = [
  {
    icon: faInfoCircle,
    text: 'Tutorials',
    url: '/tutorials',
    disabled: false
  },
  { icon: faCog, text: 'Settings', url: '/settings', disabled: false }
];
