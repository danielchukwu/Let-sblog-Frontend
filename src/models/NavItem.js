import { homeIcon, searchIcon, createIcon, notificationIcon, userIcon } from '../Constraints';

class NavItem {
  constructor(name, iconSrc, route) {
    this.iconSrc = iconSrc;
    this.name    = name;
    this.route   = this.route;
  }
}

class NavItems {
  static selectedIndex = 0;

  static setSelectedIndex(index) {
    if (Number.isInteger(index)){
      this.selectedIndex = index;
    } else {
      throw new Error("Invalid index passed in. Index should be of type integer")
    }
  } 
  
  static items = [
    new NavItem('home', homeIcon, "/"),
    new NavItem('search', searchIcon, "/search"),
    new NavItem('create', createIcon, "/create-blog"),
    new NavItem('notification', notificationIcon, "/notifications"),
    new NavItem('user', userIcon, "/users/"),
  ];
}

const navItems = [
  new NavItem('home', homeIcon),
  new NavItem('search', searchIcon),
  new NavItem('create', createIcon),
  new NavItem('notification', notificationIcon),
  new NavItem('user', userIcon),
];

export default NavItems;