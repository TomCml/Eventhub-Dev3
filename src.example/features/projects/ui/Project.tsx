import { Box, Heading, Text, VStack, StackDivider, Badge } from "@chakra-ui/react";
import { useProjectList } from "../hooks/useProjectList";

export const Project = () => {
    const hook = useProjectList();
    // useTrackPageView("/projects");

    return (
        <Box maxW="800px" mx="auto" py={8} px={4}>
        <Heading as="h2" size="lg" mb={6}>
            Liste des projets
        </Heading>

        <VStack align="stretch" spacing={6} divider={<StackDivider borderColor="gray.200" />}>
            {hook.projects.map((project) => (
            <Box key={project.id} p={5} shadow="sm" borderWidth="1px" borderRadius="md">
                <Heading fontSize="xl" mb={2}>
                {project.title}
                </Heading>
                <Text mb={3}>{project.description}</Text>
                <Box>
                {project.skills.map((skill) => (
                    <Badge key={skill} colorScheme="teal" mr={2}>
                    {skill}
                    </Badge>
                ))}
                </Box>
            </Box>
            ))}
        </VStack>
        </Box>
    );
};
