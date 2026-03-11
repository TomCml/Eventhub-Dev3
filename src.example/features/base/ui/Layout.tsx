import { Container, Flex } from "@chakra-ui/react";
import type React from "react";
import { Header } from "./header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useTrackPageView } from "../../analytics/hooks/use-track-page-view";

export const Layout: React.FC = () => {
    const location = useLocation();
    useTrackPageView(location.pathname);
    return (
        <>
            <Header />
            <Flex minH={"100vh"} align={"center"} justify={"center"}>
                <Container maxW={"container.xl"}>
                    <Outlet />
                </Container>
            </Flex>
        </>
    )
};