export default {
  list: {
    title: "Lista de empleados",
  },
  show: {
    title: "Consulta de empleados",
  },
  edit: {
    title: "Editar empleado",
  },
  create: {
    title: "Registrar empleado",
  },
  delete: {
    title: "",
  },
  attributes: {
    id: "Id",
    name: "Nombre",
    first_surname: "Apellido paterno",
    second_surname: "Apellido materno",
    email: "Correo electrónico",
    cellphone: "Celular",
    psychometric_test: "Examen psicométrico",
    resume: "Currículum",
    vacancy: "Vacante",
    status: "Estado",
  },
  labels: {
    create: "Registrar",
    showPsychometricTest: "Ver examen",
    showResume: "Ver curriculum",
    postulate: "Postulado",
    inProcess: "En proceso",
    refused: "Rechazado",
    accepted: "Aceptado",
    dialogs: {
      delete: {
        title: "Eliminar empleado",
        labels: {
          areYouSureYouWantToDelete: "Estas seguro de eliminar a",
          fromTheListOfApplicants: "de la lista de empleados",
        },
        actions: {
          dismiss: "Cancelar",
          delete: "Eliminar",
        },
      },
    },
  },
};
