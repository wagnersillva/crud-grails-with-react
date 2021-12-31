export const currenPath = () => {
    const path = window.location.pathname;
    const pathFilter = path.split("/")
    return pathFilter[pathFilter.length-1]
}