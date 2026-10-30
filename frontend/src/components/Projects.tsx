import Ink from "./Ink";
import { usePushTiles } from "../hooks/usePushTiles";
import "./Projects.css";

type Project = {
  name: string;
  description: string;
  tools: string[];
};

/* Template
  {
    name: "Project",
    description:
    "Replace this with a short description of the project: what it does and what you built.",
    tools: ["Item1", "Item2", "Item3"],
  },
*/
const PROJECTS: Project[] = [
  {
    name: "Portfolio site",
    description: "Placeholder text.",
    tools: [
      "Nginx",
      "React",
      "TypeScript",
      "Vite",
      "Cloudflare tunnel",
      "git",
      "github",
    ],
  },
];

function ProjectCard({ name, description, tools }: Project) {
  const { gridProps, tileProps } = usePushTiles({ pushPx: 10 });

  return (
    <li className="project">
      <div className="project__header">
        <Ink as="h3" className="project__name">
          {name}
        </Ink>
      </div>
      <div className="project__body">
        <Ink className="project__description">{description}</Ink>
      </div>
      <div className="project__tools">
        <ul className="tile-grid" aria-label="Tools used" {...gridProps}>
          {tools.map((tool, i) => (
            <li key={tool} className="tile" {...tileProps(i)}>
              <Ink className="tile__text">{tool}</Ink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <Ink as="h2" className="projects__section">
          Projects
        </Ink>
        <ul className="projects__list">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
