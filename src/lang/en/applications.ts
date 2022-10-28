export default {
  list: {
    title: "Applicant list",
  },
  show: {
    title: "Applicant info",
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
    first_surname: "Last name",
    second_surname: "Mother's last name",
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
        title: "Applicant Information",
        labels: {},
        actions: {
          close: "Close",
        },
      },
      delete: {
        title: "Delete Applicant",
        labels: {
          areYouSureYouWantToDelete: "Are you sure to delete",
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
