import { useNavigate } from 'react-router-dom';
import { useAdvisorProjects } from '../../../hooks/useAdvisorProjects';
import { Layout } from '../../../components/layout';
import { Card, CardContent, Avatar, Badge, Spinner, ProgressBar } from '../../../ui';
import { formatDate } from '../../../utils/formatDate';
import type { Project } from '../../../types';
import {
  MyStudentsContainer,
  MyStudentsHeader,
  MyStudentsTitle,
  StudentsGrid,
  StudentCardHeader,
  StudentInfo,
  StudentName,
  ProjectTitle,
  ProjectMeta,
  EmptyText,
} from './MyStudents.styles';

const statusLabels: Record<string, string> = {
  in_progress: 'Em andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const statusVariants: Record<string, 'info' | 'success' | 'error'> = {
  in_progress: 'info',
  completed: 'success',
  cancelled: 'error',
};

function milestoneProgress(project: Project): number {
  const total = project.milestones_total ?? 0;
  if (total > 0) return Math.round(((project.milestones_completed ?? 0) / total) * 100);
  return project.status === 'completed' ? 100 : 0;
}

function StudentCard({ project, onReview }: { project: Project; onReview: () => void }) {
  const studentName = project.student_name ?? `Aluno #${project.student_id}`;
  return (
    <Card clickable onClick={onReview}>
      <CardContent>
        <StudentCardHeader>
          <Avatar name={studentName} size="md" scheme="amber" />
          <StudentInfo>
            <StudentName>{studentName}</StudentName>
            <ProjectTitle>{project.title}</ProjectTitle>
          </StudentInfo>
          <Badge variant={statusVariants[project.status] ?? 'info'} size="sm">
            {statusLabels[project.status] ?? project.status}
          </Badge>
        </StudentCardHeader>

        <ProgressBar value={milestoneProgress(project)} variant="thin" color="primary" />

        <ProjectMeta>
          <span>Início: {formatDate(project.start_date)}</span>
          <span>Entrega: {formatDate(project.expected_delivery_date)}</span>
        </ProjectMeta>
      </CardContent>
    </Card>
  );
}

export function MyStudents() {
  const { data: projects, isLoading } = useAdvisorProjects();
  const navigate = useNavigate();

  return (
    <Layout>
      <MyStudentsContainer>
        <MyStudentsHeader>
          <MyStudentsTitle>Meus Orientandos</MyStudentsTitle>
        </MyStudentsHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : !projects || projects.length === 0 ? (
          <EmptyText>Nenhum orientando atribuído</EmptyText>
        ) : (
          <StudentsGrid>
            {projects.map((project) => (
              <StudentCard
                key={project.id}
                project={project}
                onReview={() => navigate(`/advisor/students/${project.id}`)}
              />
            ))}
          </StudentsGrid>
        )}
      </MyStudentsContainer>
    </Layout>
  );
}
