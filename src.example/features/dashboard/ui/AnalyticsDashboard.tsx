import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useDashboardData } from "../hooks/use-dashboard-data";
import { Box, Heading, Text, Center, Spinner } from "@chakra-ui/react";

export const AnalyticsDashboard = () => {
    const { data, status, error } = useDashboardData();

    if (status === "loading") return (
        <Center py={20}>
            <Spinner size="xl" color="teal.400" />
        </Center>
    );

    if (status === "error") return (
        <Center py={20}>
            <Text color="red.400" fontSize="lg">Erreur : {error}</Text>
        </Center>
    );

    return (
        <Box maxW="900px" mx="auto" py={8} px={4}>
            <Heading as="h2" size="lg" mb={2}>
                Dashboard Analytics
            </Heading>
            <Text color="gray.500" mb={8}>
                Pages les plus consultées par les utilisateurs
            </Text>

            {data.length === 0 ? (
                <Box p={8} borderWidth="1px" borderRadius="md" textAlign="center">
                    <Text color="gray.400">Aucune donnée analytics pour le moment. Naviguez entre les pages pour generer des évènements.</Text>
                </Box>
            ) : (
                <Box p={6} borderWidth="1px" borderRadius="md" shadow="sm" bg="white">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" tick={{ fontSize: 13 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                                labelStyle={{ fontWeight: "bold" }}
                            />
                            <Bar dataKey="count" fill="#319795" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </Box>
    );
};

export default AnalyticsDashboard;
