import { useAllProjects } from '../../../hooks/useAllProjects';
import { Layout } from '../../../components/layout';
import { Table, Badge, ProgressBar, Spinner } from '../../../ui';
import type { TableColumn, ProgressBarColor } from '../../../ui';
import {
  getProjectDisplayStatus,
  projectDisplayStatusLabel,
  projectDisplayStatusBadgeVariant,
  getProjectProgress,
} from '../../../utils/projectStatus';
import type { ProjectDisplayStatus } from '../../../utils/projectStatus';
import type { Project } from '../../../types';
import {
  MonitoringContainer,
  MonitoringHeader,
  MonitoringTitle,
  MonitoringSubtitle,
  ProjectTitleCell,
  ProgressCell,
  ProgressPercent,
} from './ProjectsMonitoring.styles';

const progressColorByStatus = {
  in_progress: 'primary',
  completed: 'success',
  cancelled: 'primary',
  overdue: 'error',
} as const satisfies Record<ProjectDisplayStatus, ProgressBarColor>;

const columns: TableColumn<Project>[] = [
  {
    key: 'title',
    header: 'Projeto',
    render: (project) => <ProjectTitleCell>{project.title}</ProjectTitleCell>,
  },
  {
    key: 'student_name',
    header: 'Aluno',
    render: (project) => project.student_name ?? `Aluno #${project.student_id}`,
  },
  {
    key: 'advisor_name',
    header: 'Orientador',
    render: (project) => project.advisor_name ?? 'Sem orientador',
  },
  {
    key: 'progress',
    header: 'Progresso',
    render: (project) => {
      const progress = getProjectProgress(project);
      const status = getProjectDisplayStatus(project);
      return (
        <ProgressCell>
          <ProgressBar value={progress} color={progressColorByStatus[status]} />
          <ProgressPercent>{progress}%</ProgressPercent>
        </ProgressCell>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    render: (project) => {
      const status = getProjectDisplayStatus(project);
      return (
        <Badge variant={projectDisplayStatusBadgeVariant[status]} size="sm">
          {projectDisplayStatusLabel[status]}
        </Badge>
      );
    },
  },
];

export function ProjectsMonitoring() {
  const { data: projects = [], isLoading } = useAllProjects();

  return (
    <Layout>
      <MonitoringContainer>
        <MonitoringHeader>
          <MonitoringTitle>Monitoramento Global de Projetos</MonitoringTitle>
          <MonitoringSubtitle>Visão consolidada de todos os projetos de TCC ativos na plataforma</MonitoringSubtitle>
        </MonitoringHeader>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <Table<Project>
            columns={columns}
            data={projects}
            keyExtractor={(project) => String(project.id)}
            emptyMessage="Nenhum projeto cadastrado"
          />
        )}
      </MonitoringContainer>
    </Layout>
  );
}
