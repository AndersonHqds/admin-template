import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Settings() {
  const { onChangeTheme } = useAppData();

  return (
    <Layout
      title="Notificações"
      subtitle="Aqui você irá gerenciar as suas notificações"
    >
      <h1>Notificações</h1>
    </Layout>
  );
}
