import React from 'react';
import { Grid, Typography, Box, Alert, Skeleton, Container } from '@mui/material';
import { useEvents } from '../hooks/useEvents';
import { EventCard } from './EventCard';

export const EventsPage: React.FC = () => {
    const { events, isLoading, error } = useEvents();

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 900, background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Évènements à venir
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Découvrez et réservez les meilleurs évènements culturels et sportifs près de chez vous.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {isLoading ? (
                    // Display skeletons while loading
                    Array.from(new Array(6)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 3, mb: 1 }} />
                            <Skeleton width="60%" height={30} />
                            <Skeleton width="40%" height={20} />
                            <Skeleton variant="rectangular" height={100} sx={{ mt: 2, borderRadius: 2 }} />
                        </Grid>
                    ))
                ) : events.length > 0 ? (
                    events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <EventCard event={event} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Alert severity="info">Aucun évènement n'est disponible pour le moment.</Alert>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
