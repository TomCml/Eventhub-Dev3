import { Box, Link as ChakraLink, Flex, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import type { AppState } from "../../../../store/store";

export const Header : React.FC<{}> = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);

    return (
        <Box as="header" bg="gray.800" px={8} py={4} boxShadow="md">
            <Flex justify="space-between" mx="auto" w={"100%"}>

                <HStack spacing={6}>
                {!isAuthenticated ? (
                    <>
                        <ChakraLink as={RouterLink} to="/login" color="white" _hover={{ color: "teal.300" }}>
                            Login
                        </ChakraLink>
                        <ChakraLink as={RouterLink} to="/register" color="white" _hover={{ color: "teal.300" }}>
                            Register
                        </ChakraLink>
                    </>
                ) : (
                    <>
                        <ChakraLink as={RouterLink} to="/projects" color="white" _hover={{ color: "teal.300" }}>
                            Projects
                        </ChakraLink>
                    </>
                )}
                </HStack>
            </Flex>
        </Box>
    );
};
