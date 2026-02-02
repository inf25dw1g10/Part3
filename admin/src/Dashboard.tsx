import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const stats = [
    { label: 'Total Alunos', value: '120', icon: <PeopleIcon color="primary" /> },
    { label: 'Total Professores', value: '15', icon: <SchoolIcon color="secondary" /> },
];

const dataGrafico = [
    { name: 'Eng. Informática', alunos: 45 },
    { name: 'Design', alunos: 32 },
    { name: 'Gestão', alunos: 28 },
    { name: 'Marketing', alunos: 15 },
];

export const Dashboard = () => (
    <Box sx={{ p: 2 }}>
        {/* Container para os Cards - Usando Flexbox em vez de Grid */}
        <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            flexWrap: 'wrap', 
            mb: 4 
        }}>
            {stats.map((stat, index) => (
                <Card key={index} sx={{ minWidth: 250, flex: '1 1 0' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography color="textSecondary" gutterBottom>{stat.label}</Typography>
                            <Typography variant="h4">{stat.value}</Typography>
                        </Box>
                        {stat.icon}
                    </CardContent>
                </Card>
            ))}
        </Box>

        {/* Container para o Gráfico */}
        <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Card>
                <CardHeader title="Alunos por Curso" />
                <CardContent sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataGrafico}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="alunos" fill="#3f51b5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </Box>
    </Box>
);