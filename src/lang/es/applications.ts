export default {
  list: {
    title: "Lista de postulantes",
  },
  show: {
    title: "Consulta de postulantes",
  },
  edit: {
    title: "Editar postulantes",
  },
  create: {
    title: "Registrar postulante",
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
    edit: "Editar",
    showPsychometricTest: "Ver examen",
    showResume: "Ver curriculum",
    postulate: "Postulado",
    inProcess: "En proceso",
    refused: "Rechazado",
    accepted: "Aceptado",
    selectVacancy: "Seleccionar vacante",
    dialogs: {
      show: {
        title: "Información del postulante",
        labels: {},
        actions: {
          close: "Cerrar",
        },
      },
      delete: {
        title: "Eliminar postulante",
        labels: {
          areYouSureYouWantToDelete: "Estas seguro de eliminar a",
          fromTheListOfApplicants: "de la lista de postulantes",
        },
        actions: {
          dismiss: "Cancelar",
          delete: "Eliminar",
        },
      },
    },
  },
};
