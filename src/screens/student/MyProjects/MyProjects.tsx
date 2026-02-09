import { Layout } from '../../../components/layout';
import { ProjectList } from '../../../components/project';
import {
  MyProjectsContainer,
  MyProjectsHeader,
  MyProjectsTitle,
} from './MyProjects.styles';

export function MyProjects() {
  // TODO: Buscar projetos do aluno via API
  return (
    <Layout>
      <MyProjectsContainer>
        <MyProjectsHeader>
          <MyProjectsTitle>Meus Projetos</MyProjectsTitle>
        </MyProjectsHeader>

        <ProjectList projects={[]} isLoading={false} />
      </MyProjectsContainer>
    </Layout>
  );
}
