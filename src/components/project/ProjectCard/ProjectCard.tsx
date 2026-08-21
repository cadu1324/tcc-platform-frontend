import type { Project } from '../../../types';
import { Card, CardContent, Badge } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import {
  ProjectCardContainer,
  ProjectCardHeader,
  ProjectCardTitle,
  ProjectCardDescription,
  ProjectCardFooter,
} from './ProjectCard.styles';

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const statusVariants: Record<string, 'info' | 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'error',
};

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <CardContent>
        <ProjectCardContainer>
          <ProjectCardHeader>
            <ProjectCardTitle>{project.title}</ProjectCardTitle>
            <Badge variant={statusVariants[project.status]}>
              {statusLabels[project.status]}
            </Badge>
          </ProjectCardHeader>

          <ProjectCardDescription>
            {project.description}
          </ProjectCardDescription>

          <ProjectCardFooter>
            <span>Início: {formatDate(project.start_date)}</span>
            <span>Entrega: {formatDate(project.expected_delivery_date)}</span>
          </ProjectCardFooter>
        </ProjectCardContainer>
      </CardContent>
    </Card>
  );
}
