import path from "path-browserify";
/**
 * 解析路由表，获取结构化数据，生成动态Menu
 */
const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

// 处理router.getRoutes()得到的嵌套路由移动到了一级的问题
export const filterRoutes = (routes) => {
  // 所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes);
  // 根据子集路由进行查重操作
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
  return false;
}

// 根据routes返回结构化数据
export const generateMenus = (routes, basePath = "") => {
  const result = [];
  routes.forEach((item) => {
    if (isNull(item.children) && isNull(item.meta)) return;
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    const routePath = path.resolve(basePath, item.path);
    let route = result.find((item) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };
      if(route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    if(!isNull(item.children)) {
        route.children.push(...generateMenus(item.children, route.path))
    }
  });
  return result;
};
