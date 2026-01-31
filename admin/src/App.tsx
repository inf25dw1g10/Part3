import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import lb4Provider from "ra-data-lb4";

const dataProvider = lb4Provider("http://localhost:3000");

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="alunos" list={ListGuesser} edit={EditGuesser} />
    <Resource name="professores" list={ListGuesser} edit={EditGuesser} />
    <Resource name="salas" list={ListGuesser} edit={EditGuesser} />
    <Resource name="aulas" list={ListGuesser} edit={EditGuesser} />
    <Resource name="horarios" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default App;
