import MyDashboardList from "@/components/MyDashboardList";
import MyDashboardNav from "@/components/common/Nav/MyDashboardNav";
import SideMenu from "@/components/common/SideMenu/SideMenu";
import InvitedDashboard from "@/components/Table/InvitedDashboard";
import { DeviceSize } from "@/styles/DeviceSize";
import { styled } from "styled-components";
import { Z_INDEX } from "@/styles/ZindexStyles";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/404");
    }
  }, [router]);

  return (
    <>
      <MyDashboardNav />
      <SideMenuWrapper>
        <SideMenu />
      </SideMenuWrapper>
      <Container>
        <MyDashboardList />
        <InvitedDashboard />
      </Container>
    </>
  );
};

export default MyDashboard;

const SideMenuWrapper = styled.div`
  position: fixed;
  top: 0;

  z-index: ${Z_INDEX.SideMenu_Wrapper};
`;

const Container = styled.div`
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 4.4rem;

  margin-left: 30rem;
  padding: 4rem;

  background-color: var(--MainLight);

  @media (max-width: ${DeviceSize.tablet}) {
    margin-left: 16rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    margin-left: 6.7rem;
  }
`;
