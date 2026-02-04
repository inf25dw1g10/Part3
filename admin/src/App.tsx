// @ts-nocheck
/* eslint-disable */
import { 
    Admin, Resource, List, Datagrid, TextField, EmailField, 
    Edit, SimpleForm, TextInput, Create, ReferenceField, 
    ReferenceInput, SelectInput, NumberInput, Show, TabbedShowLayout, 
    Tab, SimpleShowLayout, ReferenceManyField
} from "react-admin";
import { Dashboard } from "./Dashboard";

const apiUrl = "http://localhost:8080";

const mapId = (item: any) => ({
    ...item,
    id: item.id || item.id_aluno || item.id_professor || item.id_sala || item.id_aula || item.id_horario
});

const dataProvider: any = {
    getList: (resource: string) => 
        fetch(`${apiUrl}/${resource}`).then(res => res.json())
            .then(data => ({ data: data.map(mapId), total: data.length })),

    getOne: (resource: string, params: any) => 
        fetch(`${apiUrl}/${resource}/${params.id}`).then(res => res.json())
            .then(data => ({ data: mapId(data) })),

    getMany: (resource: string, params: any) => 
        Promise.all(params.ids.map((id: any) => fetch(`${apiUrl}/${resource}/${id}`).then(res => res.json())))
            .then(data => ({ data: data.map(mapId) })),

    getManyReference: (resource: string, params: any) => {
        const url = (resource === 'horarios' && params.target === 'id_professor')
            ? `${apiUrl}/professores/${params.id}/horarios`
            : `${apiUrl}/${resource}?${params.target}=${params.id}`;
        
        return fetch(url).then(res => res.json())
            .then(data => ({ data: data.map(mapId), total: data.length }));
    },

    update: (resource: string, params: any) => 
        fetch(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(data => ({ data: { ...data, id: params.id } })),

    create: (resource: string, params: any) => 
        fetch(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json()).then(data => ({ data: mapId(data) })),

    delete: (resource: string, params: any) => 
        fetch(`${apiUrl}/${resource}/${params.id}`, { method: 'DELETE' })
            .then(() => ({ data: { id: params.id } })),

    deleteMany: (resource: string, params: any) => 
        Promise.all(params.ids.map((id: any) => fetch(`${apiUrl}/${resource}/${id}`, { method: 'DELETE' })))
            .then(() => ({ data: params.ids })),
};

// --- COMPONENTES ---

const ProfessorShow = () => (
    <Show><TabbedShowLayout>
        <Tab label="Perfil"><SimpleShowLayout><TextField source="nome" /><EmailField source="email" /><TextField source="departamento" /></SimpleShowLayout></Tab>
        <Tab label="Horários"><ReferenceManyField reference="horarios" target="id_professor" label="Agenda">
            <Datagrid><TextField source="dia_semana" label="Dia" /><TextField source="hora_inicio" label="Início" /><TextField source="hora_fim" label="Fim" /><ReferenceField source="id_sala" reference="salas"><TextField source="nome" /></ReferenceField></Datagrid>
        </ReferenceManyField></Tab>
    </TabbedShowLayout></Show>
);

const AlunoList = () => (<List><Datagrid rowClick="edit"><TextField source="id_aluno" label="ID" /><TextField source="nome" /><EmailField source="email" /><TextField source="curso" /></Datagrid></List>);
const AlunoEdit = () => (<Edit><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="curso" /></SimpleForm></Edit>);
const AlunoCreate = () => (<Create><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="curso" /></SimpleForm></Create>);

const ProfessorList = () => (<List><Datagrid rowClick="show"><TextField source="id_professor" label="ID" /><TextField source="nome" /><TextField source="departamento" /></Datagrid></List>);
const ProfessorEdit = () => (<Edit><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="departamento" /></SimpleForm></Edit>);
const ProfessorCreate = () => (<Create><SimpleForm><TextInput source="nome" /><TextInput source="email" /><TextInput source="departamento" /></SimpleForm></Create>);

const SalaList = () => (<List><Datagrid rowClick="edit"><TextField source="id_sala" label="ID" /><TextField source="nome" /><TextField source="capacidade" /></Datagrid></List>);
const SalaEdit = () => (<Edit><SimpleForm><TextInput source="nome" /><NumberInput source="capacidade" /></SimpleForm></Edit>);
const SalaCreate = () => (<Create><SimpleForm><TextInput source="nome" /><NumberInput source="capacidade" /></SimpleForm></Create>);

const AulaList = () => (<List><Datagrid rowClick="edit"><TextField source="id_aula" label="ID" /><TextField source="disciplina" /><ReferenceField source="id_professor" reference="professores"><TextField source="nome" /></ReferenceField></Datagrid></List>);
const AulaEdit = () => (<Edit><SimpleForm><TextInput source="disciplina" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput></SimpleForm></Edit>);
const AulaCreate = () => (<Create><SimpleForm><TextInput source="disciplina" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput></SimpleForm></Create>);

const HorarioList = () => (<List><Datagrid rowClick="edit"><TextField source="dia_semana" label="Dia" /><TextField source="hora_inicio" label="Início" /><ReferenceField label="Professor" source="id_professor" reference="professores"><TextField source="nome" /></ReferenceField><ReferenceField label="Sala" source="id_sala" reference="salas"><TextField source="nome" /></ReferenceField><ReferenceField label="Disciplina" source="id_aula" reference="aulas"><TextField source="disciplina" /></ReferenceField></Datagrid></List>);
const HorarioEdit = () => (<Edit><SimpleForm><TextInput source="dia_semana" /><TextInput source="hora_inicio" /><TextInput source="hora_fim" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput><ReferenceInput source="id_sala" reference="salas"><SelectInput optionText="nome" /></ReferenceInput><ReferenceInput source="id_aula" reference="aulas"><SelectInput optionText="disciplina" /></ReferenceInput></SimpleForm></Edit>);
const HorarioCreate = () => (<Create><SimpleForm><TextInput source="dia_semana" /><TextInput source="hora_inicio" /><TextInput source="hora_fim" /><ReferenceInput source="id_professor" reference="professores"><SelectInput optionText="nome" /></ReferenceInput><ReferenceInput source="id_sala" reference="salas"><SelectInput optionText="nome" /></ReferenceInput><ReferenceInput source="id_aula" reference="aulas"><SelectInput optionText="disciplina" /></ReferenceInput></SimpleForm></Create>);

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