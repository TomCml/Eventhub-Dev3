import { Box, Button, FormControl, FormLabel, Input, Heading, Stack, Select, FormErrorMessage, AlertIcon, Alert } from "@chakra-ui/react";
import { useRegisterForm } from "../hooks/use-register-form.hook";
import * as AuthModel from "../domain/model/auth-model";

export const RegisterForm: React.FC = () => {
    const hook = useRegisterForm();

    return (
        <Box maxW="xl" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading mb={6} textAlign="center">Inscription</Heading>
                {
                    hook.networkError && (
                        
                        <Alert status="error">
                        <AlertIcon />
                            {hook.networkError}
                        </Alert>
                        
                    )
                }
            <Stack spacing={4}>
                <FormControl isInvalid={!!hook.errors.firstname} >
                    <FormLabel>Prénom</FormLabel>
                    <Input
                        value={hook.form.firstname}
                        onChange={(e) => hook.updateField("firstname", e.target.value)}
                    />
                    <FormErrorMessage>{hook.errors.firstname}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!hook.errors.lastname}>
                    <FormLabel>Nom</FormLabel>
                    <Input
                        value={hook.form.lastname}
                        onChange={(e) => hook.updateField("lastname", e.target.value)}
                    />
                    <FormErrorMessage>{hook.errors.lastname}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!hook.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={hook.form.email}
                        onChange={(e) => hook.updateField("email", e.target.value)}
                    />
                    <FormErrorMessage>{hook.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!hook.errors.password}>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        type="password"
                        value={hook.form.password}
                        onChange={(e) => hook.updateField("password", e.target.value)}
                    />
                    <FormErrorMessage>{hook.errors.password}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!hook.errors.role}>
                    <FormLabel>Rôle</FormLabel>
                    <Select
                        value={hook.form.role}
                        onChange={(e) => hook.updateField("role", e.target.value as AuthModel.Role)}
                    >
                        <option value="participant">Participant</option>
                        <option value="user">User</option>
                        <option value="admin">Administrateur</option>
                    </Select>
                    <FormErrorMessage>{hook.errors.role}</FormErrorMessage>

                </FormControl>

                <Button
                    colorScheme="teal"
                    width="full"
                    onClick={hook.submit}
                    isDisabled={!hook.isSubmittable}
                >
                    S’inscrire
                </Button>
            </Stack>
        </Box>
    );
};