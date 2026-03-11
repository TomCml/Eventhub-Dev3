import { Alert, AlertIcon, Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useLoginForm } from "../hooks/use-login-form.hook";

export const LoginForm: React.FC<{}> = () => {
    const hook = useLoginForm();

    return (
        <Box maxW="sm" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading mb={6} textAlign="center">Connexion</Heading>
            {
                hook.networkError && (

                    <Alert status="error">
                        <AlertIcon />
                        {hook.networkError}
                    </Alert>

                )
            }
                < Stack spacing={4}>
            <FormControl isInvalid={!!hook.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    value={hook.form.email}
                    onChange={(e) => { hook.updateField("email", e.target.value) }}
                />
                <FormErrorMessage>{hook.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl  isInvalid={!!hook.errors.password}>
                <FormLabel>Mot de passe</FormLabel>
                <Input
                    type="password"
                    value={hook.form.password}
                    onChange={(e) => { hook.updateField("password", e.target.value) }}
                />
                <FormErrorMessage>{hook.errors.password}</FormErrorMessage>
            </FormControl>

            <Button
                colorScheme="teal"
                type="submit"
                width="full"
                onClick={hook.submit}
                isDisabled={!hook.isSubmittable}
            >
                Se connecter
            </Button>
        </Stack>
        </Box >
    )
}