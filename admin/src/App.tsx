import { 
    Admin, Resource, List, Datagrid, TextField, EmailField, 
    Edit, SimpleForm, TextInput, Create, ReferenceField, 
    ReferenceInput, SelectInput, NumberInput, Show, TabbedShowLayout, 
    Tab, SimpleShowLayout, ReferenceManyField 
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { Dashboard } from "./Dashboard";

// --- DATA PROVIDER ---
const baseProvider = simpleRestProvider("http://localhost:3000");

const dataProvider = {
    ...baseProvider,
    getList: (resource: string) => {
        return fetch(`http://localhost:3000/${resource}`)
            .then(res => res.json())
            .then(data => {
                const dataWithIds = data.map((item: any) => ({
                    ...item,
                    id: item.id_aluno || item.id_professor || item.id_sala || item.id_aula || item.id_horario
                }));
                return { data: dataWithIds, total: dataWithIds.length };
            });
    },
    getOne: (resource: string, params: any) => {
        return fetch(`http://localhost:3000/${resource}/${params.id}`)
            .then(res => res.json())
            .then(data => ({
                data: { 
                    ...data, 
                    id: data.id_aluno || data.id_professor || data.id_sala || data.id_aula || data.id_horario 
                }
            }));
    },
    getMany: (resource: string, params: any) => {
        return Promise.all(
            params.ids.map((id: any) =>
                fetch(`http://localhost:3000/${resource}/${id}`).then(res => res.json())
            )
        ).then(data => ({
            data: data.map((item: any) => ({
                ...item,
                id: item.id_aluno || item.id_professor || item.id_sala || item.id_aula || item.id_horario
            }))
        }));
    },
    update: (resource: string, params: any) => {
        return fetch(`http://localhost:3000/${resource}/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => ({ data: { ...data, id: params.id } }));
    },
    create: (resource: string, params: any) => {
        return fetch(`http://localhost:3000/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => ({ data: { ...data, id: data.id_aluno || data.id_professor || data.id_sala || data.id_aula || data.id_horario } }));
    }
};

// --- ALUNOS ---
const AlunoList = () => (
    <List><Datagrid rowClick="edit">
        <TextField source="id_aluno" label="ID" />
        <TextField source="nome" />
        <EmailField source="email" />
        <TextField source="curso" />
    </Datagrid></List>
);
const AlunoEdit = () => <Edit><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="curso" /></SimpleForm></Edit>;
const AlunoCreate = () => <Create><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="curso" /></SimpleForm></Create>;

// --- PROFESSORES ---
const ProfessorList = () => (
    <List><Datagrid rowClick="show">
        <TextField source="id_professor" label="ID" />
        <TextField source="nome" />
        <TextField source="departamento" />
    </Datagrid></List>
);
const ProfessorEdit = () => <Edit><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="departamento" /></SimpleForm></Edit>;
const ProfessorCreate = () => <Create><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="departamento" /></SimpleForm></Create>;
const ProfessorShow = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="Perfil">
                <SimpleShowLayout>
                    <TextField source="nome" />
                    <EmailField source="email" />
                    <TextField source="departamento" />
                </SimpleShowLayout>
            </Tab>
            <Tab label="Horários (Relação 1:N)">
                <ReferenceManyField reference="horarios" target="id_professor">
                    <Datagrid>
                        <TextField source="dia_semana" />
                        <TextField source="hora_inicio" />
                        <ReferenceField source="id_sala" reference="salas"><TextField source="nome" /></ReferenceField>
                        <ReferenceField source="id_aula" reference="aulas"><TextField source="disciplina" /></ReferenceField>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

// --- SALAS ---
const SalaList = () => (
    <List><Datagrid rowClick="edit">
        <TextField source="id_sala" label="ID" />
        <TextField source="nome" />
        <TextField source="capacidade" />
    </Datagrid></List>
);
const SalaEdit = () => <Edit><SimpleForm><TextInput source="nome" /><NumberInput source="capacidade" /></SimpleForm></Edit>;
const SalaCreate = () => <Create><SimpleForm><TextInput source="nome" /><NumberInput source="capacidade" /></SimpleForm></Create>;

// --- AULAS ---
const AulaList = () => (
    <List><Datagrid rowClick="edit">
        <TextField source="id_aula" label="ID" />
        <TextField source="disciplina" />
        <ReferenceField source="id_professor" reference="professores"><TextField source="nome" /></ReferenceField>
    </Datagrid></List>
);
const AulaEdit = () => <Edit><SimpleForm><TextInput source="disciplina" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput></SimpleForm></Edit>;
const AulaCreate = () => <Create><SimpleForm><TextInput source="disciplina" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput></SimpleForm></Create>;

// --- HORÁRIOS ---
const HorarioList = () => (
    <List><Datagrid rowClick="edit">
        <TextField source="dia_semana" label="Dia" />
        <TextField source="hora_inicio" label="Início" />
        <ReferenceField label="Professor" source="id_professor" reference="professores"><TextField source="nome" /></ReferenceField>
        <ReferenceField label="Sala" source="id_sala" reference="salas"><TextField source="nome" /></ReferenceField>
        <ReferenceField label="Disciplina" source="id_aula" reference="aulas"><TextField source="disciplina" /></ReferenceField>
    </Datagrid></List>
);
const HorarioEdit = () => (
    <Edit><SimpleForm>
        <TextInput source="dia_semana" />
        <TextInput source="hora_inicio" /><TextInput source="hora_fim" />
        <ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput>
        <ReferenceInput source="id_sala" reference="salas"><SelectInput optionText="nome" /></ReferenceInput>
        <ReferenceInput source="id_aula" reference="aulas"><SelectInput optionText="disciplina" /></ReferenceInput>
    </SimpleForm></Edit>
);
const HorarioCreate = () => (
    <Create><SimpleForm>
        <TextInput source="dia_semana" />
        <TextInput source="hora_inicio" /><TextInput source="hora_fim" />
        <ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput>
        <ReferenceInput source="id_sala" reference="salas"><SelectInput optionText="nome" /></ReferenceInput>
        <ReferenceInput source="id_aula" reference="aulas"><SelectInput optionText="disciplina" /></ReferenceInput>
    </SimpleForm></Create>
);

// --- APP ---
export const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="alunos" list={AlunoList} edit={AlunoEdit} create={AlunoCreate} />
    <Resource name="professores" list={ProfessorList} edit={ProfessorEdit} create={ProfessorCreate} show={ProfessorShow} />
    <Resource name="salas" list={SalaList} edit={SalaEdit} create={SalaCreate} />
    <Resource name="aulas" list={AulaList} edit={AulaEdit} create={AulaCreate} />
    <Resource name="horarios" list={HorarioList} edit={HorarioEdit} create={HorarioCreate} />
  </Admin>
);

export default App;