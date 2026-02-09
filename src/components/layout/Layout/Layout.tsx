import { ReactNode } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { LayoutContainer, LayoutBody, LayoutContent } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <LayoutBody>
        <Sidebar />
        <LayoutContent>{children}</LayoutContent>
      </LayoutBody>
    </LayoutContainer>
  );
}
