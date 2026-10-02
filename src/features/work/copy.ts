export type ProjectCopy = {
  name: string;
  category: string;
  teaser: string;
};

export type WorkCopy = {
  heading: string;
  count: string;
  view: string;
  all: string;
  allHref: string;
  pause: string;
  play: string;
  route: ProjectCopy;
  owl: ProjectCopy;
};
