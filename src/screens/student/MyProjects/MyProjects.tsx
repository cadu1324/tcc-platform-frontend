import { useNavigate } from 'react-router-dom';
import { useMyProjects } from '../../../hooks/useMyProjects';
import { Layout } from '../../../components/layout';
import { ProjectList } from '../../../components/project';
import { ProjectStatus } from '../../../types';
import {
  MyProjectsContainer,
  MyProjectsHeader,
  MyProjectsTitle,
} from './MyProjects.styles';

export function MyProjects() {
  const { data: projects, isLoading } = useMyProjects();
  const navigate = useNavigate();

  return (
    <Layout>
      <MyProjectsContainer>
        <MyProjectsHeader>
          <MyProjectsTitle>Meus Projetos</MyProjectsTitle>
        </MyProjectsHeader>

        <ProjectList
          projects={projects ?? []}
          isLoading={isLoading}
          onProjectClick={(project) => {
            if (project.status === ProjectStatus.IN_PROGRESS) navigate('/student/project');
          }}
        />
      </MyProjectsContainer>
    </Layout>
  );
}
