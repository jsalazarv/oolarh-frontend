export default {
  list: {
    title: "Applicant list",
  },
  show: {
    title: "Applicant information",
  },
  edit: {
    title: "Edit applicant",
  },
  create: {
    title: "Register applicant",
  },
  delete: {
    title: "",
  },
  attributes: {
    id: "Id",
    name: "Name",
    first_surname: "First surname",
    second_surname: "Second surname",
    email: "Email",
    cellphone: "Cellphone",
    psychometric_test: "Psychometric test",
    resume: "Resume",
    vacancy: "Vacancy",
    status: "Status",
  },
  labels: {
    create: "Register",
    edit: "Edit",
    showPsychometricTest: "Show psychometric test",
    showResume: "Show resume",
    postulate: "Postulate",
    inProcess: "In process",
    refused: "Refused",
    accepted: "Accepted",
    selectVacancy: "Select vacancy",
    dialogs: {
      show: {
        title: "Applicant information",
        labels: {},
        actions: {
          close: "Close",
        },
      },
      delete: {
        title: "Delete applicant",
        labels: {
          areYouSureYouWantToDelete: "Are you sure you want to delete",
          fromTheListOfApplicants: "from the list of applicants",
        },
        actions: {
          dismiss: "Cancel",
          delete: "Delete",
        },
      },
    },
  },
};
