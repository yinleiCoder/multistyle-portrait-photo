import dayjs from "dayjs";

const dateFilter = (val, format = "YYYY-MM-DD") => {
  if (!isNaN(val)) {
    val = parseInt(val);
  }
  return dayjs(val).format(format);
};

export default (app) => {
  // vue3全局属性代替vue2全局过滤器
  app.config.globalProperties.$filters = {
    dateFilter,
  };
};
