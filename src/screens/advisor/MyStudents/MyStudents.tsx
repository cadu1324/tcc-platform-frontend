import { Layout } from '../../../components/layout';
import {
  MyStudentsContainer,
  MyStudentsHeader,
  MyStudentsTitle,
} from './MyStudents.styles';

export function MyStudents() {
  // TODO: Buscar orientandos via API
  return (
    <Layout>
      <MyStudentsContainer>
        <MyStudentsHeader>
          <MyStudentsTitle>Meus Orientandos</MyStudentsTitle>
        </MyStudentsHeader>

        {/* TODO: Adicionar lista de orientandos com seus projetos */}
        <p>Lista de orientandos - em desenvolvimento.</p>
      </MyStudentsContainer>
    </Layout>
  );
}
