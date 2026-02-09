import { Project } from '../../../types';
import { Spinner } from '../../../ui';
import { ProjectCard } from '../ProjectCard';
import {
  ProjectListContainer,
  ProjectListHeader,
  ProjectListTitle,
  EmptyMessage,
} from './ProjectList.styles';

interface ProjectListProps {
  projects: Project[];
  title?: string;
  isLoading?: boolean;
  onProjectClick?: (project: Project) => void;
}

export function ProjectList({
  projects,
  title = 'Projetos',
  isLoading = false,
  onProjectClick,
}: ProjectListProps) {
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <ProjectListContainer>
      <ProjectListHeader>
        <ProjectListTitle>{title}</ProjectListTitle>
      </ProjectListHeader>

      {projects.length === 0 ? (
        <EmptyMessage>Nenhum projeto encontrado.</EmptyMessage>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        ))
      )}
    </ProjectListContainer>
  );
}
