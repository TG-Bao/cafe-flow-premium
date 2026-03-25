export const API_URL = 'http://localhost:8080';

export interface Label {
    id: number;
    name: string;
    color: string;
}

export interface Event {
    id: number;
    user_id: number;
    title: string;
    content: string;
    location: string;
    start_time: string;
    end_time: string;
    importance: string;
    label_id: number | null;
    label?: Label;
    is_free: boolean;
}

const getAuthHeader = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const loginUser = async (req: any) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
};

export const registerUser = async (req: any) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
};

export const getLabels = async (): Promise<Label[]> => {
    const res = await fetch(`${API_URL}/labels`, { headers: getAuthHeader() });
    return res.json();
};

export const createLabel = async (label: Partial<Label>): Promise<Label> => {
    const res = await fetch(`${API_URL}/labels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(label)
    });
    return res.json();
};

export const updateLabel = async (id: number, label: Partial<Label>): Promise<Label> => {
    const res = await fetch(`${API_URL}/labels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(label)
    });
    return res.json();
};

export const deleteLabel = async (id: number) => {
    await fetch(`${API_URL}/labels/${id}`, { method: 'DELETE', headers: getAuthHeader() });
};

export const getEvents = async (): Promise<Event[]> => {
    const res = await fetch(`${API_URL}/events`, { headers: getAuthHeader() });
    return res.json();
};

export const createEvent = async (event: Partial<Event>): Promise<Event> => {
    const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(event)
    });
    return res.json();
};

export const updateEvent = async (id: number, event: Partial<Event>): Promise<Event> => {
    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(event)
    });
    return res.json();
};

export const deleteEvent = async (id: number) => {
    await fetch(`${API_URL}/events/${id}`, { method: 'DELETE', headers: getAuthHeader() });
};
