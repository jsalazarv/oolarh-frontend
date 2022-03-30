export interface IModuleItemLink {
  icon: string;
  text: string;
  message: string | null;
  route: string;
  children?: Array<unknown>;
  model?: boolean;
  "icon-alt"?: string;
}

export interface IModuleMenu {
  children: Array<IModuleItemLink>;
  defaultRoute: string;
}

export interface ISidebar {
  menu: IModuleMenu;
}

export interface IAppState {
  layout: string;
  sidebar: ISidebar;
}
