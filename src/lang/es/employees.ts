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
    birthday: "Fecha de nacimiento",
    gender: "Género",
    rfc: "RFC",
    ssn: "Número de seguro social",
    email: "Correo electrónico",
    cellphone: "Celular",
    psychometric_test: "Examen psicométrico",
    resume: "Currículum",
    vacancy: "Vacante",
    status: "Estado",
  },
  labels: {
    create: "Registrar",
    next: "Siguiente",
    prev: "Regresar",
    cancel: "Cancelar",
    showPsychometricTest: "Ver examen",
    showResume: "Ver curriculum",
    postulate: "Postulado",
    inProcess: "En proceso",
    refused: "Rechazado",
    accepted: "Aceptado",
    steps: {
      generalData: "Datos generales",
      contactInformation: "Datos de contacto",
      employmentData: "Datos del empleo",
    },
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
