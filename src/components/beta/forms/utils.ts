export const saveFormLocally = (data: object, formTitle: string) => {
  const saveDate = new Date();
  const storageItem = { saveDate, data };
  localStorage.setItem(formTitle, JSON.stringify(storageItem));
};
export const retrieveLocalForm = (formTitle: string) => {
  const item = localStorage.getItem(formTitle);
  if (item) {
    return JSON.parse(item) as {
      saveDate: Date;
      data: object;
    };
  }
};
export const clearLocalForm = (formTitle: string) => {
  localStorage.removeItem(formTitle);
};
