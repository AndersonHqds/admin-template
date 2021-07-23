import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Profile() {
  const { onChangeTheme } = useAppData();

  return (
    <Layout
      title="Perfil do Usuário"
      subtitle="Administre as suas informações do usuário"
    >
      <h1>Perfil</h1>
    </Layout>
  );
}
