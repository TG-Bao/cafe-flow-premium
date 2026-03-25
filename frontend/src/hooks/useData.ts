import { useState, useEffect } from 'react';
import type { Event, Label } from '../api';
import { getEvents, getLabels } from '../api';

export const useData = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const [fetchedEvents, fetchedLabels] = await Promise.all([getEvents(), getLabels()]);
            setEvents(fetchedEvents || []);
            setLabels(fetchedLabels || []);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadData();
        } else {
            setEvents([]);
            setLabels([]);
            setLoading(false);
        }
    }, [localStorage.getItem('token')]);

    return { events, labels, loading, loadData };
};
